import { useQuery, useMutation } from "@tanstack/react-query"

export function createClinVarAPI(client) {

    /**
     * @description Search ClinVar for diseases matching the provided disease name. Endpoint: GET '/api/clinvar/search?disease=&limit='
     * @param {Object} props
     * @param {String} props.disease The name of the disease to search for in ClinVar.
     * @param {Number} props.limit Optional limit for the number of ClinVar entries returned. Default is 20.
     * @returns {Object} Object containing variants and diseases arrays.
     */
    async function searchClinVar_API({ disease, limit = 20 }) {
        const res = await client.get(`/clinvar/search`, { params: { disease, limit } })
        return res.data
    }
    const useSearchClinVar = (APIParams = { disease: "", limit: 20 }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["searchClinVar", APIParams.disease, APIParams.limit],
            queryFn: () => searchClinVar_API({ ...APIParams }),
            enabled: !!APIParams.disease,
            staleTime: 1000 * 60 * 10,
            ...useQueryOptions
        })
    }

    /**
     * @description Look up a free-text mutation for a given gene in ClinVar. Endpoint: GET '/api/clinvar/variant_lookup?gene=&mutation=&limit='
     * @param {Object} props
     * @param {String} props.gene The gene symbol to search against (e.g. "COX4I1").
     * @param {String} props.mutation Free-text mutation input from user (e.g. "R45C", "Arg45Cys").
     * @param {Number} props.limit Optional limit for the number of candidate variants returned. Default is 10.
     * @returns {Object} Object containing variants array and found boolean.
     */
    async function lookupVariant_API({ gene, mutation, limit = 10 }) {
        const res = await client.get(`/clinvar/variant_lookup`, { params: { gene, mutation, limit } })
        return res.data
    }
    const useVariantLookup = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => lookupVariant_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    /**
     * @description Search ClinVar disease database by name. Endpoint: GET '/api/clinvar/disease_search?query=&limit='
     * @param {Object} props
     * @param {String} props.query The disease name to search for.
     * @param {Number} props.limit Optional limit for the number of diseases returned. Default is 20.
     * @returns {Object} Object containing diseases array.
     */
    async function searchDiseases_API({ query, limit = 20 }) {
        const res = await client.get(`/clinvar/disease_search`, { params: { query, limit } })
        return res.data
    }
    const useSearchDiseases = (APIParams = { query: "", limit: 20 }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["clinvarDiseaseSearch", APIParams.query, APIParams.limit],
            queryFn: () => searchDiseases_API({ ...APIParams }),
            enabled: !!APIParams.query && APIParams.query.length >= 2,
            staleTime: 1000 * 60 * 10,
            ...useQueryOptions
        })
    }

    /**
     * @description Convert a ClinVar variant into a genotype components template.
     * Endpoint: GET '/api/clinvar/variant_to_genotype?variant_id=&protein_tag=&proteome_tag='
     * @param {Object} props
     * @param {String} props.variant_id  ClinVar variant ID
     * @param {String} props.protein_tag UniProt ID of the protein
     * @param {String} props.proteome_tag Proteome tag (e.g. UP000005640)
     * @returns {Object} { text, description, publication, technical_text, components }
     */
    async function variantToGenotype_API({ variant_id, protein_tag, proteome_tag }) {
        const res = await client.get(`/clinvar/variant_to_genotype`, {
            params: { variant_id, protein_tag, proteome_tag },
        })
        return res.data
    }

    const useVariantToGenotype = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => variantToGenotype_API({ ...APIParams }),
            ...useMutationOptions,
        })
    }
    return {
        useSearchClinVar,
        useVariantLookup,
        useSearchDiseases,
        useVariantToGenotype
    }
}