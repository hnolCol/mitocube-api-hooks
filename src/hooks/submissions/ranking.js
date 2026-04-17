import { useQuery, useMutation } from "@tanstack/react-query"

export function createSubmissionRankingAPI(client) {

    /**
     * @description Fetch submissions based on filter criteria. If no filter is provided, it returns all submissions.
     * @param {Object} props 
     * @param {String} props.tag - The submission ranking stats tag t
     * @returns 
     */
    async function getSubmissionRanking_API({tag}) {
        const res = await client.get(`/submissions/${tag}/ranking`)
        return res.data 
    }
    const useGetSubmissionRanking = (APIParams = {tag}, useQueryOptions = {staleTime : 300000, placeholderData: (prev) => prev}) => {
        return useQuery({
            queryKey: ["submission_ranking", APIParams.tag],
            queryFn: () => getSubmissionRanking_API({ ...APIParams }),
            ...useQueryOptions
        })
    }


    /**
     * @description Fetch submissions based on filter criteria. If no filter is provided, it returns all submissions.
     * @param {Object} props 
     * @param {String} props.tag - The submission ranking stats tag to fetch exclusively quantified protein groups for.
     * @param {String} props.attribute_tags - The attribute tags to filter the exclusively quantified protein groups. Multiple can be provided, separated by semicolons.
     * @param {Number} props.limit - The maximum number of results to return.
     * @returns {import("./types").ExclusivelyQuantifiedProteinGroup[]} Exclusively quantified protein groups for the submission, filtered by the provided attribute tags if given.
     */
    async function getSubmissionExclusivelyQuantifiedProteinGroups_API({tag, attribute_tags, limit}) {
        const res = await client.get(`/submissions/${tag}/ranking/exclusively_quantified`, {params: { attribute_tags, limit }})
        return res.data 
    }
    const useGetSubmissionExclusivelyQuantifiedProteinGroups = (APIParams = {tag, attribute_tags, limit}, useQueryOptions = {staleTime : 300000, placeholderData: (prev) => prev}) => {
        return useQuery({
            queryKey: ["submission_exclusively_quantified_protein_groups", APIParams.tag, APIParams.attribute_tags, APIParams.limit],
            queryFn: () => getSubmissionExclusivelyQuantifiedProteinGroups_API({ ...APIParams }),
            ...useQueryOptions
        })
    }


    /**
     * @description Update an attribute value in the database. 
     * @param {Object} props 
     * @param {String} props.tag - The submission ranking stats tag to update
     * @returns 
     */
    async function patchSubmissionRanking_API({ tag }) {
        const res = await client.patch(`/submissions/${tag}/protein_groups/statistics`    )
        return res 
    }

    const useUpdateSubmissionStats = (useMutationOptions = {}) => {
        return useMutation({mutationFn: (APIParams) =>  patchSubmissionRanking_API({...APIParams}), ...useMutationOptions})
    }

    return {
        useGetSubmissionRanking,
        useGetSubmissionExclusivelyQuantifiedProteinGroups,
        useUpdateSubmissionStats
    }

}