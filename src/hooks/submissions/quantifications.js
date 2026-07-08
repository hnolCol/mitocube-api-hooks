// States and states changes of a submission 
import { useQuery, useMutation, useQueries } from "@tanstack/react-query"
import { use } from "react"

export function createSubmissionQuantificationAPI(client) {

    /**
     * @description Endpoint: POST '/api/submissions/:tag/quantifications/proteins'
     * @param {Object} props
     * @param {String} props.tag The submission tag.
     * @param {Array} props.quantifications The protein quantifications to insert.
     * @returns {Boolean} If insertion of view was successful
     */
    async function postProteinQuantification_API({ tag, quantifications, apply_statistics = false }) {
        const res = await client.post(`/submissions/${tag}/quantifications/proteins`, { quantifications })
        return res.data
    }

    const usePostProteinQuantification = (useMutationOptions = {}) => {
        return useMutation({mutationFn: (APIParams) => postProteinQuantification_API({...APIParams}), ...useMutationOptions})
    }


    /**
     * @description Endpoint: POST '/api/submissions/:tag/quantifications/precursors'
     * @param {Object} props
     * @param {String} props.tag The submission tag.
     * @param {Array} props.quantifications The protein quantifications to insert.
     * @returns {Boolean} If insertion of view was successful
     */
    async function postPrecursorQuantification_API({ tag, quantifications }) {
        const res = await client.post(`/submissions/${tag}/quantifications/precursors`, { quantifications })
        return res.data
    }

    const usePostPrecursorQuantification = (useMutationOptions = {}) => {
        return useMutation({mutationFn: (APIParams) => postPrecursorQuantification_API({...APIParams}), ...useMutationOptions})
    }


    /**
     * @description Retruns if there are already quantification data for a given submission and quantification type.
     * @param {Object} props 
     * @param {String} props.tag The submission tag.
     * @param {String} props.quantification_type The type of quantification to check. E.g., "proteins" or "precursors" or "protein_groups", or any.
     * @returns {Boolean} If quantification data exists 
     */
    async function getSubmissionQuantificationExists_API({ tag, quantification_type}) {
        const res = await client.get(`/submissions/${tag}/quantifications/exists`, {
            params: { quantification_type }
        })
        return res.data
    }

    const useGetSubmissionQuantificationExists = (APIParams = {tag, quantification_type}, useQueryOptions = { staleTime: 500}) => {
        return useQuery({
            queryKey: ["getSubmissionQuantificationExists", APIParams.tag, APIParams.quantification_type],
            queryFn: () => getSubmissionQuantificationExists_API({ ...APIParams }),
            ...useQueryOptions
        })
    }


    /**
     * @description Retruns the distribution of quantification values for a given submission and quantification type. This can be used to determine if the quantification data is suitable for downstream analysis.
     * @param {Object} props 
     * @param {String} props.tag The submission tag.
     * @param {String} props.quantification_type The type of quantification to check. E.g., "proteins" or "precursors" or "protein_groups", or any.
     * @param {String} props.annotation_tag The annotation tag to filter the distribution.
     * @returns {Object} The distribution of quantification values
     */
    async function getSubmissionQuantificationDist_API({ tag, quantification_type, annotation_tag}) {
        const res = await client.get(`/submissions/${tag}/quantifications/distribution`, {
            params: { quantification_type, annotation_tag }
        })
        return res.data
    }

    const useGetSubmissionQuantificationDistribution = (APIParams = {tag, quantification_type, annotation_tag}, useQueryOptions = { staleTime: Infinity}) => {
        return useQuery({
            queryKey: ["getSubmissionQuantificationDistribution", APIParams.tag, APIParams.quantification_type, APIParams.annotation_tag],
            queryFn: () => getSubmissionQuantificationDist_API({ ...APIParams }),
            ...useQueryOptions
        })
    }


        /**
     * @description Endpoint: POST '/api/submissions/:tag/quantifications/test/distribution' Uses post to submit the test params in the body as a list of objects
     * @param {Object} props
     * @param {String} props.tag The submission tag.
     * @param {String} props.quantification_type The type of quantification to check. E.g., "proteins" or "precursors" or "protein_groups", or any.
     * @param {String} props.annotation_tag The annotation tag to filter the distribution.
     * @param {Object} props.testParams The parameters for the test.
     * @returns {Boolean} If insertion of view was successful
     */
    async function postTestQuantificationDistribution_API({ tag, quantification_type, annotation_tag, testParams }) {
        const res = await client.post(`/submissions/${tag}/quantifications/test/distribution`,  testParams, { params : { quantification_type, annotation_tag } })
        return res.data
    }

    const usePostTestQuantificationDistribution = (useMutationOptions = {}) => {
        return useMutation({mutationFn: (APIParams) => postTestQuantificationDistribution_API({...APIParams}), ...useMutationOptions})
    }

    /**
 * @description Endpoint:
 * POST '/api/submissions/:tag/quantifications/test/distribution'
 *
 * Although this uses POST because the payload is complex,
 * React Query will cache the result using the queryKey.
 */
async function getTestQuantificationDistribution_API({
    tag,
    quantification_type,
    annotation_tag,
    testParam,
}) {
    const res = await client.post(
        `/submissions/${tag}/quantifications/test/distribution`,
        testParam,
        {
            params: {
                quantification_type,
                annotation_tag,
            },
        }
    );

    return res.data;
}

    
    const useGetTestQuantificationDistributions = (APIParams = { tag, quantification_type, annotation_tag, testParams: [] }, useQueryOptions = {}) => {
        return useQueries(
            {queries: APIParams.testParams.map((testParam) => ({
                queryKey: ["getConditionApplicationText", JSON.stringify(testParam), APIParams.tag, APIParams.quantification_type, APIParams.annotation_tag],
                queryFn: () => getTestQuantificationDistribution_API({
                    tag: APIParams.tag,
                    quantification_type: APIParams.quantification_type,
                    annotation_tag: APIParams.annotation_tag,
                    testParam
                }),
                staleTime: 300000,
                ...useQueryOptions
            }))}
        )
    }

    /**
     * @description Endpoint: PATCH '/api/submissions/:tag/protein_groups/statistics'. Requires curator rights.
     * Recalculates the multiple-comparison statistics, z-scores, and log2FC for a submission — e.g. after changing sample exclusions.
     * @param {Object} props
     * @param {String} props.tag The submission tag.
     * @returns {Boolean} True if recalculation succeeded.
     */
    async function recalculateStatistics_API({ tag }) {
        const res = await client.patch(`/submissions/${tag}/protein_groups/statistics`)
        return res.data
    }

    const useRecalculateStatistics = (useMutationOptions = {}) => {
        return useMutation({ mutationFn: (APIParams) => recalculateStatistics_API({ ...APIParams }), ...useMutationOptions })
    }

    /**
     * @description Endpoint: GET '/api/submissions/:tag/stats/outdated'
     * Checks if the cached statistics for this submission are outdated (e.g. after excluding/including samples).
     * @param {Object} props
     * @param {String} props.tag The submission tag.
     * @returns {Boolean} True if statistics need to be recalculated.
     */
    async function getStatsOutdated_API({ tag }) {
        const res = await client.get(`/submissions/${tag}/stats/outdated`)
        return res.data
    }

    const useGetStatsOutdated = (APIParams = { tag }, useQueryOptions = { staleTime: 0 }) => {
        return useQuery({
            queryKey: ["getStatsOutdated", APIParams.tag],
            queryFn: () => getStatsOutdated_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    return {
        usePostProteinQuantification,
        usePostPrecursorQuantification,
        useGetSubmissionQuantificationExists,
        useGetSubmissionQuantificationDistribution,
        useGetTestQuantificationDistributions,
        useRecalculateStatistics,
        useGetStatsOutdated
        // useGetTestQuantificationDistribution,
        // usePostTestQuantificationDistribution
    }

}



