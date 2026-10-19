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
 * @returns {Number|Object|Object[]} The duration between the two submission states, a distribution object, or per-year quantile rows if group_by_year is true.
 */
async function getSubmissionDurations_API({ state_01, state_02, aggregate = "dist", group_by_year = false, years, state }) {
    const res = await client.get(`/stats/submissions/durations`, {
        params: { state_01, state_02, aggregate, group_by_year, years, state }
    })
    return res.data
}

const useGetSubmissionDuration = (APIParams = {state_01, state_02, aggregate }, useQueryOptions = { staleTime: 50000 }) => {
    return useQuery({
        queryKey: ["getSubmissionDurations", APIParams.state_01, APIParams.state_02, APIParams.aggregate, APIParams.group_by_year, APIParams.years, APIParams.state],
        queryFn: () => getSubmissionDurations_API({ ...APIParams }),
        ...useQueryOptions
    })
}   

/**
 * @description Returns per-year quantile summaries of the number of samples per submission, bucketed by the submission's created_at year. Endpoint: GET '/api/stats/submissions/samples_per_submission'
 * @param {Object} props 
 * @param {String} [props.years] Semicolon-delimited years restricting the year buckets (e.g. "2024;2025").
 * @param {String} [props.state] Semicolon-delimited submission states restricting the submissions (e.g. "submitted;done").
 * @returns {Object[]} Flat rows [{ year, min, q25, median, q75, max, N }].
 */
async function getSamplesPerSubmission_API({ years, state }) {
    const res = await client.get(`/stats/submissions/samples_per_submission`, {
        params: { years, state }
    })
    return res.data
}

const useGetSamplesPerSubmission = (APIParams = {}, useQueryOptions = { staleTime: 50000 }) => {
    return useQuery({
        queryKey: ["getSamplesPerSubmission", APIParams.years, APIParams.state],
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

return {
    useGetSubmissionDuration,
    useGetSamplesPerSubmission,
    useGetSubmissionViews,
    useGetProteinViews
};

}