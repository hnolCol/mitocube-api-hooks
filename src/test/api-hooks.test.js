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

import { createSubmissionDurationsAPI } from "../hooks/stats/submissions";

test("useGetSubmissionViews calls the submission views stats endpoint", async () => {
    const client = createMockClient(() => 7);
    const { useGetSubmissionViews } = createSubmissionDurationsAPI(client);
    const { result } = renderHook(
        () => useGetSubmissionViews({ submission_tag: "S1" }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/stats/submissions/S1/views");
    expect(result.current.data).toBe(7);
});

test("useGetProteinViews calls the protein views stats endpoint", async () => {
    const client = createMockClient(() => 3);
    const { useGetProteinViews } = createSubmissionDurationsAPI(client);
    const { result } = renderHook(
        () => useGetProteinViews({ feature_tag: "F1" }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/stats/submissions/proteins/F1/views");
    expect(result.current.data).toBe(3);
});

import { createCollaborationsAPI } from "../hooks/collaborations/collaborations";

test("useGetSubmissionExplore passes repeated ca_tags and user_tags query parameters", async () => {
    const client = createMockClient(() => []);
    const { useGetSubmissionExplore } = createCollaborationsAPI(client);
    const { result } = renderHook(
        () => useGetSubmissionExplore({ search_string: "mito", limit: 40, ca_tags: ["CA1", "CA2"], user_tags: ["U1"] }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith(
        "/collaborations/submissions/explore?ca_tags=CA1&ca_tags=CA2&user_tags=U1",
        { params: { search_string: "mito", limit: 40 } }
    );
});

test("useGetSubmissionExplore omits tag query parameters when no tags are given", async () => {
    const client = createMockClient(() => []);
    const { useGetSubmissionExplore } = createCollaborationsAPI(client);
    const { result } = renderHook(
        () => useGetSubmissionExplore({ search_string: "mito" }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith(
        "/collaborations/submissions/explore",
        { params: { search_string: "mito", limit: undefined } }
    );
});

import { createImpressumAPI } from "../hooks/impressum/impressum";
test("useGetImpressum calls the impressum endpoint", async () => {
    const client = createMockClient(() => ({ title: "Impressum", text: "default" }));
    const { useGetImpressum } = createImpressumAPI(client);
    const { result } = renderHook(
        () => useGetImpressum(),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/impressum");
    expect(result.current.data).toEqual({ title: "Impressum", text: "default" });
});
test("useUpdateImpressum sends title and text via PUT", async () => {
    const client = { get: jest.fn(), put: jest.fn(async (url, body) => ({ data: { title: body.title, text: body.text } })) };
    const { useUpdateImpressum } = createImpressumAPI(client);
    const { result } = renderHook(
        () => useUpdateImpressum(),
        { wrapper: createWrapper() }
    );
    const promise = result.current.mutateAsync({ title: "Impressum", text: "updated" });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    await promise;
    expect(client.put).toHaveBeenCalledWith("/impressum", { title: "Impressum", text: "updated" });
    expect(result.current.data).toEqual({ title: "Impressum", text: "updated" });
});

import { createSimilarSubmissionsAPI } from "../hooks/submissions/similar";
test("useGetSimilarSubmissions calls the similar submissions endpoint with query parameters", async () => {
    const client = createMockClient(() => ({ submission_tag: "S1", similar: [] }));
    const { useGetSimilarSubmissions } = createSimilarSubmissionsAPI(client);
    const { result } = renderHook(
        () => useGetSimilarSubmissions({ tag: "S1", limit: 10, include_sample_ca: true }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith(
        "/submissions/similar",
        { params: { tag: "S1", limit: 10, include_sample_ca: true } }
    );
    expect(result.current.data.submission_tag).toBe("S1");
});
import { createQueryUsersByQueryAPI } from "../hooks/users/query_users";
test("useGetUserByQuery passes roles as a semicolon separated string", async () => {
    const client = createMockClient(() => ["U1", "U2"]);
    const { useGetUserByQuery } = createQueryUsersByQueryAPI(client);
    const { result } = renderHook(
        () => useGetUserByQuery({ search_string: "mito", roles: [2, 4], limit: 10 }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.data).toEqual(["U1", "U2"]));
    expect(client.get).toHaveBeenCalledWith(
        "/users/q",
        { params: { search_string: "mito", roles: "2;4", limit: 10 } }
    );
});
test("useGetUserByQuery leaves roles untouched when no roles are given", async () => {
    const client = createMockClient(() => []);
    const { useGetUserByQuery } = createQueryUsersByQueryAPI(client);
    const { result } = renderHook(
        () => useGetUserByQuery({ search_string: "mito", limit: 10 }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith(
        "/users/q",
        { params: { search_string: "mito", roles: undefined, limit: 10 } }
    );
});
test("usePostUserRoleChange posts to the admin role endpoint with the role query parameter", async () => {
    const client = { get: jest.fn(), post: jest.fn(async (url, body, config) => ({ data: true })) };
    const { usePostUserRoleChange } = createQueryUsersByQueryAPI(client);
    const { result } = renderHook(
        () => usePostUserRoleChange(),
        { wrapper: createWrapper() }
    );
    const promise = result.current.mutateAsync({ user_tag: "U1", role: 2 });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    await promise;
    expect(client.post).toHaveBeenCalledWith("/users/U1/role", null, { params: { role: 2 } });
    expect(result.current.data).toBe(true);
});
