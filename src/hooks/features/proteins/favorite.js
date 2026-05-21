import { useQuery, useQueries, useMutation } from "@tanstack/react-query"
import _ from "lodash" 

export function createProteinFavoriteAPI(client) {

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
     * @description Endpoint: POST '/api/users'
     * @param {Object} props 
     * @param {String} props.tag  Protein tag
     * @param {Boolean} props.remove_if_exists If true, the protein will be removed from the favorites if it is already in the favorites. If false, the protein will be added to the favorites if it is not already in the favorites.
     * @returns {Boolean} props.is_favorite - Protein has been marked as favorite or not. If true, the protein will be added to the favorites, if false, it will be removed from the favorites.
     */
    async function postFavoriteProtein_API({ tag, remove_if_exists }) {
        const res = await client.post(`/features/proteins/favorites/${tag}`, {
            remove_if_exists
        })
        return res.data
    }

    const usePostFavoriteProtein = (useMutationOptions = {}) => {
        return useMutation({mutationFn: (APIParams) => postFavoriteProtein_API({...APIParams}), ...useMutationOptions})
    }


    /**
     * @description Get the information about a feature including gene name, etc. Endpoint: /api/features/${tag}/i
     * @param {Object} props
     * @param {String} props.tag - The feature tag (e.g. Uniprot ID)
     * @returns {import("./types").Feature} The feature information. 
     */
    async function getProteinIsFavorite_API({ tag }) {
        const res = await client.get(`/features/proteins/favorites/${tag}`, { })
        return res.data
    }

    function useGetProteinIsFavorite(APIParams = {tag}, useQueryOptions = { }) {
        return useQuery({
            queryKey: ["getProteinIsFavorite", APIParams.tag],
            queryFn: () => getProteinIsFavorite_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

return {
    useGetProteinIsFavorite,
    usePostFavoriteProtein,
    useGetFavoriteProteins
};
}