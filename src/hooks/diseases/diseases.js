import { useMutation, useQuery } from "@tanstack/react-query"

export function createDiseasesAPI(client) {

    /**
     * @description Query diseases with optional search query and limit. Endpoint: GET '/api/diseases?query=&limit='
     * @param {Object} props 
     * @param {String} props.query Optional search query to filter diseases by name or description.
     * @param {Number} props.limit Optional limit for the number of diseases returned. Default is 20.
     * @returns {Object[]} An array of disease objects matching the search query and limit.
     */
    async function getDiseases_API({ query = "", limit = 20 } = {}) {
        const res = await client.get(`/diseases`, { params: { query, limit } })
        return res.data
    }
    const useGetDiseases = (params = {}, useQueryOptions = {}) => useQuery({
        queryKey: ["diseases", params],
        queryFn: () => getDiseases_API(params),
        ...useQueryOptions
    })
    
    /**
     * @description Query a disease by its unique tag. Endpoint: GET '/api/diseases/:tag'
     * @param {Object} props 
     * @param {String} props.tag The unique tag of the disease to retrieve.
     * @returns {Object} The disease object matching the provided tag.
     */
    async function getDisease_API({ tag }) {
        const res = await client.get(`/diseases/${tag}`)
        return res.data
    }
    const useGetDisease = (tag, useQueryOptions = {}) => useQuery({
        queryKey: ["disease", tag],
        queryFn: () => getDisease_API({ tag }),
        enabled: !!tag,
        ...useQueryOptions
    })

    /**
     * @description Create a new disease. Endpoint: POST '/api/diseases'
     * @param {Object} data The disease data to create. Should include 'name', 'description', and optionally 'tags'.
     * @returns {Object} The created disease object with its unique tag.
     */
    async function postDisease_API(data) {
        const res = await client.post(`/diseases`, data)
        return res.data
    }
    const usePostDisease = (useMutationOptions = {}) => useMutation({
        mutationFn: (params) => postDisease_API(params),
        ...useMutationOptions
    })

    /**
     * @description Delete a disease by its unique tag. Endpoint: DELETE '/api/diseases/:tag'
     * @param {Object} props 
     * @param {String} props.tag The unique tag of the disease to delete.
     * @returns {Object} The response from the server after deletion.
     */
    async function deleteDisease_API({ tag }) {
        const res = await client.delete(`/diseases/${tag}`)
        return res.data
    }
    const useDeleteDisease = (useMutationOptions = {}) => useMutation({
        mutationFn: (params) => deleteDisease_API(params),
        ...useMutationOptions
    })

    return { 
        useGetDiseases, 
        useGetDisease, 
        usePostDisease, 
        useDeleteDisease }
}