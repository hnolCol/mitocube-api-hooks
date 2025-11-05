import axios from "axios"
import { useQuery } from "react-query"


/**
 * @description All the data that are available for two features from the same sample (e.g. to display the correlation.)
 * @param {Object} props
 * @param {String} props.feature_tag_x - The first feature tag (e.g. Uniprot ID)
 * @param {String} props.feature_tag_y - The second feature tag (e.g. Uniprot ID)
 * @returns {Object[]} - Define type! 
 */
async function featureFeatureCorrelation_API({ feature_tag_x, feature_tag_y }) {
    const res = await axios.get(`/api/features/pairwise_quant`, {params : { feature_tag_x, feature_tag_y }})
    return res.data
}
export function useGetPairwiseFeatureQuant(APIParams = {feature_tag_x, feature_tag_y}, useQueryOptions = {}) {
    return useQuery(["featurePairQuant",
        APIParams.feature_tag_x,
        APIParams.feature_tag_y],
        () => featureFeatureCorrelation_API({ ...APIParams }), useQueryOptions)
}