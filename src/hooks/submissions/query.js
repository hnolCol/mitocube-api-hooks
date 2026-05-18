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
    async function getSubmissionBySearchString_API({search_string, state, limit, ordered, group_by_state, genotype_tag, user_tag, attribute_tag, trait_tag}) {
        const res = await client.get(`/submissions/q`, {params : {search_string, state, limit, ordered, group_by_state, genotype_tag, user_tag, attribute_tag, trait_tag}})
        return res.data 
    }
    
    const useGetSubmissionByQuery = (APIParams = {search_string, state, limit, ordered, group_by_state, genotype_tag, user_tag, attribute_tag, trait_tag}, useQueryOptions = {staleTime : 300000, placeholderData: (prev) => prev}) => {
        return useQuery({
            queryKey: ["submission_query", APIParams.search_string, APIParams.state, APIParams.limit, APIParams.ordered, APIParams.group_by_state, APIParams.genotype_tag, APIParams.user_tag, APIParams.attribute_tag, APIParams.trait_tag],
            queryFn: () => getSubmissionBySearchString_API({ ...APIParams }),
            ...useQueryOptions
        })
    }
    
    /**
     * @description Fetch the count of submissions matching the filter criteria. If no filter is provided, it returns the count of all submissions.
     * @param {*} param0 
     * @returns 
     */
    async function getSubmissionQueryCount_API({ search_string, state, genotype_tag, user_tag, attribute_tag, trait_tag, limit, ordered, group_by_state }) {
        const res = await client.get(`/submissions/q/count`, { params: { search_string, state, genotype_tag, user_tag, attribute_tag, trait_tag, limit, ordered, group_by_state } })
        return res.data
    }
    
    const useGetSubmissionQueryCount = (APIParams, useQueryOptions) => {
        return useQuery({
            queryKey: ["submissions", "query", "count", APIParams],
            queryFn: () => getSubmissionQueryCount_API({ ...APIParams }),
            ...useQueryOptions
        });
    }
    
    return {
        useGetSubmissionByQuery,
        useGetSubmissionQueryCount
    }
}