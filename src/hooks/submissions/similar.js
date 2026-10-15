import { useQuery } from "@tanstack/react-query"

export function createSimilarSubmissionsAPI(client) {
    /**
     * @description Returns the submissions that are most similar to a given submission.
     * Endpoint: GET '/api/submissions/similar'
     * Similarity is based on the overlap of the genotypes of the submissions' samples
     * and of their condition applications. The score is the Jaccard index over the
     * union of both sets. The shared genotypes, condition applications and traits
     * are returned for each similar submission.
     * @param {Object} props
     * @param {String} props.tag - The submission tag.
     * @param {Number} props.limit - Maximum number of similar submissions to return. Default 5.
     * @param {Boolean} props.include_sample_ca - Also consider condition applications connected to samples. Default false.
     * @returns {Object} { submission_tag, similar: [{ submission_tag, score, matched: { genotypes, condition_applications, traits } }] }
     */
    async function getSimilarSubmissions_API({ tag, limit, include_sample_ca }) {
        const res = await client.get(`/submissions/similar`, {
            params: { tag, limit, include_sample_ca }
        })
        return res.data
    }
    const useGetSimilarSubmissions = (APIParams = {}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getSimilarSubmissions", APIParams?.tag, APIParams?.limit, APIParams?.include_sample_ca],
            queryFn: () => getSimilarSubmissions_API({ ...APIParams }),
            enabled: APIParams?.tag !== undefined,
            ...useQueryOptions
        })
    }
    return {
        useGetSimilarSubmissions
    }
}
