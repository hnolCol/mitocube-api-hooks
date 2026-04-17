import { useQuery } from "@tanstack/react-query"


/**
 * @typedef FeatureSequence
 * @description Describes the response for a API request for the sequence of a given feature. 
 * @type {Object}
 * @property {String} feature_tag
 * @property {String} sequence
 */

export function createFeatureSequenceAPI(client) {

/**
 * 
 * @param {Object} props
 * @param {String} props.tag - The feature tag 
 * @returns {FeatureSequence}
 */
async function getSequenceByFeatureTag_API({ tag }) {
    const res = await client.get(`/features/${tag}/sequence`)
    return res.data
}

function useGetSequenceByFeatureKey(APIParams = {}, useQueryOptions = { staleTime: Infinity}) {
    return useQuery({
        queryKey: ["getFeatureSequence", APIParams.tag],
        queryFn: () => getSequenceByFeatureTag_API({ ...APIParams }),
        ...useQueryOptions
    });
}




/**
 * 
 * @param {Object} props
 * @param {String} props.tag - The feature tag 
 * @returns {Number} - The percentage of the protein sequence covered by peptides
 */
async function getProteinSequenceCoverage_API({ tag }) {
    const res = await client.get(`/features/${tag}/sequence_coverage`)
    return res.data
}

function useGetProteinSequenceCoverage(APIParams = { tag }, useQueryOptions = { staleTime: Infinity}) {
    return useQuery({
        queryKey: ["getFeatureSequenceCoverage", APIParams.tag],
        queryFn: () => getProteinSequenceCoverage_API({ ...APIParams }),
        ...useQueryOptions
    });
}

return {
    useGetSequenceByFeatureKey,
    useGetProteinSequenceCoverage
};

}