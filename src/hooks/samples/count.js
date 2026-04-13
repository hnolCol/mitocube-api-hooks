import { useQuery } from "@tanstack/react-query"
import axios from "../axios-setup"
import config from "../../../config";
/**
 * @description Retrieves the sample count
 * @param {Object} props
 * @param {String} props.protein_tag  The protein tag to filter samples that quantified the given protein.
 *
 * @returns {Object} The sample count.
 */
async function getSampleCount_API({ has_peptide_quantification, has_protein_quantification, protein_group_tag, submission_tag, trait_tag, genotype_tag  }) {
    const res = await axios.get(`${config.baseURL}/samples/count`, {
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

export const useGetSampleCount = (APIParams = {
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
export const useGetSubmissionConditionApplication = (APIParams = {tag, group_by_attribute}, useQueryOptions = { staleTime: 500}) => {
    return useQuery({
        queryKey: ["getSubmissionConditionApplication", APIParams.tag, APIParams.group_by_attribute],
        queryFn: () => getSubmissionCA_API({ ...APIParams }),
        ...useQueryOptions
    })
}
