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
        { sample_tag: "sample_01", submission_tag: "sub_01", components: [1.5, -0.5], condition_applications: ["ca_01"] },
        { sample_tag: "sample_02", submission_tag: "sub_02", components: [-1.2, 0.8], condition_applications: [] }
    ],
    drivers: [
        { tag: "protein_01", components: [0.3, -0.1] }
    ],
    condition_centroids: [
        { condition_application_tag: "ca_01", count: 1, components: [1.5, -0.5] }
    ]
};

const driverResponse = {
    proteome_tag: "proteome_01",
    protein_tag: "protein_01",
    n_components: 4,
    variance_explained: [0.4, 0.2, 0.1, 0.05],
    n_submissions: 2,
    submission_tags: ["sub_01", "sub_02"],
    driver: { tag: "protein_01", components: [0.3, -0.1, 0.05, 0.02] },
    condition_associations: [
        { condition_application_tag: "ca_01", mean_z: 1.2, n_samples: 1 }
    ],
    attribute_effects: [
        { attribute_tag: "att_compound", ca_tag: "ca_01", effect: 1.1, mean_z_in: 1.2, mean_z_out: 0.1, n_in: 1, n_out: 1 }
    ]
};

const conditionEffectsResponse = {
    proteome_tag: "proteome_01",
    ca_tag: "ca_01",
    n_submissions: 2,
    submission_tags: ["sub_01", "sub_02"],
    n_proteins: 1523,
    effects: [
        { tag: "protein_01", effect: 1.1, mean_z_in: 1.2, mean_z_out: 0.1, n_in: 1, n_out: 1, cohens_d: 2.3 }
    ]
};

const attributeEffectsResponse = {
    proteome_tag: "proteome_01",
    attribute_tag: "att_compound",
    n_components: 4,
    variance_explained: [0.4, 0.2, 0.1, 0.05],
    n_submissions: 2,
    submission_tags: ["sub_01", "sub_02"],
    conditions: [
        {
            ca_tag: "ca_01",
            n_in: 1,
            n_out: 1,
            separation: 2.7,
            effects: [
                { tag: "protein_01", effect: 1.1, mean_z_in: 1.2, mean_z_out: 0.1, n_in: 1, n_out: 1, cohens_d: 2.3 }
            ]
        }
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

test("useGetProteomeProjectionDriver calls the drivers endpoint with default params", async () => {
    const client = createMockClient(() => driverResponse);
    const { useGetProteomeProjectionDriver } = createProteomeProjectionAPI(client);
    const { result } = renderHook(
        () => useGetProteomeProjectionDriver({ proteome_tag: "proteome_01", protein_tag: "protein_01" }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/stats/proteomes/proteome_01/projection/drivers/protein_01", {
        params: { n_components: 4, min_valid_fraction: 0.5 }
    });
    expect(result.current.data).toEqual(driverResponse);
});

test("useGetProteomeProjectionConditionEffects calls the effects endpoint with limit param", async () => {
    const client = createMockClient(() => conditionEffectsResponse);
    const { useGetProteomeProjectionConditionEffects } = createProteomeProjectionAPI(client);
    const { result } = renderHook(
        () => useGetProteomeProjectionConditionEffects({ proteome_tag: "proteome_01", ca_tag: "ca_01", limit: 10, min_valid_fraction: 0.6 }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/stats/proteomes/proteome_01/projection/effects/ca_01", {
        params: { limit: 10, min_valid_fraction: 0.6 }
    });
    expect(result.current.data).toEqual(conditionEffectsResponse);
});

test("useGetProteomeProjectionAttributeEffects calls the attribute effects endpoint with default params", async () => {
    const client = createMockClient(() => attributeEffectsResponse);
    const { useGetProteomeProjectionAttributeEffects } = createProteomeProjectionAPI(client);
    const { result } = renderHook(
        () => useGetProteomeProjectionAttributeEffects({ proteome_tag: "proteome_01", attribute_tag: "att_compound" }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/stats/proteomes/proteome_01/projection/effects/attribute/att_compound", {
        params: { n_components: 4, top_proteins: 10, min_valid_fraction: 0.5 }
    });
    expect(result.current.data).toEqual(attributeEffectsResponse);
});
