




/**
 * @description Returns the correlation result of a feature to any other feature
 * in the same proteome/samples . 
 * @param {Object} props 
 * @param {String} props.tag  The feature tag 
 * @param {string} props.filter_tag - The filter tag to filter the features by. This reduces the number of features that are correlated to the given feature.
 * @param {Number} props.limit  The maximum number of results to return.
 * @returns 
 */
async function getFeatureCorrelation_API({tag, filter_tag, limit}) {
    const res = await axios.get(`/api/features/${tag}/correlation`, {params : {limit, filter_tag}})
    return res.data
}


export const useGetFeatureCorrelation = (APIParams = { tag, filter_tag, limit }, queryOptions = {placeHolderData: (prev) => prev, staleTime: 30000}) => {

    return useQuery(["feature_corr",
        APIParams.tag,
        APIParams.filter_tag,
        APIParams.limit], () => getFeatureCorrelation_API({ ...APIParams }), queryOptions)
}


