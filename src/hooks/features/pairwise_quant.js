
import { useQuery } from "@tanstack/react-query"

export function createFeaturePairwiseQuantAPI(client) {

    /**
     * @description All the data that are available for two features from the same sample (e.g. to display the correlation.)
     * @param {Object} props
     * @param {String} props.feature_tag_x - The first feature tag (e.g. Uniprot ID)
     * @param {String} props.feature_tag_y - The second feature tag (e.g. Uniprot ID)
     * @returns {Object[]} - Define type! 
     */
    async function featureFeatureCorrelation_API({ feature_tag_x, feature_tag_y }) {
        const res = await client.get(`/features/${feature_tag_x}/${feature_tag_y}/pairwise_quant`, {params : {  }})
        return res.data
    }
    function useGetPairwiseFeatureQuant(APIParams = {feature_tag_x, feature_tag_y, annotation_tags}, useQueryOptions = {}) {
        return useQuery({
            queryKey: ["featurePairQuant",
                APIParams.feature_tag_x,
                APIParams.feature_tag_y],
            queryFn: () => featureFeatureCorrelation_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    return {
        useGetPairwiseFeatureQuant
    };

}