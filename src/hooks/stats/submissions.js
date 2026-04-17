// States and states changes of a submission 
import { useQuery, useMutation } from "@tanstack/react-query"

export function createSubmissionDurationsAPI(client) {

/**
 * @description Returns the number of views for a submission. Endpoint: GET '/api/submissions/:tag/views'
 * @param {Object} props 
 * @param {String} props.state01 The initial submission state.
 * @param {String} props.state02 The target submission state.
 * @param {Boolean} props.aggregate If true, the results are aggregated and returned as an object with min, max, mean, median, stddev.
 * @returns {Number} The number of views for the submission
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

return {
    useGetSubmissionDuration
};

}