import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createSubmissionQueryAPI } from "../hooks/submissions/query";

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } }
    });
    return ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

test("useGetSubmissionByQuery forwards min_state to /submissions/q", async () => {
    const client = { get: jest.fn(async () => ({ data: ["subA", "subB"] })), post: jest.fn() };
    const { useGetSubmissionByQuery } = createSubmissionQueryAPI(client);

    const { result } = renderHook(
        () => useGetSubmissionByQuery({ min_state: 5, group_by_state: false, limit: 50 }),
        { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    const [url, config] = client.get.mock.calls[0];
    expect(url).toBe("/submissions/q");
    expect(config.params.min_state).toBe(5);
    expect(result.current.data).toEqual(["subA", "subB"]);
});

test("useGetSubmissionQueryCount forwards min_state to /submissions/q/count", async () => {
    const client = { get: jest.fn(async () => ({ data: { query_count: 2, total_count: 10 } })), post: jest.fn() };
    const { useGetSubmissionQueryCount } = createSubmissionQueryAPI(client);

    const { result } = renderHook(
        () => useGetSubmissionQueryCount({ min_state: 5 }),
        { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    const [url, config] = client.get.mock.calls[0];
    expect(url).toBe("/submissions/q/count");
    expect(config.params.min_state).toBe(5);
});
