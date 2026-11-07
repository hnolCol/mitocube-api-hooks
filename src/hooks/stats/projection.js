import { useQuery } from "@tanstack/react-query"

export function createProteomeProjectionAPI(client) {

/**
 * @description Returns a pooled PCA projection of all samples of the submissions associated with the given proteome that the requesting user has access to. Endpoint: GET '/api/stats/proteomes/{proteome_tag}/projection'
 * @param {Object} props
 * @param {String} props.proteome_tag The proteome tag.
 * @param {String} [props.method="pca"] The projection method (currently only "pca").
 * @param {Number} [props.n_components=2] The number of components to compute.
 * @param {Number} [props.min_valid_fraction=0.5] Minimum fraction of samples a protein group must be quantified in to be included per submission.
 * @returns {Object} { proteome_tag, method, n_components, variance_explained, n_proteins, n_submissions, submission_tags, points: [{ sample_tag, submission_tag, components }] }.
 */
async function getProteomeProjection_API({ proteome_tag, method = "pca", n_components = 2, min_valid_fraction = 0.5 }) {
    const res = await client.get(`/stats/proteomes/${proteome_tag}/projection`, {
        params: { method, n_components, min_valid_fraction }
    })
    return res.data
}

const useGetProteomeProjection = (APIParams = { proteome_tag, method: "pca", n_components: 2 }, useQueryOptions = { staleTime: 50000 }) => {
    return useQuery({
        queryKey: ["getProteomeProjection", APIParams.proteome_tag, APIParams.method, APIParams.n_components, APIParams.min_valid_fraction],
        queryFn: () => getProteomeProjection_API({ ...APIParams }),
        ...useQueryOptions
    })
}

return {
    useGetProteomeProjection
};

}
