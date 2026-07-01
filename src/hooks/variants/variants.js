import { useQuery, useMutation } from "@tanstack/react-query"

export function createVariantsAPI(client) {

    /**
     * @description Query a variant by its unique tag. Endpoint: GET '/api/variants/:tag'
     * @param {Object} props    
     * @param {String} props.tag The unique tag of the variant to retrieve.
     * @returns {Object} The variant object matching the provided tag.
     */
    async function getVariant_API({ tag }) {
        const res = await client.get(`/variants/${tag}`)
        return res.data
    }
    const useGetVariant = (APIParams = { tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getVariant", APIParams.tag],
            queryFn: () => getVariant_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    /**
     * @description Query variants by associated protein tag. Endpoint: GET '/api/variants?protein_tag=&limit='
     * @param {Object} props 
     * @param {String} props.protein_tag The unique tag of the associated protein to filter variants.
     * @param {Number} props.limit Optional limit for the number of variants returned. Default is 20.
     * @returns {Object[]} An array of variant objects associated with the specified protein tag, limited by the provided limit.
     */
    async function findVariantsByProtein_API({ protein_tag, limit = 20 }) {
        const res = await client.get(`/variants`, { params: { protein_tag, limit } })
        return res.data
    }
    const useFindVariantsByProtein = (APIParams = { protein_tag: "", limit: 20 }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["findVariantsByProtein", APIParams.protein_tag, APIParams.limit],
            queryFn: () => findVariantsByProtein_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    /**
     * @description Query variants by associated disease tag. Endpoint: GET '/api/variants?disease_tag=&limit='
     * @param {Object} props
     * @param {String} props.disease_tag The unique tag of the associated disease to filter variants.
     * @param {Number} props.limit Optional limit for the number of variants returned. Default is 20.
     * @returns {Object[]} An array of variant objects associated with the specified disease tag, limited by the provided limit.
     */
    async function findVariantsByDisease_API({ disease_tag, limit = 20 }) {
        const res = await client.get(`/variants`, { params: { disease_tag, limit } })
        return res.data
    }
    const useFindVariantsByDisease = (APIParams = { disease_tag: "", limit: 20 }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["findVariantsByDisease", APIParams.disease_tag, APIParams.limit],
            queryFn: () => findVariantsByDisease_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    /**
     * @description Delete a variant by its unique tag. Endpoint: DELETE '/api/variants/:tag'
     * @param {Object} props 
     * @param {String} props.tag The unique tag of the variant to delete.
     * @returns {Boolean} If deletion was successful
     */
    async function deleteVariant_API({ tag }) {
        const res = await client.delete(`/variants/${tag}`)
        return res.data
    }
    const useDeleteVariant = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => deleteVariant_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    return {
        useGetVariant,
        useFindVariantsByProtein,
        useFindVariantsByDisease,
        useDeleteVariant
    }
}