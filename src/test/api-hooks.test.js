import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createSubmissionAnalysisAPI } from "../hooks/submissions/analysis";
import { createPrecursorAPI } from "../hooks/features/precursors";
import { createSubmissionCoreAPI } from "../hooks/submissions/core";

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

test("useGetSubmissionHasPrecursors calls the quantification exists endpoint with quantification_type=precursors", async () => {
    const client = createMockClient(() => true);
    const { useGetSubmissionHasPrecursors } = createSubmissionAnalysisAPI(client);

    const { result } = renderHook(
        () => useGetSubmissionHasPrecursors({ submission_tag: "S1" }),
        { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith(
        "/submissions/S1/quantifications/exists",
        { params: { quantification_type: "precursors" } }
    );
    expect(result.current.data).toBe(true);
});

test("useGetSubmissionHasPrecursors returns false when the backend answers false", async () => {
    const client = createMockClient(() => false);
    const { useGetSubmissionHasPrecursors } = createSubmissionAnalysisAPI(client);

    const { result } = renderHook(
        () => useGetSubmissionHasPrecursors({ submission_tag: "S2" }),
        { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBe(false);
});

test("useGetPrecursorCount passes the submission_tag parameter", async () => {
    const client = createMockClient(() => 42);
    const { useGetPrecursorCount } = createPrecursorAPI(client);

    const { result } = renderHook(
        () => useGetPrecursorCount({ submission_tag: "S1" }),
        { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/features/precursors/count", {
        params: { submission_tag: "S1" }
    });
    expect(result.current.data).toBe(42);
});

test("useGetSubmissionHasGenotype calls the genotypes exists endpoint", async () => {
    const client = createMockClient(() => true);
    const { useGetSubmissionHasGenotype } = createSubmissionCoreAPI(client);

    const { result } = renderHook(
        () => useGetSubmissionHasGenotype({ tag: "S1" }),
        { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/submissions/S1/genotypes/exists");
    expect(result.current.data).toBe(true);
});

test("hook queries with different parameters use distinct query keys", async () => {
    const client = createMockClient(() => true);
    const { useGetSubmissionHasPrecursors } = createSubmissionAnalysisAPI(client);
    const wrapper = createWrapper();

    const a = renderHook(() => useGetSubmissionHasPrecursors({ submission_tag: "A" }), { wrapper });
    const b = renderHook(() => useGetSubmissionHasPrecursors({ submission_tag: "B" }), { wrapper });

    await waitFor(() => expect(a.result.current.isSuccess).toBe(true));
    await waitFor(() => expect(b.result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenNthCalledWith(
        1,
        "/submissions/A/quantifications/exists",
        { params: { quantification_type: "precursors" } }
    );
    expect(client.get).toHaveBeenNthCalledWith(
        2,
        "/submissions/B/quantifications/exists",
        { params: { quantification_type: "precursors" } }
    );
});
