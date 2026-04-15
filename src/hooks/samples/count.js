import { useQuery } from "@tanstack/react-query"

export function createSampleCountAPI(client) {

        /**
     * @description Retrieves the sample count
     * @param {Object} props
     * @param {String} props.protein_tag  The protein tag to filter samples that quantified the given protein.
     *
     * @returns {Object} The sample count.
     */
    async function getSampleCount_API({ has_peptide_quantification, has_protein_quantification, protein_group_tag, submission_tag, trait_tag, genotype_tag  }) {
        const res = await client.get(`/samples/count`, {
            params: {
                has_peptide_quantification,
                has_protein_quantification,
                protein_group_tag,
                submission_tag,
                trait_tag,
                genotype_tag
            }
        })
        return res.data
    }

    const useGetSampleCount = (APIParams = {
        has_protein_quantification: undefined,
        has_peptide_quantification: undefined, 
        protein_group_tag: undefined,
        submission_tag: undefined,
        trait_tag: undefined,
        genotype_tag: undefined,
    }, useQueryOptions = { staleTime: 3000000 }) => {
        return useQuery({
            queryKey: ["getSampleCount",
                APIParams.protein_group_tag,
                APIParams.submission_tag,
                APIParams.trait_tag,
                APIParams.has_protein_quantification,
                APIParams.has_peptide_quantification,
                APIParams.genotype_tag], 
            queryFn : () => getSampleCount_API({ ...APIParams }), ...useQueryOptions
        })
    }

    return {
        useGetSampleCount,
    };
}
  
  
  
  