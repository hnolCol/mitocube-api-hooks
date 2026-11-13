import { useQuery } from "@tanstack/react-query"

export function createSubmissionQueryAPI(client) {

    /**
     * @description Fetch submissions based on filter criteria. If no filter is provided, it returns all submissions.
     * @param {Object} props 
     * @param {String} props.search_string
     * @param {Boolean} props.group_by_state - If true, the results are grouped by submission state.
     * @param {Number} props.limit - The maximum number of results to return.
     * @param {Boolean} props.ordered - If true, the results are ordered by the submission date.
     * @param {String|String[]} [props.research_group_tags] Research group tag(s) restricting the submissions to submissions created by members of these research groups (semicolon-delimited if string).
     * @param {Boolean} [props.group_by_research_group=false] If true, the matched submission tags are grouped by the creator's research group.
     * @returns 
     */
    async function getSubmissionBySearchString_API({ search_string, state, limit, ordered, sort_order, group_by_state, genotype_tag, user_tags, user_role, attribute_tag, trait_tag, ca_tags, include_sample_ca, group_by_user, group_by_date, ca_search_string, protein_tags, sort_by_views, sort_by_state_duration, consortium_tags, research_group_tags, group_by_research_group }) {
        const res = await client.get(`/submissions/q`, { params: { search_string, state, limit, ordered, sort_order, group_by_state, group_by_date, genotype_tag, user_tags, user_role, attribute_tag, trait_tag, ca_tags, include_sample_ca, group_by_user, ca_search_string, protein_tags, sort_by_views, sort_by_state_duration, consortium_tags, research_group_tags: Array.isArray(research_group_tags) && research_group_tags.length > 0 ? research_group_tags.join(";") : research_group_tags, group_by_research_group } })
        return res.data
    }
    

    const useGetSubmissionByQuery = (APIParams = { search_string, state, limit, ordered, sort_order, group_by_state, group_by_date, group_by_user, genotype_tag, user_tags, user_role, attribute_tag, trait_tag, ca_tags, ca_search_string, sort_by_views, sort_by_state_duration, protein_tags, consortium_tags, research_group_tags, group_by_research_group }, useQueryOptions = { staleTime: 300000, placeholderData: (prev) => prev }) => {
        return useQuery({
            queryKey: ["submission_query", APIParams.search_string, APIParams.state, APIParams.limit, APIParams.ordered, APIParams.sort_order, APIParams.group_by_state, APIParams.group_by_date, APIParams.genotype_tag, APIParams.user_tags, APIParams.user_role,
                APIParams.ca_tags, APIParams.attribute_tag, APIParams.trait_tag, APIParams.include_sample_ca, APIParams.group_by_user, APIParams.ca_search_string, APIParams.protein_tags, APIParams.sort_by_views, APIParams.sort_by_state_duration, APIParams.consortium_tags, APIParams.research_group_tags, APIParams.group_by_research_group],
            queryFn: () => getSubmissionBySearchString_API({ ...APIParams }),
            ...useQueryOptions
        })
    }
    
    /**
     * @description Fetch the count of submissions matching the filter criteria. If no filter is provided, it returns the count of all submissions.
     * @param {*} param0 
     * @returns 
     */
    async function getSubmissionQueryCount_API({ search_string, state, genotype_tag, user_tags, user_role, attribute_tag, trait_tag, limit, ordered, group_by_state, include_sample_ca, ca_search_string, ca_tags, protein_tags, consortium_tags }) {
        const res = await client.get(`/submissions/q/count`, { params: { search_string, state, genotype_tag, user_tags, user_role, attribute_tag, trait_tag, limit, ordered, group_by_state, include_sample_ca, ca_search_string, ca_tags, protein_tags, consortium_tags } })
        return res.data
    }

    const useGetSubmissionQueryCount = (APIParams = { search_string, state, genotype_tag, user_tags, user_role, attribute_tag, trait_tag, limit, ordered, group_by_state, include_sample_ca, ca_search_string, ca_tags, protein_tags, consortium_tags }, useQueryOptions) => {
        return useQuery({
            queryKey: ["submissions", "query", "count", APIParams.search_string, APIParams.state, APIParams.genotype_tag, APIParams.user_tags, APIParams.user_role, APIParams.attribute_tag, APIParams.trait_tag, APIParams.limit, APIParams.ordered, APIParams.group_by_state, APIParams.include_sample_ca, APIParams.ca_search_string, APIParams.ca_tags, APIParams.protein_tag, APIParams.consortium_tags],
            queryFn: () => getSubmissionQueryCount_API({ ...APIParams }),
            ...useQueryOptions
        });
    }


    /**
     * @description Returns the number of submissions by a property. Endpoint: GET '/api/submissions/count'
     * @param {Object} props 
     * @param {String|String[]} [props.tags] Submission tag(s) restricting the counted submissions (semicolon-delimited if string).
     * @param {String} [props.group] Grouping of the counts ("state", "user", "attribute", "attribute_value", "feature", "genotype" or "research_group").
     * @returns {Object} Dict of group tag to submission count.
     */
    async function getSubmissionCountsByGroup_API({ tags, group }) {
        const res = await client.get(`/submissions/count`, {
            params: {
                tags: Array.isArray(tags) && tags.length > 0 ? tags.join(";") : tags,
                group
            }
        })
        return res.data
    }

    const useGetSubmissionCountsByGroup = (APIParams = { tags, group }, useQueryOptions = { staleTime: 300000 }) => {
        return useQuery({
            queryKey: ["submissions", "count", "group", APIParams.tags, APIParams.group],
            queryFn: () => getSubmissionCountsByGroup_API({ ...APIParams }),
            ...useQueryOptions
        })
    }


    async function getTrendingSubmissions_API({ limit }) {
        const res = await client.get(`/submissions/trending`, { params: { limit } })
        return res.data
    }   
    const useGetTrendingSubmissions = (APIParams = { limit }) => {
        return useQuery({
            queryKey: ["submissions", "trending", APIParams.limit],
            queryFn: () => getTrendingSubmissions_API({ ...APIParams }),
            staleTime: 300000
        })
    }


    
    return {
        useGetSubmissionByQuery,
        useGetSubmissionQueryCount,
        useGetSubmissionCountsByGroup,
        useGetTrendingSubmissions
    }
}