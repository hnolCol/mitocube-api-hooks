// States and states changes of a submission 
import { useQuery, useMutation } from "@tanstack/react-query"

export function createSubmissionViewsAPI(client) {

/**
 * @description Returns the number of views for a submission. Endpoint: GET '/api/submissions/:tag/views'
 * @param {Object} props 
 * @param {String} props.tag The submission tag.
 * @returns {Number} The number of views for the submission
 */
async function getSubmissionViews_API({ tag }) {
    const res = await client.get(`/submissions/${tag}/views`)
    return res.data
}

const useGetSubmissionViews = (APIParams = {tag }, useQueryOptions = { staleTime: 50000, placeHolderData : prev => prev || 0}) => {
    return useQuery({
        queryKey: ["getSubmissionViews", APIParams.tag],
        queryFn: () => getSubmissionViews_API({ ...APIParams }),
        ...useQueryOptions
    })
}   


/**
 * @description Endpoint: POST '/api/submissions/:tag/views'
 * @param {Object} props 
 * @param {String} props.tag The submission tag.
 * @returns {Boolean} If insertion of view was successful
 */
async function postSubmissionView_API({ tag }) {
    const res = await client.post(`/submissions/${tag}/views`)
    return res.data
}

const usePostSubmissionView = (useMutationOptions = {}) => {
    return useMutation({mutationFn: (APIParams) => postSubmissionView_API({...APIParams}), ...useMutationOptions})
}

return {
    useGetSubmissionViews,
    usePostSubmissionView
};

}