
import axios from "axios"
import { useQuery } from "react-query"
import config from "../../../config"


/**
 * @description Returns all the abundance data available for a given feature across samples.
 * @param {Object} props
 * @param {String} props.tag - The feature tag (e.g. Uniprot ID)
 * @returns {Object[]} - value, sample_index, submission_tag 
 */
async function getSampleAbundance_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/features/${tag}/abundance/samples`, {params : {  }})
    return res.data
}
export function useGetSampleAbundance(APIParams = {tag}, useQueryOptions = {}) {
    return useQuery(["quant_feature_per_sample",
        APIParams.tag],
        () => getSampleAbundance_API({ ...APIParams }), useQueryOptions)
}





/**
 * @description Returns all the abundance data available for a given feature across samples.
 * @param {Object} props
 * @param {String} props.tag - The feature tag (e.g. Uniprot ID)
 * @param {String} props.attribute_tag - The attribute tag to filter the samples by. This reduces the number of samples that are returned for the given feature.
 * @param {String} props.value - The value of the attribute tag to filter the samples by. This reduces the number of samples that are returned for the given feature. Must be "raw", "z_score_sample", or "z_score_protein_group" to specify the type of abundance value to return.   
 * @returns {Object[]} - value, sample_index, submission_tag 
 */
async function getSampleFeatureAbundanceDistribution_API({ tag, attribute_tag, value }) {
    const res = await axios.get(`${config.baseURL}/features/${tag}/abundance`, {params : { attribute_tag, value }})
    return res.data
}
export function  useGetSampleFeatureAbundanceDistribution(APIParams = {tag, attribute_tag, value}, useQueryOptions = {}) {
    return useQuery(["quant_feature_distribution",
        APIParams.tag,
        APIParams.attribute_tag,
        APIParams.value],
        () => getSampleFeatureAbundanceDistribution_API({ ...APIParams }), useQueryOptions)
}