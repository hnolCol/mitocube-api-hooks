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


test("useGetAnnotationGSEA calls the gsea endpoint with ca tags and the annotation group", async () => {
    const records = [{ annotation_tag: "ann_1", es: 0.9, nes: 2.5, p_value: 0.01, fdr: 0.02 }];
    const client = createMockClient(() => records);
    const { useGetAnnotationGSEA } = createQueryAnnotationsAPI(client);

    const { result } = renderHook(
        () => useGetAnnotationGSEA({
            submission_tag: "subA",
            ca_tag_left: "ca_left",
            ca_tag_right: "ca_right",
            within_attribute_tags: undefined,
            within_ca_tags: undefined,
            annotation_tag: undefined,
            equal_variance: true,
            group_tag: "group_1",
            min_size: 5,
            max_size: undefined,
            n_permutations: 1000,
            weight_p: 1,
            limit: undefined
        }),
        { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith(
        "/annotations/analysis/gsea",
        { params: { submission_tag: "subA", ca_tag_left: "ca_left", ca_tag_right: "ca_right", within_attribute_tags: undefined, within_ca_tags: undefined, annotation_tag: undefined, equal_variance: true, group_tag: "group_1", min_size: 5, max_size: undefined, n_permutations: 1000, weight_p: 1, limit: undefined } }
    );
    expect(result.current.data).toEqual(records);
});

test("useGetAnnotationGSEASeries calls the gsea series endpoint for one annotation", async () => {
    const series = { annotation_tag: "ann_1", running_sum: [0, 0.1, 0.2], hit_ranks: [1, 2] };
    const client = createMockClient(() => series);
    const { useGetAnnotationGSEASeries } = createQueryAnnotationsAPI(client);

    const { result } = renderHook(
        () => useGetAnnotationGSEASeries({
            submission_tag: "subA",
            ca_tag_left: "ca_left",
            ca_tag_right: "ca_right",
            within_attribute_tags: undefined,
            within_ca_tags: undefined,
            annotation_tag: undefined,
            equal_variance: true,
            group_tag: "group_1",
            plot_annotation_tag: "ann_1",
            min_size: 1,
            n_permutations: 1000,
            weight_p: 1
        }),
        { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith(
        "/annotations/analysis/gsea/series",
        { params: { submission_tag: "subA", ca_tag_left: "ca_left", ca_tag_right: "ca_right", within_attribute_tags: undefined, within_ca_tags: undefined, annotation_tag: undefined, equal_variance: true, group_tag: "group_1", plot_annotation_tag: "ann_1", min_size: 1, n_permutations: 1000, weight_p: 1 } }
    );
    expect(result.current.data).toEqual(series);
});
