import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createDepositionRequestsAPI } from "../hooks/requests/depositions";

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
    const post = jest.fn(async (url, body) => ({ data: { tag: "DR1" } }));
    const delete_ = jest.fn(async (url) => ({ data: { tag: "DR1", deleted: true } }));
    return { get, post, delete: delete_ };
};

test("useGetDepositionRequests calls the depositions endpoint with status and limit", async () => {
    const client = createMockClient(() => []);
    const { useGetDepositionRequests } = createDepositionRequestsAPI(client);
    const { result } = renderHook(
        () => useGetDepositionRequests({ status: "pending", limit: 10 }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/requests/depositions", {
        params: { status: "pending", limit: 10 }
    });
});

test("useGetPendingDepositionRequests calls the pending endpoint", async () => {
    const client = createMockClient(() => []);
    const { useGetPendingDepositionRequests } = createDepositionRequestsAPI(client);
    const { result } = renderHook(
        () => useGetPendingDepositionRequests({ limit: 5 }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/requests/depositions/pending", {
        params: { limit: 5 }
    });
});

test("useGetMyDepositionRequests calls the mine endpoint", async () => {
    const client = createMockClient(() => []);
    const { useGetMyDepositionRequests } = createDepositionRequestsAPI(client);
    const { result } = renderHook(
        () => useGetMyDepositionRequests({ limit: 25 }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/requests/depositions/mine", {
        params: { limit: 25 }
    });
});

test("useGetSubmissionDepositionRequests interpolates the submission tag", async () => {
    const client = createMockClient(() => []);
    const { useGetSubmissionDepositionRequests } = createDepositionRequestsAPI(client);
    const { result } = renderHook(
        () => useGetSubmissionDepositionRequests({ submission_tag: "S1" }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/requests/depositions/submissions/S1", {
        params: { limit: undefined }
    });
});

test("usePostDepositionRequest posts submission_tag, database and comment", async () => {
    const client = createMockClient(() => []);
    const { usePostDepositionRequest } = createDepositionRequestsAPI(client);
    const { result } = renderHook(() => usePostDepositionRequest(), {
        wrapper: createWrapper()
    });
    await act(async () => {
        result.current.mutate({
            submission_tag: "S1",
            database: "PRIDE",
            comment: "Please deposit"
        });
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.post).toHaveBeenCalledWith("/requests/depositions", {
        submission_tag: "S1",
        database: "PRIDE",
        comment: "Please deposit"
    });
});

test("useGetSubmissionDepositionRequestExists calls the exists endpoint", async () => {
    const client = createMockClient(() => ({ pending: true }));
    const { useGetSubmissionDepositionRequestExists } = createDepositionRequestsAPI(client);
    const { result } = renderHook(
        () => useGetSubmissionDepositionRequestExists({ submission_tag: "S1" }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/requests/depositions/submissions/S1/exists");
    expect(result.current.data).toEqual({ pending: true });
});

test("useDeleteDepositionRequest deletes the request", async () => {
    const client = createMockClient(() => []);
    const { useDeleteDepositionRequest } = createDepositionRequestsAPI(client);
    const { result } = renderHook(() => useDeleteDepositionRequest(), {
        wrapper: createWrapper()
    });
    await act(async () => {
        result.current.mutate({ request_tag: "DR1" });
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.delete).toHaveBeenCalledWith("/requests/depositions/DR1");
});

test("usePostCompleteDepositionRequest posts identifier, url and token", async () => {
    const client = createMockClient(() => []);
    const { usePostCompleteDepositionRequest } = createDepositionRequestsAPI(client);
    const { result } = renderHook(() => usePostCompleteDepositionRequest(), {
        wrapper: createWrapper()
    });
    await act(async () => {
        result.current.mutate({
            request_tag: "DR1",
            identifier: "PXD000001",
            url: "https://www.ebi.ac.uk/pride/archive/projects/PXD000001",
            token: "secret"
        });
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.post).toHaveBeenCalledWith("/requests/depositions/DR1/complete", {
        identifier: "PXD000001",
        url: "https://www.ebi.ac.uk/pride/archive/projects/PXD000001",
        token: "secret",
        comment: undefined
    });
});

test("usePostRejectDepositionRequest posts the review comment", async () => {
    const client = createMockClient(() => []);
    const { usePostRejectDepositionRequest } = createDepositionRequestsAPI(client);
    const { result } = renderHook(() => usePostRejectDepositionRequest(), {
        wrapper: createWrapper()
    });
    await act(async () => {
        result.current.mutate({ request_tag: "DR1", comment: "Not applicable" });
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.post).toHaveBeenCalledWith("/requests/depositions/DR1/reject", {
        comment: "Not applicable"
    });
});
