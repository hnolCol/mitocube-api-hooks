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

const createMockClient = (handler) => {
    return {
        get: jest.fn(async (url, config) => ({ data: handler(url, config?.params) }))
    };
};

test("useGetSubmissionByQuery passes the research_group_tags filter and group_by_research_group flag", async () => {
    const client = createMockClient(() => ({ rg_1: ["sub_1"], rg_2: ["sub_2"] }));
    const { useGetSubmissionByQuery } = createSubmissionQueryAPI(client);
    const { result } = renderHook(
        () => useGetSubmissionByQuery({
            research_group_tags: ["rg_1", "rg_2"],
            group_by_research_group: true
        }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/submissions/q", {
        params: expect.objectContaining({
            research_group_tags: "rg_1;rg_2",
            group_by_research_group: true
        })
    });
    expect(result.current.data).toEqual({ rg_1: ["sub_1"], rg_2: ["sub_2"] });
});

test("useGetSubmissionByQuery passes research_group_tags as string unchanged", async () => {
    const client = createMockClient(() => []);
    const { useGetSubmissionByQuery } = createSubmissionQueryAPI(client);
    const { result } = renderHook(
        () => useGetSubmissionByQuery({ research_group_tags: "rg_1" }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/submissions/q", {
        params: expect.objectContaining({ research_group_tags: "rg_1" })
    });
});

test("useGetSubmissionCountsByGroup calls the submissions count endpoint with group=research_group", async () => {
    const client = createMockClient(() => ({ rg_1: 3, rg_2: 5 }));
    const { useGetSubmissionCountsByGroup } = createSubmissionQueryAPI(client);
    const { result } = renderHook(
        () => useGetSubmissionCountsByGroup({ tags: ["sub_1", "sub_2"], group: "research_group" }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/submissions/count", {
        params: {
            tags: "sub_1;sub_2",
            group: "research_group"
        }
    });
    expect(result.current.data).toEqual({ rg_1: 3, rg_2: 5 });
});
