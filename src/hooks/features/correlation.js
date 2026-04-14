


import axios from "axios"
import config from "../../../config"
import { useQuery } from "@tanstack/react-query"
import _ from "lodash"


/**
 * @description Returns the correlation result of a feature to any other feature
 * in the same proteome/samples . 
 * @param {Object} props 
 * @param {String} props.tag  The feature tag 
 * @param {string} props.annotation_tag - The annotation tag to filter the features by. This reduces the number of features that are correlated to the given feature.
 * @param {Number} props.limit  The maximum number of results to return.
 * @returns  
 */
async function getFeatureCorrelation_API({tag, annotation_tags, limit, min_data_points, direction, fdr}) {
    const res = await axios.get(`${config.baseURL}/features/${tag}/correlations`, {params : {limit, annotation_tags, min_data_points, direction, fdr}})
    return res.data
}


export const useGetFeatureCorrelation = (APIParams = { tag, min_data_points, annotation_tags, limit, direction, fdr }, queryOptions = {placeHolderData: (prev) => prev, staleTime: 30000}) => {

    return useQuery({
        queryKey: ["feature_spec_corr",
            APIParams.tag,
            _.join(APIParams.annotation_tags),
            APIParams.min_data_points,
            APIParams.limit,
            APIParams.direction,
        APIParams.fdr], queryFn: () => getFeatureCorrelation_API({ ...APIParams }), ...queryOptions
    });
}


