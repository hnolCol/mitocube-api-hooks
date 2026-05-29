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
    async function getSubmissionBySearchString_API({search_string, state, limit, ordered, group_by_state, genotype_tag, user_tag, attribute_tag, trait_tag, ca_tags, include_sample_ca, group_by_user, group_by_date, ca_search_string}) {
        const res = await client.get(`/submissions/q`, {params : {search_string, state, limit, ordered, group_by_state, group_by_date, genotype_tag, user_tag, attribute_tag, trait_tag, ca_tags, include_sample_ca, group_by_user, ca_search_string}})
        return res.data 
    }
    
    const useGetSubmissionByQuery = (APIParams = {search_string, state, limit, ordered, group_by_state, group_by_date, genotype_tag, user_tag, attribute_tag, trait_tag, ca_tags}, useQueryOptions = {staleTime : 300000, placeholderData: (prev) => prev}) => {
        return useQuery({
            queryKey: ["submission_query", APIParams.search_string, APIParams.state, APIParams.limit, APIParams.ordered, APIParams.group_by_state, APIParams.group_by_date, APIParams.genotype_tag, APIParams.user_tag, APIParams.ca_tags, APIParams.attribute_tag, APIParams.trait_tag, APIParams.include_sample_ca, APIParams.group_by_user, APIParams.ca_search_string],
            queryFn: () => getSubmissionBySearchString_API({ ...APIParams }),
            ...useQueryOptions
        })
    }
    
    /**
     * @description Fetch the count of submissions matching the filter criteria. If no filter is provided, it returns the count of all submissions.
     * @param {*} param0 
     * @returns 
     */
    async function getSubmissionQueryCount_API({ search_string, state, genotype_tag, user_tag, attribute_tag, trait_tag, limit, ordered, group_by_state, include_sample_ca, ca_search_string, ca_tags }) {
        const res = await client.get(`/submissions/q/count`, { params: { search_string, state, genotype_tag, user_tag, attribute_tag, trait_tag, limit, ordered, group_by_state, include_sample_ca, ca_search_string, ca_tags} })
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