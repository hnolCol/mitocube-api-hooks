import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createProteomeProjectionAPI } from "../hooks/stats/projection";

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

const projectionResponse = {
    proteome_tag: "proteome_01",
    method: "pca",
    n_components: 2,
    variance_explained: [0.42, 0.21],
    n_proteins: 1523,
    n_submissions: 2,
    submission_tags: ["sub_01", "sub_02"],
    points: [
        { sample_tag: "sample_01", submission_tag: "sub_01", components: [1.5, -0.5] },
        { sample_tag: "sample_02", submission_tag: "sub_02", components: [-1.2, 0.8] }
    ]
};

test("useGetProteomeProjection calls the projection endpoint with default params", async () => {
    const client = createMockClient(() => projectionResponse);
    const { useGetProteomeProjection } = createProteomeProjectionAPI(client);
    const { result } = renderHook(
        () => useGetProteomeProjection({ proteome_tag: "proteome_01" }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/stats/proteomes/proteome_01/projection", {
        params: { method: "pca", n_components: 2, min_valid_fraction: 0.5 }
    });
    expect(result.current.data).toEqual(projectionResponse);
});

test("useGetProteomeProjection passes method, n_components and min_valid_fraction params", async () => {
    const client = createMockClient(() => projectionResponse);
    const { useGetProteomeProjection } = createProteomeProjectionAPI(client);
    const { result } = renderHook(
        () => useGetProteomeProjection({ proteome_tag: "proteome_01", method: "pca", n_components: 3, min_valid_fraction: 0.7 }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/stats/proteomes/proteome_01/projection", {
        params: { method: "pca", n_components: 3, min_valid_fraction: 0.7 }
    });
    expect(result.current.data).toEqual(projectionResponse);
});
