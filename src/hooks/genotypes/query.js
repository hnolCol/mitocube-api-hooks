
import { useQuery } from "@tanstack/react-query"


export function createQueryGenotypesAPI(client) {

    /**
     * Query genotype item by its tag 
     * @param {Object} props 
     * @param {String} props.tag - The genotype tag to check for existence.
     * @returns {Boolean} - Whether the genotype item exists. 
     */

    async function getGenotypeExists_API({ tag }) {
        const res = await client.get(`/genotypes/${tag}/exists`)
        return res.data
    }

    const useGetGenotypeExists = (APIParams = { tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getGenotypeExists", APIParams.tag],
            queryFn: () => getGenotypeExists_API({ ...APIParams }),
            ...useQueryOptions
        });
    }


    /**
     * Query genotype by search string.
     * @param {Object} props 
     * @param {String} props.search_string - The search string to query genotypes.
     * @param {String} props.proteome_tags - The tags of the proteome to consider. Joined by ';'
     * @returns {String[]} - The genotype tags matching the search string.
     */
    async function getGenotypesBySearchString_API({search_string, limit, proteome_tags}) {
        const res = await client.get(`/genotypes/q`, {params: {search_string, limit, proteome_tags}})
        return res.data
    }

    const useGetGenotypesBySearchString = (APIParams = { search_string, limit, proteome_tags }, useQueryOptions = {}) => {
        const proteome_tag_string = _.isArray(APIParams.proteome_tags) ? _.join(APIParams.proteome_tags, ";") : APIParams.proteome_tags
        return useQuery({
            queryKey: ["getGenotypesBySearchString", APIParams.search_string, APIParams.limit, proteome_tag_string],
            queryFn: () => getGenotypesBySearchString_API({...APIParams}),
            ...useQueryOptions
        });
    }


    /**
     * Query genotype text by its tag 
     * @param {Object} props 
     * @param {String} props.genotype_tag - The unique genotype tag.
     * @returns {Object} - The genotyple text matching the tag. 
     */

    async function getGenotypeText_API({ genotype_tag }) {
        const res = await client.get(`/genotypes/${genotype_tag}/text`)
        return res.data
    }

    const useGetGenotypeText = (APIParams = { genotype_tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getGenotypeText", APIParams.genotype_tag],
            queryFn: () => getGenotypeText_API({ ...APIParams }),
            ...useQueryOptions
        });
    }


    /**
     * Query genotype Proteins by its tag 
     * @param {Object} props 
     * @param {String} props.genotype_tag - The unique genotype tag.
     * @returns {Object} - The genotyple Proteins matching the tag. 
     */

    async function getGenotypeProteins_API({ genotype_tag }) {
        const res = await client.get(`/genotypes/${genotype_tag}/Proteins`)
        return res.data
    }

    const useGetGenotypeProteins = (APIParams = { genotype_tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getGenotypeProteins", APIParams.genotype_tag],
            queryFn: () => getGenotypeProteins_API({ ...APIParams }),
            ...useQueryOptions
        });
    }


    /**
     * Query genotype Proteome by its tag
     * @param {Object} props 
     * @param {String} props.genotype_tag - The unique genotype tag.
     * @returns {Object} - The genotyple Proteome matching the tag. 
     */

    async function getGenotypeProteome_API({ genotype_tag }) {
        const res = await client.get(`/genotypes/${genotype_tag}/proteome`)
        return res.data
    }
    const useGetGenotypeProteome = (APIParams = { genotype_tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getGenotypeProteome", APIParams.genotype_tag],
            queryFn: () => getGenotypeProteome_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    /**
     * Query genotype item by its tag 
     * @param {Object} props 
     * @param {String} props.genotype_tag - The unique genotype tag.
     * @returns {Object} - The genotyple item matching the tag. 
     */

    async function getGenotypeItem_API({ genotype_tag }) {
        const res = await client.get(`/genotypes/${genotype_tag}/Item`)
        return res.data
    }

    const useGetGenotypeItem = (APIParams = { genotype_tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getGenotypeItem", APIParams.genotype_tag],
            queryFn: () => getGenotypeItem_API({ ...APIParams }),
            ...useQueryOptions
        });
    }


    /**
     * Query genotype description by its tag 
     * @param {Object} props 
     * @param {String} props.genotype_tag - The unique genotype tag.
     * @returns {Object} - The genotyple description matching the tag. 
     */

    async function getGenotypeDescription_API({ genotype_tag }) {
        const res = await client.get(`/genotypes/${genotype_tag}/description`)
        return res.data
    }

    const useGetGenotypeDescription = (APIParams = { genotype_tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getGenotypeDescription", APIParams.genotype_tag],
            queryFn: () => getGenotypeDescription_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    /**
     * Count how many samples are using the genotyple (number of relationships)
     * @param {Object} props
     * @param {String} props.genotype_tag 
     * @returns {Object} - The number of samples 
     */


    async function getGenotypeSampleCount_API({ genotype_tag }) {
        const res = await client.get(`/genotypes/${genotype_tag}/relationships/count`);
        return res.data
    }
    
    
    const useGetGenotypeSampleCount = (APIParams = { genotype_tag: "" },useQueryOptions = {}) => {
        return useQuery({
        queryKey: ["getGenotypeSampleCount", APIParams.genotype_tag],
        queryFn: () => getGenotypeSampleCount_API(APIParams),
        ...useQueryOptions
        });
    };
    
    
    
    /**
     * Fetch genotype permissions for a given genotype tag
     * @param {Object} props
     * @param {String} props.genotype_tag - The genotype tag to fetch permissions for
     * @returns {Object} React Query object
     */

    async function getGenotypePermissions_API({ }) {
        const res = await client.get(`/genotypes/permissions`);
        return res.data;
    }
    
    const useGetGenotypePermissions = (APIParams = {  }, useQueryOptions = {}) => {
        return useQuery({
        queryKey: ["getGenotypePermissions"],
        queryFn: () => getGenotypePermissions_API({ ...APIParams }),
        ...useQueryOptions
        });
    };
  
    return {
        useGetGenotypeExists,
        useGetGenotypesBySearchString,
        useGetGenotypeText,
        useGetGenotypeProteins,
        useGetGenotypeProteome,
        useGetGenotypeItem,
        useGetGenotypeDescription,
        useGetGenotypeSampleCount,
        useGetGenotypePermissions
    };
}



