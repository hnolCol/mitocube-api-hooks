import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createPATsAPI } from "../hooks/authorization/pats";

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } }
    });
    return ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

const createMockClient = () => {
    const get = jest.fn(async (url) => ({ data: [] }));
    const post = jest.fn(async (url, body, config) => ({ data: { token: "mcp_test" } }));
    const patch = jest.fn(async (url, body, config) => ({ data: { success: true } }));
    const delete_ = jest.fn(async (url) => ({ data: { success: true } }));
    return { get, post, patch, delete: delete_ };
};

test("useCreatePAT posts the pat props to /auth/pats", async () => {
    const client = createMockClient();
    const { useCreatePAT } = createPATsAPI(client);
    const { result } = renderHook(() => useCreatePAT(), { wrapper: createWrapper() });
    await act(async () => {
        result.current.mutate({ patProps: { name: "qc script", scopes: ["qc.upload"] } });
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.post).toHaveBeenCalledWith("/auth/pats", {
        name: "qc script",
        scopes: ["qc.upload"]
    });
});

test("useGetPATs calls the collection endpoint", async () => {
    const client = createMockClient();
    const { useGetPATs } = createPATsAPI(client);
    const { result } = renderHook(() => useGetPATs(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/auth/pats");
});

test("useRevokePAT deletes the token by its tag", async () => {
    const client = createMockClient();
    const { useRevokePAT } = createPATsAPI(client);
    const { result } = renderHook(() => useRevokePAT(), { wrapper: createWrapper() });
    await act(async () => {
        result.current.mutate({ patTag: "pat_abc12345" });
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.delete).toHaveBeenCalledWith("/auth/pats/pat_abc12345");
});

test("useGetUserPATs calls the admin user endpoint and is disabled without a tag", async () => {
    const client = createMockClient();
    const { useGetUserPATs } = createPATsAPI(client);
    const { result } = renderHook(() => useGetUserPATs({ userTag: "abcdefgh" }), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/auth/pats/user/abcdefgh");

    const { result: idle } = renderHook(() => useGetUserPATs({}), { wrapper: createWrapper() });
    expect(idle.current.fetchStatus).toBe("idle");
    expect(client.get).not.toHaveBeenCalledWith("/auth/pats/user/undefined");
});

test("useRevokePATAsAdmin deletes via the admin endpoint", async () => {
    const client = createMockClient();
    const { useRevokePATAsAdmin } = createPATsAPI(client);
    const { result } = renderHook(() => useRevokePATAsAdmin(), { wrapper: createWrapper() });
    await act(async () => {
        result.current.mutate({ patTag: "pat_abc12345" });
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.delete).toHaveBeenCalledWith("/auth/pats/admin/pat_abc12345");
});

test("useSetPATCreationBlocked patches the creation flag", async () => {
    const client = createMockClient();
    const { useSetPATCreationBlocked } = createPATsAPI(client);
    const { result } = renderHook(() => useSetPATCreationBlocked(), { wrapper: createWrapper() });
    await act(async () => {
        result.current.mutate({ userTag: "abcdefgh", blocked: true });
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.patch).toHaveBeenCalledWith("/auth/pats/user/abcdefgh/creation",
        { blocked: true },
        { headers: { "Content-Type": "application/json" } });
});
