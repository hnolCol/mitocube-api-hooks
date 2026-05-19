import { useQuery, useQueries } from "@tanstack/react-query"
import _ from "lodash" 

export function createProteinFeatureQueryAPI(client) {

    /**
     * @description Get the protein tags that match the search string. Endpoint: /api/features/proteins/q
     * @param {Object} props
     * @param {String} props.search_string - The search string to match protein tags.
     * @param {Number} props.limit - The maximum number of results to return.
     * @param {String[]} props.proteome_tags - Array of proteome tags to filter the search results.
     * @param {String[]} props.submission_tags - Array of submission tags to filter the search results.
     * @returns {String[]} The protein tags.
     */
    async function getProteinFeatureByQuery_API({ search_string, limit, proteome_tags, submission_tags }) {
        const res = await client.get(`/features/proteins/q`, { params: { search_string, limit, proteome_tags, submission_tags } })
        return res.data
    }

    function useGetProteinFeatureByQuery(APIParams = { search_string, limit, proteome_tags, submission_tags }, useQueryOptions = {}) {
        const proteome_tags = _.isArray(APIParams.proteome_tags) ? APIParams.proteome_tags.join(";") : undefined
        const submission_tags = _.isArray(APIParams.submission_tags) ? APIParams.submission_tags.join(";") : undefined
        APIParams = { ...APIParams, proteome_tags, submission_tags }
        return useQuery({
            queryKey: ["proteinFeatures_query", APIParams.search_string, APIParams.limit, APIParams.proteome_tags, APIParams.submission_tags],
            queryFn: () => getProteinFeatureByQuery_API({ ...APIParams}),
            ...useQueryOptions
        });
    }



    /**
 * @description Get the information about a feature including gene name, etc. Endpoint: /api/features/${tag}/i
 * @param {Object} props
 * @param {String} props.submission_tags - The submission tags (e.g. Uniprot ID)
 * @param {String} props.proteome_tags - The proteome tags
 * @param {String} props.annotation_tags - The annotation tags
 * @returns {import("./types").Feature} The feature information. 
 */
    async function getProteinFavorites_API({ submission_tags, proteome_tags, annotation_tags, limit }) {
        const res = await client.get(`/features/proteins/favorites`, { params: { submission_tags, proteome_tags, annotation_tags, limit }})
        return res.data
    }

    function useGetFavoriteProteins(APIParams = { submission_tags, proteome_tags, annotation_tags, limit }, useQueryOptions = {}) {
        //take care of lists
        const proteome_tags = _.isArray(APIParams.proteome_tags) ? APIParams.proteome_tags.join(";") : undefined
        const submission_tags = _.isArray(APIParams.submission_tags) ? APIParams.submission_tags.join(";") : undefined
        const annotation_tags = _.isArray(APIParams.annotation_tags) ? APIParams.annotation_tags.join(";") : undefined
        APIParams = { ...APIParams, proteome_tags, submission_tags, annotation_tags }
        return useQuery({
            queryKey: ["getProteinFavorites", APIParams.submission_tags, APIParams.proteome_tags, APIParams.annotation_tags, APIParams.limit],
            queryFn: () => getProteinFavorites_API({ ...APIParams }),
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
    useGetProteins,
    useGetFavoriteProteins
};

}