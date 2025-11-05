import axios from "axios"
import { useQuery, useMutation } from "react-query"
import config from "../../../config";
/**
 * @description Returns the title of the submission.
 * @param {Object} props 
 * @param {String} props.tag The submission tag
 * @returns {String} The title of the submission. If the tag is not
 * assiciated with a submission an error is returned.
 */

export async function getSubmissionTitle_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/submissions/${tag}/title`)
    return res.data
}
        
export const useGetSubmissionTitle = (APIParams = {tag}, useQueryOptions = { staleTime: 200000}) => {
    return useQuery(["getSubmissionTitle", APIParams.tag],
        () => getSubmissionTitle_API({ ...APIParams }), useQueryOptions)
}



/**
 * @description Updates the state of the submission. A state can go in both directions. 
 * @param {Object} props 
 * @param {String} props.tag Submission tag 
 * @param {Number} props.state The new state of the submission. 
 */
async function patchSubmissionTitle_API({ tag, title }) {

    const res = await axios.patch(`/api/submissions/${tag}/title`, {}, { params: { title } })
    return res.data
}

export const usePatchSubmissionTitle = (useMutationOptions = {}) => {
    return useMutation((APIParams) => patchSubmissionTitle_API({...APIParams}), useMutationOptions)
}
