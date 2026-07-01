import { useQuery, useMutation } from "@tanstack/react-query"

export function createPhenotypesAPI(client) {

    /**
     * @description Query phenotypes with optional search query and limit. Endpoint: GET '/api/phenotypes?query=&limit='
     * @param {Object} props 
     * @param {String} props.query Optional search query to filter phenotypes by name or description.
     * @param {Number} props.limit Optional limit for the number of phenotypes returned. Default is 20.
     * @returns {Object[]} An array of phenotype objects matching the search query and limit.
     */
    async function getPhenotypes_API({ query = "", limit = 20 } = {}) {
        const res = await client.get(`/phenotypes`, { params: { query, limit } })
        return res.data
    }
    const useGetPhenotypes = (APIParams = { query: "", limit: 20 }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getPhenotypes", APIParams.query, APIParams.limit],
            queryFn: () => getPhenotypes_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    /**
     * @description Query a phenotype by its unique tag. Endpoint: GET '/api/phenotypes/:tag'
     * @param {Object} props 
     * @param {String} props.tag The unique tag of the phenotype to retrieve.
     * @returns {Object} The phenotype object matching the provided tag.
     */
    async function getPhenotype_API({ tag }) {
        const res = await client.get(`/phenotypes/${tag}`)
        return res.data
    }
    const useGetPhenotype = (APIParams = { tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getPhenotype", APIParams.tag],
            queryFn: () => getPhenotype_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    /**
     * @description Create a new phenotype. Endpoint: POST '/api/phenotypes'
     * @param {Object} data The phenotype data to create, including name, description, and optional tag.
     * @returns {Object} The created phenotype object with its assigned tag.
     */
    async function postPhenotype_API(data) {
        const res = await client.post(`/phenotypes`, data)
        return res.data
    }
    const usePostPhenotype = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postPhenotype_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    return {
        useGetPhenotypes,
        useGetPhenotype,
        usePostPhenotype
    }
}