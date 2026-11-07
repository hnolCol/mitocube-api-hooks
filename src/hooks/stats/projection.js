import { useQuery } from "@tanstack/react-query"

export function createProteomeProjectionAPI(client) {

/**
 * @description Returns a pooled PCA projection of all samples of the submissions associated with the given proteome that the requesting user has access to. Endpoint: GET '/api/stats/proteomes/{proteome_tag}/projection'
 * @param {Object} props
 * @param {String} props.proteome_tag The proteome tag.
 * @param {String} [props.method="pca"] The projection method (currently only "pca").
 * @param {Number} [props.n_components=2] The number of components to compute.
 * @param {Number} [props.min_valid_fraction=0.5] Minimum fraction of samples a protein group must be quantified in to be included per submission.
 * @returns {Object} { proteome_tag, method, n_components, variance_explained, n_proteins, n_submissions, submission_tags, points: [{ sample_tag, submission_tag, components, condition_applications }], drivers: [{ tag, components }], condition_centroids: [{ condition_application_tag, count, components }] }.
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

/**
 * @description Returns the driver loadings of a single protein group within the pooled PCA projection of the proteome, its condition associations, and the attributes with the strongest effect on this protein. Endpoint: GET '/api/stats/proteomes/{proteome_tag}/projection/drivers/{protein_tag}'
 * @param {Object} props
 * @param {String} props.proteome_tag The proteome tag.
 * @param {String} props.protein_tag The protein group tag.
 * @param {Number} [props.n_components=4] The number of components the pooled projection is computed with.
 * @param {Number} [props.min_valid_fraction=0.5] Minimum fraction of samples a protein group must be quantified in to be included per submission.
 * @returns {Object} { proteome_tag, protein_tag, n_components, variance_explained, n_submissions, submission_tags, driver: { tag, components }, condition_associations: [{ condition_application_tag, mean_z, n_samples }], attribute_effects: [{ attribute_tag, ca_tag, effect, mean_z_in, mean_z_out, n_in, n_out }] }.
 */
async function getProteomeProjectionDriver_API({ proteome_tag, protein_tag, n_components = 4, min_valid_fraction = 0.5 }) {
    const res = await client.get(`/stats/proteomes/${proteome_tag}/projection/drivers/${protein_tag}`, {
        params: { n_components, min_valid_fraction }
    })
    return res.data
}

const useGetProteomeProjectionDriver = (APIParams = { proteome_tag, protein_tag, n_components: 4 }, useQueryOptions = { staleTime: 50000 }) => {
    return useQuery({
        queryKey: ["getProteomeProjectionDriver", APIParams.proteome_tag, APIParams.protein_tag, APIParams.n_components, APIParams.min_valid_fraction],
        queryFn: () => getProteomeProjectionDriver_API({ ...APIParams }),
        ...useQueryOptions
    })
}

/**
 * @description Quantitatively assigns the effect of a condition application across the proteome: for every protein group quantified in the user's visible submissions of this proteome, the effect is the mean z-score in samples carrying the condition application minus the mean z-score in all other samples, ranked by absolute effect. Endpoint: GET '/api/stats/proteomes/{proteome_tag}/projection/effects/{ca_tag}'
 * @param {Object} props
 * @param {String} props.proteome_tag The proteome tag.
 * @param {String} props.ca_tag The condition application tag.
 * @param {Number} [props.limit=50] Maximum number of protein effects returned.
 * @param {Number} [props.min_valid_fraction=0.5] Minimum fraction of samples a protein group must be quantified in to be included per submission.
 * @returns {Object} { proteome_tag, ca_tag, n_submissions, submission_tags, n_proteins, effects: [{ tag, effect, mean_z_in, mean_z_out, n_in, n_out, cohens_d }] }.
 */
async function getProteomeProjectionConditionEffects_API({ proteome_tag, ca_tag, limit = 50, min_valid_fraction = 0.5 }) {
    const res = await client.get(`/stats/proteomes/${proteome_tag}/projection/effects/${ca_tag}`, {
        params: { limit, min_valid_fraction }
    })
    return res.data
}

const useGetProteomeProjectionConditionEffects = (APIParams = { proteome_tag, ca_tag, limit: 50 }, useQueryOptions = { staleTime: 50000 }) => {
    return useQuery({
        queryKey: ["getProteomeProjectionConditionEffects", APIParams.proteome_tag, APIParams.ca_tag, APIParams.limit, APIParams.min_valid_fraction],
        queryFn: () => getProteomeProjectionConditionEffects_API({ ...APIParams }),
        ...useQueryOptions
    })
}

/**
 * @description Attribute-level view of condition effects: for every condition application value of the given attribute among the user's visible submissions of this proteome, returns a quantitative separation score on the pooled projection and the top affected proteins per condition application. Endpoint: GET '/api/stats/proteomes/{proteome_tag}/projection/effects/attribute/{attribute_tag}'
 * @param {Object} props
 * @param {String} props.proteome_tag The proteome tag.
 * @param {String} props.attribute_tag The attribute tag (e.g. each chemical compound).
 * @param {Number} [props.n_components=4] The number of components the pooled projection is computed with.
 * @param {Number} [props.top_proteins=10] Maximum number of top affected proteins returned per condition application.
 * @param {Number} [props.min_valid_fraction=0.5] Minimum fraction of samples a protein group must be quantified in to be included per submission.
 * @returns {Object} { proteome_tag, attribute_tag, n_components, variance_explained, n_submissions, submission_tags, conditions: [{ ca_tag, n_in, n_out, separation, effects: [{ tag, effect, mean_z_in, mean_z_out, n_in, n_out, cohens_d }] }] }.
 */
async function getProteomeProjectionAttributeEffects_API({ proteome_tag, attribute_tag, n_components = 4, top_proteins = 10, min_valid_fraction = 0.5 }) {
    const res = await client.get(`/stats/proteomes/${proteome_tag}/projection/effects/attribute/${attribute_tag}`, {
        params: { n_components, top_proteins, min_valid_fraction }
    })
    return res.data
}

const useGetProteomeProjectionAttributeEffects = (APIParams = { proteome_tag, attribute_tag, n_components: 4, top_proteins: 10 }, useQueryOptions = { staleTime: 50000 }) => {
    return useQuery({
        queryKey: ["getProteomeProjectionAttributeEffects", APIParams.proteome_tag, APIParams.attribute_tag, APIParams.n_components, APIParams.top_proteins, APIParams.min_valid_fraction],
        queryFn: () => getProteomeProjectionAttributeEffects_API({ ...APIParams }),
        ...useQueryOptions
    })
}

return {
    useGetProteomeProjection,
    useGetProteomeProjectionDriver,
    useGetProteomeProjectionConditionEffects,
    useGetProteomeProjectionAttributeEffects
};

}
