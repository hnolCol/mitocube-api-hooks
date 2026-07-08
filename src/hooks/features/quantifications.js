import { useQuery } from "@tanstack/react-query"

export function createFeatureQuantificationAPI(client) {

    /**
     * @description Returns all the abundance data available for a given feature across samples.
     * @param {Object} props
     * @param {String} props.tag - The feature tag (e.g. Uniprot ID)
     * @param {String} props.metrics - The type of abundance value to return. Must be "raw", "z_score_sample", or "z_score_protein_group".
     * @returns {Object[]} - value, sample_index, submission_tag 
     */
    async function getSampleAbundance_API({ tag, metrics }) {
        const res = await client.get(`/features/${tag}/abundance/samples`, {params : { metrics }})
        return res.data
    }
    function useGetSampleAbundance(APIParams = {tag, metrics}, useQueryOptions = {}) {
        return useQuery({
            queryKey: ["quant_feature_per_sample", APIParams.tag, APIParams.metrics],
            queryFn: () => getSampleAbundance_API({ ...APIParams }),
            ...useQueryOptions
        });
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
        const res = await client.get(`/features/${tag}/abundance`, {params : { attribute_tag, value }})
        return res.data
    }
    function  useGetSampleFeatureAbundanceDistribution(APIParams = {tag, attribute_tag, value}, useQueryOptions = {}) {
        return useQuery({
            queryKey: ["quant_feature_distribution",
                APIParams.tag,
                APIParams.attribute_tag,
                APIParams.value],
            queryFn: () => getSampleFeatureAbundanceDistribution_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    return {
        useGetSampleAbundance,
        useGetSampleFeatureAbundanceDistribution
    };

}