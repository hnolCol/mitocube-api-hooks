import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createSubmissionDurationsAPI } from "../hooks/stats/submissions";
import { createSubmissionCountAPI } from "../hooks/submissions/count";

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

test("useGetSubmissionDuration passes the user_tags, ca_tags, include_sample_ca and genotype_tags filters", async () => {
    const client = createMockClient(() => 42);
    const { useGetSubmissionDuration } = createSubmissionDurationsAPI(client);
    const { result } = renderHook(
        () => useGetSubmissionDuration({
            state_01: "submitted",
            state_02: "done",
            user_tags: ["usr_abc", "usr_def"],
            ca_tags: ["ca_1", "ca_2"],
            include_sample_ca: true,
            genotype_tags: ["gen_a", "gen_b"]
        }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/stats/submissions/durations", {
        params: {
            state_01: "submitted",
            state_02: "done",
            aggregate: "dist",
            group_by_year: false,
            years: undefined,
            state: undefined,
            user_tags: "usr_abc;usr_def",
            ca_tags: "ca_1;ca_2",
            include_sample_ca: true,
            genotype_tags: "gen_a;gen_b"
        }
    });
});

test("useGetSamplesPerSubmission passes the user_tags, ca_tags and include_sample_ca filters", async () => {
    const client = createMockClient(() => []);
    const { useGetSamplesPerSubmission } = createSubmissionDurationsAPI(client);
    const { result } = renderHook(
        () => useGetSamplesPerSubmission({ years: "2024", user_tags: ["usr_abc"], ca_tags: ["ca_1"], genotype_tags: "gen_a" }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/stats/submissions/samples_per_submission", {
        params: {
            years: "2024",
            state: undefined,
            user_tags: "usr_abc",
            ca_tags: "ca_1",
            include_sample_ca: undefined,
            genotype_tags: "gen_a"
        }
    });
});

test("useGetSubmissionCountsByYear calls the submissions counts endpoint with filters", async () => {
    const client = createMockClient(() => [{ group: "RG1", year: 2024, value: 3 }]);
    const { useGetSubmissionCountsByYear } = createSubmissionDurationsAPI(client);
    const { result } = renderHook(
        () => useGetSubmissionCountsByYear({
            group_by: "trait",
            years: "2024;2025",
            state: "done",
            attribute_tag: "att_1",
            group_by_entity: "condition_application",
            user_tags: ["usr_abc"],
            ca_tags: ["ca_1", "ca_2"],
            include_sample_ca: true,
            genotype_tags: ["gen_a"]
        }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/stats/submissions/counts/submissions", {
        params: {
            group_by: "trait",
            years: "2024;2025",
            state: "done",
            attribute_tag: "att_1",
            group_by_entity: "condition_application",
            user_tags: "usr_abc",
            ca_tags: "ca_1;ca_2",
            include_sample_ca: true,
            genotype_tags: "gen_a"
        }
    });
    expect(result.current.data).toEqual([{ group: "RG1", year: 2024, value: 3 }]);
});

test("useGetSampleCountsByResearchGroup calls the samples counts endpoint with filters", async () => {
    const client = createMockClient(() => [{ group: "RG1", year: 2024, value: 5 }]);
    const { useGetSampleCountsByResearchGroup } = createSubmissionDurationsAPI(client);
    const { result } = renderHook(
        () => useGetSampleCountsByResearchGroup({
            years: "2024",
            user_tags: ["usr_abc"],
            ca_tags: ["ca_1"],
            genotype_tags: ["gen_a", "gen_b"]
        }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/stats/submissions/counts/samples", {
        params: {
            group_by: "research_group",
            years: "2024",
            state: undefined,
            user_tags: "usr_abc",
            ca_tags: "ca_1",
            include_sample_ca: undefined,
            genotype_tags: "gen_a;gen_b"
        }
    });
});

test("useGetSubmissionCountsByUser calls the user counts endpoint with filters", async () => {
    const client = createMockClient(() => [{ group: "John Doe", year: 2024, value: 2 }]);
    const { useGetSubmissionCountsByUser } = createSubmissionDurationsAPI(client);
    const { result } = renderHook(
        () => useGetSubmissionCountsByUser({
            years: "2024",
            research_group_tags: ["rg_1", "rg_2"],
            user_tags: ["usr_abc"],
            ca_tags: ["ca_1"],
            include_sample_ca: false,
            genotype_tags: "gen_a"
        }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/stats/submissions/counts/users", {
        params: {
            years: "2024",
            state: undefined,
            research_group_tags: "rg_1;rg_2",
            user_tags: "usr_abc",
            ca_tags: "ca_1",
            include_sample_ca: false,
            genotype_tags: "gen_a"
        }
    });
});

test("useGetSubmissionProteinGroupCount passes the filters to the quantification count endpoint", async () => {
    const client = createMockClient(() => [
        { submission_tag: "S1", count: 10, user_tag: "usr_abc", created_at: 123.45 }
    ]);
    const { useGetSubmissionProteinGroupCount } = createSubmissionCountAPI(client);
    const { result } = renderHook(
        () => useGetSubmissionProteinGroupCount({
            user_tags: ["usr_abc", "usr_def"],
            ca_tags: ["ca_1"],
            include_sample_ca: true,
            genotype_tags: ["gen_a"]
        }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/submissions/quantifications/protein_groups/count", {
        params: {
            user_tags: "usr_abc;usr_def",
            ca_tags: "ca_1",
            include_sample_ca: true,
            genotype_tags: "gen_a"
        }
    });
});

test("useGetSubmissionProteinGroupCount omits filters when none are given", async () => {
    const client = createMockClient(() => []);
    const { useGetSubmissionProteinGroupCount } = createSubmissionCountAPI(client);
    const { result } = renderHook(
        () => useGetSubmissionProteinGroupCount({}),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/submissions/quantifications/protein_groups/count", {
        params: {
            user_tags: undefined,
            ca_tags: undefined,
            include_sample_ca: undefined,
            genotype_tags: undefined
        }
    });
});

test("useGetSubmissionCountsByState calls the states counts endpoint with filters", async () => {
    const client = createMockClient(() => [{ state_tag: "submitted", value: 31 }]);
    const { useGetSubmissionCountsByState } = createSubmissionDurationsAPI(client);
    const { result } = renderHook(
        () => useGetSubmissionCountsByState({
            user_tags: ["usr_abc"],
            ca_tags: ["ca_1"],
            include_sample_ca: true,
            genotype_tags: ["gen_a", "gen_b"]
        }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/stats/submissions/counts/states", {
        params: {
            user_tags: "usr_abc",
            ca_tags: "ca_1",
            include_sample_ca: true,
            genotype_tags: "gen_a;gen_b"
        }
    });
    expect(result.current.data).toEqual([{ state_tag: "submitted", value: 31 }]);
});

test("useGetProteinGroupCountsByYear calls the protein-groups counts endpoint with filters", async () => {
    const client = createMockClient(() => [
        { year: 2024, protein_groups: 158342, submissions: 23 }
    ]);
    const { useGetProteinGroupCountsByYear } = createSubmissionDurationsAPI(client);
    const { result } = renderHook(
        () => useGetProteinGroupCountsByYear({
            years: "2024;2025",
            state: "done",
            user_tags: ["usr_abc"],
            ca_tags: ["ca_1"],
            include_sample_ca: false,
            genotype_tags: "gen_a"
        }),
        { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.get).toHaveBeenCalledWith("/stats/submissions/counts/protein-groups", {
        params: {
            years: "2024;2025",
            state: "done",
            user_tags: "usr_abc",
            ca_tags: "ca_1",
            include_sample_ca: false,
            genotype_tags: "gen_a"
        }
    });
    expect(result.current.data).toEqual([
        { year: 2024, protein_groups: 158342, submissions: 23 }
    ]);
});
