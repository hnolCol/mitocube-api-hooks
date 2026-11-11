import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createPTMPrecursorAPI } from "../hooks/features/ptm_precursors";

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } }
    });
    return ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

const createMockClient = (postHandler) => {
    const post = jest.fn(async (url, body, config) => ({ data: postHandler(url, body, config?.params) }));
    return { post };
};

test("usePostPTMPrecursor posts the precursor to the insert endpoint", async () => {
    const client = createMockClient(() => true);
    const { usePostPTMPrecursor } = createPTMPrecursorAPI(client);

    const precursor = {
        sequence: "PEPTS[Phospho]IDEK",
        charge: 2,
        mz: 638.27,
        im: null,
        value: null,
        score: null,
        protein_group_tags: ["pg12345"],
        protein_tag: "P12345",
        modifications: [
            { position: 473, modification: "Phospho", residue: null }
        ]
    };

    const { result } = renderHook(() => usePostPTMPrecursor(), {
        wrapper: createWrapper()
    });

    result.current.mutate(precursor);
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(client.post).toHaveBeenCalledWith(
        "/features/ptm_precursors/insert",
        precursor
    );
    expect(result.current.data).toBe(true);
});

test("usePostPTMPrecursorsBulk posts the precursors with batch size params", async () => {
    const report = { valid: 2, not_found: 1, not_found_tags: ["PEPTIDEK.2"] };
    const client = createMockClient(() => report);
    const { usePostPTMPrecursorsBulk } = createPTMPrecursorAPI(client);

    const ptm_precursors = [
        {
            sequence: "PEPTS[Phospho]IDEK",
            charge: 2,
            protein_group_tags: ["pg12345"],
            modifications: [{ position: 473, modification: "Phospho" }]
        }
    ];

    const { result } = renderHook(() => usePostPTMPrecursorsBulk(), {
        wrapper: createWrapper()
    });

    result.current.mutate({ ptm_precursors, batch_size: 500, transaction_batch_size: 200 });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(client.post).toHaveBeenCalledWith(
        "/features/ptm_precursors/insert/bulk",
        ptm_precursors,
        { params: { batch_size: 500, transaction_batch_size: 200 } }
    );
    expect(result.current.data).toEqual(report);
});
