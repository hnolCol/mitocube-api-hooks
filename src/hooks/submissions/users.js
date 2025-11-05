// States and states changes of a submission 
import { useQuery } from "react-query"
import config from "../../../config"
import axios from "axios"

/**
 * @description Returns the condition applications defined for the submission
 * @param {Object} props 
 * @param {String} props.tag The submission tag.
 * @param {Boolean} props.group_by_attribute - If true, the results are grouped by attribute.
 * @returns {Object} The condition applications for the submission
 */
export async function getSubmissionUsers_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/submissions/${tag}/users`, {
    })
    return res.data
}

export const useGetSubmissionUsers = (APIParams = {tag }, useQueryOptions = { staleTime: 50000, placeHolderData : prev => prev || []}) => {
    return useQuery(["getSubmissionUsers", APIParams.tag],
        () => getSubmissionUsers_API({ ...APIParams }), useQueryOptions)
}
