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
export async function getSubmissionCA_API({ tag, group_by_attribute = false }) {
    const res = await axios.get(`${config.baseURL}/submissions/${tag}/ca`, {
        params: { group_by_attribute }
    })
    return res.data
}

export const useGetSubmissionConditionApplication = (APIParams = {tag, group_by_attribute}, useQueryOptions = { staleTime: 500}) => {
    return useQuery(["getSubmissionConditionApplication", APIParams.tag, APIParams.group_by_attribute],
        () => getSubmissionCA_API({ ...APIParams }), useQueryOptions)
}
