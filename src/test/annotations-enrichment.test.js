import { act, renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createQueryAnnotationsAPI } from "../hooks/annotations/annotations_query";

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } }
    });
    return ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

const createMockClient = (handler) => {
    const get = jest.fn(async (url, config) => ({ data: handler(url, config?.params) }));
    return { get, post: jest.fn() };
};

test("useGetAnnotationEnrichment calls the enrichment endpoint with the universe scope params", async () => {
    const records = [{ annotation_tag: "ann_1", p_value: 0.01, fdr: 0.02 }];
    const client = createMockClient(() => records);
    const { useGetAnnotationEnrichment } = createQueryAnnotationsAPI(client);

    const { result } = renderHook(
        () => useGetAnnotationEnrichment({
            target_proteins: "P1;P2;P3",
            submission_tags: "subA;subB",
            proteome_tag: undefined,
            group_tag: "group_1",
            search_string: undefined,
            min_overlap: 2,
            limit: 50
        }),
        { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith(
        "/annotations/analysis/enrichment",
        { params: { target_proteins: "P1;P2;P3", submission_tags: "subA;subB", proteome_tag: undefined, group_tag: "group_1", search_string: undefined, min_overlap: 2, limit: 50 } }
    );
    expect(result.current.data).toEqual(records);
});

test("useGetAnnotationEnrichment supports the proteome universe scope", async () => {
    const client = createMockClient(() => []);
    const { useGetAnnotationEnrichment } = createQueryAnnotationsAPI(client);

    const { result } = renderHook(
        () => useGetAnnotationEnrichment({ target_proteins: "P1;P2", proteome_tag: "UP000005640" }),
        { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith(
        "/annotations/analysis/enrichment",
        { params: { target_proteins: "P1;P2", submission_tags: undefined, proteome_tag: "UP000005640", group_tag: undefined, search_string: undefined, min_overlap: undefined, limit: undefined } }
    );
});

test("usePostAnnotationShift posts the protein values payload to the shift endpoint", async () => {
    const records = [{ annotation_tag: "ann_1", direction: "up", p_value: 0.01, fdr: 0.02 }];
    const client = { get: jest.fn(), post: jest.fn(async (url, body) => ({ data: records })) };
    const { usePostAnnotationShift } = createQueryAnnotationsAPI(client);

    const { result } = renderHook(() => usePostAnnotationShift(), { wrapper: createWrapper() });
    await act(async () => {
        result.current.mutate({
            protein_values: { P1: 1.5, P2: -0.5 },
            submission_tags: ["subA", "subB"],
            proteome_tag: undefined,
            group_tag: undefined,
            search_string: undefined,
            min_size: 3,
            limit: 100
        });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.post).toHaveBeenCalledWith("/annotations/analysis/shift", {
        protein_values: { P1: 1.5, P2: -0.5 },
        submission_tags: ["subA", "subB"],
        proteome_tag: undefined,
        group_tag: undefined,
        search_string: undefined,
        min_size: 3,
        limit: 100
    });
    expect(result.current.data).toEqual(records);
});
