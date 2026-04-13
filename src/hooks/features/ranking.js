





import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import config from "../../../config"

/**
 * @typedef ProteinGroupSubmissionRanking
 * @description Quantifies summary for a given feature across all samples in a submission. The ranking is based on the significance and effect size of a feature across condition applications
 * @type {Object}
 * @property {String} protein_group_tag - The protein group tag of the feature. This is the unique identifier for the feature. 
 * @property {Number} rank - The rank of the feature based on the significance and effect size across condition applications. The lower the rank, the more significant the feature is.
 * @property {String} submission_tag - The submission tag. This is the unique identifier for the submission. 
 * @property {Number} score - The composite score score = η² × max_fold_change × log10(n_groups + 1) High score indicates:
    → strong, consistent, and large differences across conditions
 * @property {Number} max_fc - The maximum fold change of the feature across condition applications. This is calculated as the maximum fold change across all condition applications for the protein_group.
 * @property {Number} eta_squared - The eta squared of the feature across condition applications. This is calculated as the maximum eta squared across all condition applications for the protein_group.
 * @property {NUmber} cohen_f - The cohen's f of the feature across condition applications. This is calculated as the maximum cohen's f across all condition applications for the protein_group.
 * @property {Number} n_groups - The number of groups the feature is quantified in. This is calculated as the number of groups the feature is quantified in across all condition applications for the protein_group.
 * @property {Number} F - The maximum F statistic of the feature across condition applications. This is calculated as the maximum F statistic across all condition applications for the protein_group.
 * @property {Number} p_value - The minimum p-value of the feature across condition applications. This is calculated as the minimum p-value across all condition applications for the protein_group.
 * @property {Number} std_means - The standard deviation of the means of the feature across condition applications. This is calculated as the standard deviation of the means across all condition applications for the protein_group.
 * @property {Number} missingness - The percentage of missing values for the feature across all samples in the submission. This is calculated as the percentage of missing values across all samples in the submission for the protein_group.
 * @property {Boolean} exclusively - If true, the feature is exclusively quantified in one condition application. This is calculated as true if the feature is quantified in only one condition application for the protein_group
 */



/**
 * 
 * @param {Object} props
 * @param {String} props.tag - The protein group tag 
 * @returns {ProteinGroupSubmissionRanking[]} The ranked submission tags for the given protein group tag
 */
export async function getProteinGroupSubmissionStats_API({ tag, limit }) {
    const res = await axios.get(`${config.baseURL}/features/protein_groups/${tag}/stats`, {
        params: { limit }
    });
    return res.data;
}

export function useGetProteinGroupSubmissionStats(APIParams = {tag, limit}, useQueryOptions = { staleTime: Infinity}) {
    return useQuery({
        queryKey: ["getProteinGroupSubmissionStats", APIParams.tag, APIParams.limit],
        queryFn: () => getProteinGroupSubmissionStats_API({ ...APIParams }),
        ...useQueryOptions
    });
}


