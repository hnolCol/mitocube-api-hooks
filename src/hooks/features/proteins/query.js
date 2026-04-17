import { useQuery } from "@tanstack/react-query"

export function createProteinFeatureQueryAPI(client) {

    /**
     * @description Get the protein tags that match the search string. Endpoint: /api/features/proteins/q
     * @param {Object} props
     * @param {String} props.search_string - The search string to match protein tags.
     * @param {Number} props.limit - The maximum number of results to return.
     * @returns {String[]} The protein tags.
     */
    async function getProteinFeatureByQuery_API({ search_string, limit }) {
        const res = await client.get(`/features/proteins/q`, { params: { search_string, limit } })
        return res.data
    }

    function useGetProteinFeatureByQuery(APIParams = {search_string, limit}, useQueryOptions = { }) {
        return useQuery({
            queryKey: ["proteinFeatures_query", APIParams.search_string, APIParams.limit],
            queryFn: () => getProteinFeatureByQuery_API({ ...APIParams }),
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
            queryKey: ["protein", APIParams.tag],
            queryFn: () => getProteinByTag_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

return {
    useGetProteinFeatureByQuery,
    useGetProteinByTag
};

}