import { useQuery } from "@tanstack/react-query"

export function createSubmissionQueryAPI(client) {

    /**
     * @description Fetch submissions based on filter criteria. If no filter is provided, it returns all submissions.
     * @param {Object} props 
     * @param {String} props.search_string
     * @param {Boolean} props.group_by_state - If true, the results are grouped by submission state.
     * @param {Number} props.limit - The maximum number of results to return.
     * @param {Boolean} props.ordered - If true, the results are ordered by the submission date.
     * @returns 
     */
    async function getSubmissionBySearchString_API({search_string, state, limit, ordered, group_by_state, group_by_user}) {
        const res = await client.get(`/submissions/q`, {params : {search_string, state, limit, ordered, group_by_state, group_by_user}})
        return res.data 
    }
    const useGetSubmissionByQuery = (APIParams = {search_string, state, limit, ordered, group_by_state, group_by_user}, useQueryOptions = {staleTime : 300000, placeholderData: (prev) => prev}) => {
        return useQuery({
            queryKey: ["submission_query", APIParams.search_string, APIParams.state, APIParams.limit, APIParams.ordered, APIParams.group_by_state, APIParams.group_by_user],
            queryFn: () => getSubmissionBySearchString_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    return {
        useGetSubmissionByQuery
    }

}