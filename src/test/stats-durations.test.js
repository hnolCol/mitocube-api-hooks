import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createSubmissionDurationsAPI } from "../hooks/stats/submissions";

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } }
    });
    return ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

const createMockClient = (handler) => {
    return {
        get: jest.fn(async (url, config) => ({ data: handler(url, config?.params) }))
    };
};

test("useGetSubmissionDuration passes the group_by_year, years and state params", async () => {
    const client = createMockClient(() => [
        { year: 2024, min: 1, q25: 2, median: 3, q75: 4, max: 5, N: 10 }
    ]);
    const { useGetSubmissionDuration } = createSubmissionDurationsAPI(client);
    const { result } = renderHook(
        () => useGetSubmissionDuration({
            state_01: "submitted",
            state_02: "done",
            aggregate: "dist",
            group_by_year: true,
            years: "2024;2025",
            state: "done"
        }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/stats/submissions/durations", {
        params: {
            state_01: "submitted",
            state_02: "done",
            aggregate: "dist",
            group_by_year: true,
            years: "2024;2025",
            state: "done"
        }
    });
    expect(result.current.data).toEqual([
        { year: 2024, min: 1, q25: 2, median: 3, q75: 4, max: 5, N: 10 }
    ]);
});

test("useGetSamplesPerSubmission calls the samples_per_submission endpoint with filters", async () => {
    const client = createMockClient(() => [
        { year: 2024, min: 1, q25: 2, median: 3, q75: 4, max: 5, N: 7 }
    ]);
    const { useGetSamplesPerSubmission } = createSubmissionDurationsAPI(client);
    const { result } = renderHook(
        () => useGetSamplesPerSubmission({ years: "2024", state: "done" }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/stats/submissions/samples_per_submission", {
        params: { years: "2024", state: "done" }
    });
    expect(result.current.data).toEqual([
        { year: 2024, min: 1, q25: 2, median: 3, q75: 4, max: 5, N: 7 }
    ]);
});

test("useGetSamplesPerSubmission works without filters", async () => {
    const client = createMockClient(() => []);
    const { useGetSamplesPerSubmission } = createSubmissionDurationsAPI(client);
    const { result } = renderHook(
        () => useGetSamplesPerSubmission(),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/stats/submissions/samples_per_submission", {
        params: { years: undefined, state: undefined }
    });
});
