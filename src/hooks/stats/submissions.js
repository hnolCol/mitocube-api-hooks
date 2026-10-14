// States and states changes of a submission 
import { useQuery, useMutation } from "@tanstack/react-query"

export function createSubmissionDurationsAPI(client) {

/**
 * @description Returns the duration between two submission states. Endpoint: GET '/api/submissions/stats/durations'
 * @param {Object} props 
 * @param {String} props.state01 The initial submission state.
 * @param {String} props.state02 The target submission state.
 * @param {Boolean} props.aggregate If true, the results are aggregated and returned as an object with min, max, mean, median, stddev.
 * @returns {Number} The duration between the two submission states
 */
async function getSubmissionDurations_API({ state_01, state_02, aggregate = "dist" }) {
    const res = await client.get(`/stats/submissions/durations`, {
        params: { state_01, state_02, aggregate }
    })
    return res.data
}

const useGetSubmissionDuration = (APIParams = {state_01, state_02, aggregate }, useQueryOptions = { staleTime: 50000 }) => {
    return useQuery({
        queryKey: ["getSubmissionDurations", APIParams.state_01, APIParams.state_02, APIParams.aggregate],
        queryFn: () => getSubmissionDurations_API({ ...APIParams }),
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
    useGetSubmissionViews,
    useGetProteinViews
};

}