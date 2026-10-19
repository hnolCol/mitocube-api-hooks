// States and states changes of a submission 
import { useQuery, useMutation } from "@tanstack/react-query"

export function createSubmissionDurationsAPI(client) {

/**
 * @description Returns the duration between two submission states. Endpoint: GET '/api/stats/submissions/durations'
 * @param {Object} props 
 * @param {String} props.state_01 The initial submission state.
 * @param {String} props.state_02 The target submission state.
 * @param {String} [props.aggregate="dist"] The aggregation ("mean", "sum", "std", "median", "min", "max" or "dist").
 * @param {Boolean} [props.group_by_year=false] If true, returns flat per-year quantile rows [{ year, min, q25, median, q75, max, N }] in days, bucketed by the submission's created_at year.
 * @param {String} [props.years] Semicolon-delimited years restricting the year buckets (e.g. "2024;2025").
 * @param {String} [props.state] Semicolon-delimited submission states restricting the submissions (e.g. "submitted;done").
 * @param {String|String[]} [props.user_tags] User tag(s) restricting the submissions to submissions created or collaborated on by these users (semicolon-delimited if string).
 * @param {String|String[]} [props.ca_tags] Condition application tag(s) restricting the submissions to submissions containing these condition applications (semicolon-delimited if string).
 * @param {Boolean} [props.include_sample_ca=false] If true, sample-level condition applications are matched as well when ca_tags is set.
 * @returns {Number|Object|Object[]} The duration between the two submission states, a distribution object, or per-year quantile rows if group_by_year is true.
 */
async function getSubmissionDurations_API({ state_01, state_02, aggregate = "dist", group_by_year = false, years, state, user_tags, ca_tags, include_sample_ca }) {
    const res = await client.get(`/stats/submissions/durations`, {
        params: { state_01, state_02, aggregate, group_by_year, years, state,
            user_tags: Array.isArray(user_tags) && user_tags.length > 0 ? user_tags.join(";") : user_tags,
            ca_tags: Array.isArray(ca_tags) && ca_tags.length > 0 ? ca_tags.join(";") : ca_tags,
            include_sample_ca }
    })
    return res.data
}

const useGetSubmissionDuration = (APIParams = {state_01, state_02, aggregate }, useQueryOptions = { staleTime: 50000 }) => {
    return useQuery({
        queryKey: ["getSubmissionDurations", APIParams.state_01, APIParams.state_02, APIParams.aggregate, APIParams.group_by_year, APIParams.years, APIParams.state, APIParams.user_tags, APIParams.ca_tags, APIParams.include_sample_ca],
        queryFn: () => getSubmissionDurations_API({ ...APIParams }),
        ...useQueryOptions
    })
}   

/**
 * @description Returns per-year quantile summaries of the number of samples per submission, bucketed by the submission's created_at year. Endpoint: GET '/api/stats/submissions/samples_per_submission'
 * @param {Object} props 
 * @param {String} [props.years] Semicolon-delimited years restricting the year buckets (e.g. "2024;2025").
 * @param {String} [props.state] Semicolon-delimited submission states restricting the submissions (e.g. "submitted;done").
 * @param {String|String[]} [props.user_tags] User tag(s) restricting the submissions to submissions created or collaborated on by these users (semicolon-delimited if string).
 * @param {String|String[]} [props.ca_tags] Condition application tag(s) restricting the submissions to submissions containing these condition applications (semicolon-delimited if string).
 * @param {Boolean} [props.include_sample_ca=false] If true, sample-level condition applications are matched as well when ca_tags is set.
 * @returns {Object[]} Flat rows [{ year, min, q25, median, q75, max, N }].
 */
async function getSamplesPerSubmission_API({ years, state, user_tags, ca_tags, include_sample_ca }) {
    const res = await client.get(`/stats/submissions/samples_per_submission`, {
        params: { years, state,
            user_tags: Array.isArray(user_tags) && user_tags.length > 0 ? user_tags.join(";") : user_tags,
            ca_tags: Array.isArray(ca_tags) && ca_tags.length > 0 ? ca_tags.join(";") : ca_tags,
            include_sample_ca }
    })
    return res.data
}

const useGetSamplesPerSubmission = (APIParams = {}, useQueryOptions = { staleTime: 50000 }) => {
    return useQuery({
        queryKey: ["getSamplesPerSubmission", APIParams.years, APIParams.state, APIParams.user_tags, APIParams.ca_tags, APIParams.include_sample_ca],
        queryFn: () => getSamplesPerSubmission_API({ ...APIParams }),
        ...useQueryOptions
    })
}   

/**
 * @description Returns the number of views for a submission. Endpoint: GET '/api/stats/submissions/{submission_tag}/views'
 * @param {Object} props 
 * @param {String} props.submission_tag The submission tag.
 * @returns {Number} The number of views for the submission
 */
async function getSubmissionViews_API({ submission_tag }) {
    const res = await client.get(`/stats/submissions/${submission_tag}/views`)
    return res.data
}

const useGetSubmissionViews = (APIParams = { submission_tag }, useQueryOptions = { staleTime: 50000 }) => {
    return useQuery({
        queryKey: ["getSubmissionViews", APIParams.submission_tag],
        queryFn: () => getSubmissionViews_API({ ...APIParams }),
        ...useQueryOptions
    })
}

/**
 * @description Returns the number of views for a protein feature. Endpoint: GET '/api/stats/submissions/proteins/{feature_tag}/views'
 * @param {Object} props 
 * @param {String} props.feature_tag The protein feature tag.
 * @returns {Number} The number of views for the protein feature
 */
async function getProteinViews_API({ feature_tag }) {
    const res = await client.get(`/stats/submissions/proteins/${feature_tag}/views`)
    return res.data
}

const useGetProteinViews = (APIParams = { feature_tag }, useQueryOptions = { staleTime: 50000 }) => {
    return useQuery({
        queryKey: ["getProteinViews", APIParams.feature_tag],
        queryFn: () => getProteinViews_API({ ...APIParams }),
        ...useQueryOptions
    })
}

/**
 * @description Returns the number of submissions per research group or trait and year. Endpoint: GET '/api/stats/submissions/counts/submissions'
 * @param {Object} props 
 * @param {String} [props.group_by="research_group"] Grouping of the counts ("research_group", "user" or "trait").
 * @param {String} [props.years] Semicolon-delimited years restricting the year buckets (e.g. "2024;2025").
 * @param {String} [props.state] Semicolon-delimited submission states restricting the submissions (e.g. "submitted;done").
 * @param {String} [props.attribute_tag] Attribute tag restricting the traits (only for group_by="trait").
 * @param {String} [props.group_by_entity="trait"] Entity used for grouping ("trait" or "condition_application").
 * @param {String|String[]} [props.user_tags] User tag(s) restricting the submissions to submissions created or collaborated on by these users (semicolon-delimited if string).
 * @param {String|String[]} [props.ca_tags] Condition application tag(s) restricting the submissions to submissions containing these condition applications (semicolon-delimited if string).
 * @param {Boolean} [props.include_sample_ca=false] If true, sample-level condition applications are matched as well when ca_tags is set.
 * @returns {Object[]} Flat rows [{ group, count, year }].
 */
async function getSubmissionCountsByYear_API({ group_by = "research_group", years, state, attribute_tag, group_by_entity = "trait", user_tags, ca_tags, include_sample_ca }) {
    const res = await client.get(`/stats/submissions/counts/submissions`, {
        params: { group_by, years, state, attribute_tag, group_by_entity,
            user_tags: Array.isArray(user_tags) && user_tags.length > 0 ? user_tags.join(";") : user_tags,
            ca_tags: Array.isArray(ca_tags) && ca_tags.length > 0 ? ca_tags.join(";") : ca_tags,
            include_sample_ca }
    })
    return res.data
}

const useGetSubmissionCountsByYear = (APIParams = {}, useQueryOptions = { staleTime: 50000 }) => {
    return useQuery({
        queryKey: ["getSubmissionCountsByYear", APIParams.group_by, APIParams.years, APIParams.state, APIParams.attribute_tag, APIParams.group_by_entity, APIParams.user_tags, APIParams.ca_tags, APIParams.include_sample_ca],
        queryFn: () => getSubmissionCountsByYear_API({ ...APIParams }),
        ...useQueryOptions
    })
}   

/**
 * @description Returns the number of samples per research group and year. Endpoint: GET '/api/stats/submissions/counts/samples'
 * @param {Object} props 
 * @param {String} [props.group_by="research_group"] Grouping of the counts ("research_group").
 * @param {String} [props.years] Semicolon-delimited years restricting the year buckets (e.g. "2024;2025").
 * @param {String} [props.state] Semicolon-delimited submission states restricting the submissions (e.g. "submitted;done").
 * @param {String|String[]} [props.user_tags] User tag(s) restricting the submissions to submissions created or collaborated on by these users (semicolon-delimited if string).
 * @param {String|String[]} [props.ca_tags] Condition application tag(s) restricting the submissions to submissions containing these condition applications (semicolon-delimited if string).
 * @param {Boolean} [props.include_sample_ca=false] If true, sample-level condition applications are matched as well when ca_tags is set.
 * @returns {Object[]} Flat rows [{ group, count, year }].
 */
async function getSampleCountsByResearchGroup_API({ group_by = "research_group", years, state, user_tags, ca_tags, include_sample_ca }) {
    const res = await client.get(`/stats/submissions/counts/samples`, {
        params: { group_by, years, state,
            user_tags: Array.isArray(user_tags) && user_tags.length > 0 ? user_tags.join(";") : user_tags,
            ca_tags: Array.isArray(ca_tags) && ca_tags.length > 0 ? ca_tags.join(";") : ca_tags,
            include_sample_ca }
    })
    return res.data
}

const useGetSampleCountsByResearchGroup = (APIParams = {}, useQueryOptions = { staleTime: 50000 }) => {
    return useQuery({
        queryKey: ["getSampleCountsByResearchGroup", APIParams.group_by, APIParams.years, APIParams.state, APIParams.user_tags, APIParams.ca_tags, APIParams.include_sample_ca],
        queryFn: () => getSampleCountsByResearchGroup_API({ ...APIParams }),
        ...useQueryOptions
    })
}   

/**
 * @description Returns the number of submissions per user and year. Endpoint: GET '/api/stats/submissions/counts/users'
 * @param {Object} props 
 * @param {String} [props.years] Semicolon-delimited years restricting the year buckets (e.g. "2024;2025").
 * @param {String} [props.state] Semicolon-delimited submission states restricting the submissions (e.g. "submitted;done").
 * @param {String|String[]} [props.research_group_tags] Research group tag(s) restricting the counted users (semicolon-delimited if string).
 * @param {String|String[]} [props.user_tags] User tag(s) restricting the submissions to submissions created or collaborated on by these users (semicolon-delimited if string).
 * @param {String|String[]} [props.ca_tags] Condition application tag(s) restricting the submissions to submissions containing these condition applications (semicolon-delimited if string).
 * @param {Boolean} [props.include_sample_ca=false] If true, sample-level condition applications are matched as well when ca_tags is set.
 * @returns {Object[]} Flat rows [{ group, count, year }].
 */
async function getSubmissionCountsByUser_API({ years, state, research_group_tags, user_tags, ca_tags, include_sample_ca }) {
    const res = await client.get(`/stats/submissions/counts/users`, {
        params: { years, state,
            research_group_tags: Array.isArray(research_group_tags) && research_group_tags.length > 0 ? research_group_tags.join(";") : research_group_tags,
            user_tags: Array.isArray(user_tags) && user_tags.length > 0 ? user_tags.join(";") : user_tags,
            ca_tags: Array.isArray(ca_tags) && ca_tags.length > 0 ? ca_tags.join(";") : ca_tags,
            include_sample_ca }
    })
    return res.data
}

const useGetSubmissionCountsByUser = (APIParams = {}, useQueryOptions = { staleTime: 50000 }) => {
    return useQuery({
        queryKey: ["getSubmissionCountsByUser", APIParams.years, APIParams.state, APIParams.research_group_tags, APIParams.user_tags, APIParams.ca_tags, APIParams.include_sample_ca],
        queryFn: () => getSubmissionCountsByUser_API({ ...APIParams }),
        ...useQueryOptions
    })
}   

return {
    useGetSubmissionDuration,
    useGetSamplesPerSubmission,
    useGetSubmissionCountsByYear,
    useGetSampleCountsByResearchGroup,
    useGetSubmissionCountsByUser,
    useGetSubmissionViews,
    useGetProteinViews,
};

}