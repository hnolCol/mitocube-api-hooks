import { useQuery } from "@tanstack/react-query"

export function createQueryGenotypeConditionApplicationsAPI(client) {

    /**
     * Query genotype description by its tag 
     * @param {Object} props 
     * @param {String} props.genotype_tag - The unique genotype tag.
     * @returns {Object} - The genotyple description matching the tag. 
     */

    async function getGenotypeConditionApplications_API({ genotype_tag }) {
        const res = await client.get(`/genotypes/${genotype_tag}/condition_applications`)
        return res.data
    }

    const useGetGenotypeConditionApplications = (APIParams = { genotype_tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getGenotypeConditionApplication", APIParams.genotype_tag],
            queryFn: () => getGenotypeConditionApplications_API({ ...APIParams }),
            ...useQueryOptions
        });
    }



    /**
     * Query genotype description by its tag 
     * @param {Object} props 
     * @param {String} props.genotype_tag - The unique genotype tag.
     * @returns {Object} - The genotyple description matching the tag. 
     */

    async function getGenotypeConditionApplicationsData_API({ tag }) {
        const res = await client.get(`/genotypes/${tag}/condition_applications/data`)
        return res.data
    }

    const useGetGenotypeConditionApplicationsData = (APIParams = { tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getGenotypeConditionApplicationsData", APIParams.tag],
            queryFn: () => getGenotypeConditionApplicationsData_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    return {
        useGetGenotypeConditionApplications,
        useGetGenotypeConditionApplicationsData
    }
}

