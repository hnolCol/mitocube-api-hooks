import { useQuery, useQueries } from "@tanstack/react-query"
import _ from "lodash" 

export function createProteinFeatureQueryAPI(client) {

    /**
     * @description Get the protein tags that match the search string. Endpoint: /api/features/proteins/q
     * @param {Object} props
     * @param {String} props.search_string - The search string to match protein tags.
     * @param {Number} props.limit - The maximum number of results to return.
     * @returns {String[]} The protein tags.
     */
    async function getProteinFeatureByQuery_API({ search_string, limit, proteome_tags }) {
        const res = await client.get(`/features/proteins/q`, { params: { search_string, limit, proteome_tags } })
        return res.data
    }

    function useGetProteinFeatureByQuery(APIParams = { search_string, limit, proteome_tags }, useQueryOptions = {}) {
        const proteome_tags = _.isArray(APIParams.proteome_tags) ? APIParams.proteome_tags.join(";") : undefined
        APIParams = { ...APIParams, proteome_tags }
        return useQuery({
            queryKey: ["proteinFeatures_query", APIParams.search_string, APIParams.limit, proteome_tags],
            queryFn: () => getProteinFeatureByQuery_API({ ...APIParams}),
            ...useQueryOptions
        });
    }

    /**
     * @description Get the information about a feature including gene name, etc. Endpoint: /api/features/${tag}/i
     * @param {Object} props
     * @param {String} props.tag - The feature tag (e.g. Uniprot ID)
     * @returns {import("./types").Feature} The feature information. 
     */
    async function getProteinByTag_API({ tag }) {
        const res = await client.get(`/features/proteins/${tag}`, { })
        return res.data
    }

    function useGetProteinByTag(APIParams = {tag}, useQueryOptions = { }) {
        return useQuery({
            queryKey: ["getProtein", APIParams.tag],
            queryFn: () => getProteinByTag_API({ ...APIParams }),
            ...useQueryOptions
        });
    }


    const useGetProteins = (APIParams = { tags: [] }, useQueryOptions = {}) => {
        return useQueries(
            {queries: APIParams.tags.map((tag) => ({
                queryKey: ["getProtein", tag],
                queryFn: () => getProteinByTag_API({ tag }),
                staleTime: Infinity,
                ...useQueryOptions
            }))}
        )
    }

return {
    useGetProteinFeatureByQuery,
    useGetProteinByTag,
    useGetProteins
};

}