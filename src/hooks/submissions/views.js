// States and states changes of a submission 
import { useQuery, useMutation } from "react-query"
import config from "../../../config"
import axios from "axios"

/**
 * @description Returns the number of views for a submission. Endpoint: GET '/api/submissions/:tag/views'
 * @param {Object} props 
 * @param {String} props.tag The submission tag.
 * @returns {Number} The number of views for the submission
 */
export async function getSubmissionViews_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/submissions/${tag}/views`)
    return res.data
}

export const useGetSubmissionViews = (APIParams = {tag }, useQueryOptions = { staleTime: 50000, placeHolderData : prev => prev || 0}) => {
    return useQuery(["getSubmissionViews", APIParams.tag],
        () => getSubmissionViews_API({ ...APIParams }), useQueryOptions)
}   


/**
 * @description Endpoint: POST '/api/submissions/:tag/views'
 * @param {Object} props 
 * @param {String} props.tag The submission tag.
 * @returns {Boolean} If insertion of view was successful
 */
async function postSubmissionView_API({ tag }) {
    const res = await axios.post(`${config.baseURL}/submissions/${tag}/views`)
    return res.data
}

export const usePostSubmissionView = (useMutationOptions = {}) => {
    return useMutation((APIParams) => postSubmissionView_API({...APIParams}), useMutationOptions)
}
