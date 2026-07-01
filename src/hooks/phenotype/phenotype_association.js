import { useQuery, useMutation } from "@tanstack/react-query"

export function createPhenotypeAssociationsAPI(client) {

    /**
     * @description Query phenotype associations with optional filters. Endpoint: GET '/api/phenotype_associations?query=&phenotype_tag=&disease_tag=&protein_tag=&genotype_tag=&limit='
     * @param {Object} props
     * @param {String} props.query Optional search query to filter by description.
     * @param {String} props.phenotype_tag Optional phenotype tag to filter by.
     * @param {String} props.disease_tag Optional disease tag to filter by.
     * @param {String} props.protein_tag Optional protein tag to filter by.
     * @param {String} props.genotype_tag Optional genotype tag to filter by.
     * @param {Number} props.limit Optional limit for results. Default is 20.
     * @returns {String[]} Array of phenotype association tags.
     */
    async function findPhenotypeAssociations_API({ query = "", phenotype_tag, disease_tag, protein_tag, genotype_tag, limit = 20 } = {}) {
        const res = await client.get(`/phenotype_associations`, { params: { query, phenotype_tag, disease_tag, protein_tag, genotype_tag, limit } })
        return res.data
    }
    const useFindPhenotypeAssociations = (APIParams = { query: "", limit: 20 }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["findPhenotypeAssociations", APIParams.query, APIParams.phenotype_tag, APIParams.disease_tag, APIParams.protein_tag, APIParams.genotype_tag, APIParams.limit],
            queryFn: () => findPhenotypeAssociations_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    /**
     * @description Query a phenotype association by its unique tag. Endpoint: GET '/api/phenotype_associations/:tag'
     * @param {Object} props
     * @param {String} props.tag The unique tag of the phenotype association to retrieve.
     * @returns {Object} The phenotype association object matching the provided tag.
     */
    async function getPhenotypeAssociation_API({ tag }) {
        const res = await client.get(`/phenotype_associations/${tag}`)
        return res.data
    }
    const useGetPhenotypeAssociation = (APIParams = { tag: "" }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getPhenotypeAssociation", APIParams.tag],
            queryFn: () => getPhenotypeAssociation_API({ ...APIParams }),
            enabled: !!APIParams.tag,
            ...useQueryOptions
        })
    }

    /**
     * @description Create a new phenotype association. Endpoint: POST '/api/phenotype_associations'
     * @param {Object} data The full insert model including phenotype_tag (required), and optional protein_tag, att_protein_mutation, disease_tag, disease_text, variant_tag, genotype_tag, condition_applications, publication, observation_notes, description.
     * @returns {String} The tag of the created phenotype association.
     */
    async function postPhenotypeAssociation_API(data) {
        const res = await client.post(`/phenotype_associations`, data)
        return res.data
    }
    const usePostPhenotypeAssociation = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postPhenotypeAssociation_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    /**
     * @description Delete a phenotype association by its unique tag. Endpoint: DELETE '/api/phenotype_associations/:tag'
     * @param {Object} props
     * @param {String} props.tag The unique tag of the phenotype association to delete.
     * @returns {Boolean} True if deletion was successful.
     */
    async function deletePhenotypeAssociation_API({ tag }) {
        const res = await client.delete(`/phenotype_associations/${tag}`)
        return res.data
    }
    const useDeletePhenotypeAssociation = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => deletePhenotypeAssociation_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    return {
        useFindPhenotypeAssociations,
        useGetPhenotypeAssociation,
        usePostPhenotypeAssociation,
        useDeletePhenotypeAssociation,
    }
}