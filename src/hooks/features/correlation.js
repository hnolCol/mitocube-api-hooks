import { useQuery } from "@tanstack/react-query"
import _ from "lodash"

export function createFeatureCorrelationAPI(client) {

    /**
     * @description Returns the correlation result of a feature to any other feature
     * in the same proteome/samples . 
     * @param {Object} props 
     * @param {String} props.tag  The feature tag 
     * @param {string} props.annotation_tag - The annotation tag to filter the features by. This reduces the number of features that are correlated to the given feature.
     * @param {Number} props.limit  The maximum number of results to return.
     * @returns  
     */
    async function getFeatureCorrelation_API({tag, annotation_tags, limit, min_data_points, direction, fdr, metrics, ca_tags}) {
        const res = await client.get(`/features/${tag}/correlations`, {params : {limit, annotation_tags, min_data_points, direction, fdr, metrics, ca_tags}})
        return res.data
    }


    const useGetFeatureCorrelation = (APIParams = { tag, min_data_points, annotation_tags, limit, direction, fdr, metrics, ca_tags}, queryOptions = {placeHolderData: (prev) => prev, staleTime: 30000}) => {

        return useQuery({
            queryKey: ["feature_spec_corr",
                APIParams.tag,
                _.join(APIParams.annotation_tags),
                APIParams.min_data_points,
                APIParams.limit,
                APIParams.direction,
                APIParams.metrics,
                APIParams.fdr,
            APIParams.ca_tags], queryFn: () => getFeatureCorrelation_API({ ...APIParams }), ...queryOptions
        });
    }

    return {
        useGetFeatureCorrelation
    };

}
