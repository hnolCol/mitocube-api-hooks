import { useQuery, useMutation } from "react-query"
import axios from "axios"
import config from "../../../config"
/**
 * @description Returns the comments for a submission using its tag
 * @param {Object} props
 * @param {String} props.tag Submission tag
 * @returns {import("./types").SubmissionSamples} - The submission comments.  
 */
async function getSubmissionComments_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/submissions/${tag}/comments`)
    return res.data 
}

export const useGetSubmissionComments = (APIParams = {tag}, useQueryOptions = {}) => {
    return useQuery(["submission_samples", APIParams.tag],
        () => getSubmissionComments_API({ ...APIParams }), useQueryOptions)
}



/**
 * @description Endpoint: POST '/api/users'
 * @param {Object} props 
 * @param {String} props.tag  Submission tag 
 * @param {String[]} - Tags associated with the given comment. For example trouble shoot, maintenance, performance 
 */
async function postComment_API({ tag, content, tags }) {
    const res = await axios.post(`${config.baseURL}/submissions/${tag}/comments`,
        {
            content,
            tags
    }
    )
    return res.data 
}

export const usePostComment = (useMutationOptions = {}) => {
    return useMutation((APIParams) => postComment_API({...APIParams}), useMutationOptions)
}