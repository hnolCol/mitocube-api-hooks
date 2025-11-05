import { useQuery } from "react-query"
import config from "../../../config"
import axios from "axios"
/**
 * @description Fetch submissions based on filter criteria. If no filter is provided, it returns all submissions.
 * @param {Object} props 
 * @param {String} props.search_string
 * @param {Boolean} props.group_by_state - If true, the results are grouped by submission state.
 * @param {Number} props.limit - The maximum number of results to return.
 * @param {Boolean} props.ordered - If true, the results are ordered by the submission date.
 * @returns 
 */
async function getSubmissionBySearchString_API({search_string, state, limit, ordered, group_by_state}) {
    const res = await axios.get(`${config.baseURL}/submissions/q`, {params : {search_string, state, limit, ordered, group_by_state}})
    return res.data 
}
export const useGetSubmissionByQuery = (APIParams = {search_string, state, limit, ordered, group_by_state}, useQueryOptions = {staleTime : 300000, placeholderData: (prev) => prev}) => {
    return useQuery(["submission_query", APIParams.search_string, APIParams.state, APIParams.limit, APIParams.ordered, APIParams.group_by_state],
        () => getSubmissionBySearchString_API({ ...APIParams }), useQueryOptions)
}
