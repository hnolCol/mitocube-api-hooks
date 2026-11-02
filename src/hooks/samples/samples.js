import { useQuery, useMutation } from "@tanstack/react-query"

export function createSampleCoreAPI(client) {

        /**
         * @description Retrieves the sample information by its tag. 
         * @param {Object} props
         * @param {String} props.tag  The tag of the sample
         * @returns {Object} The sample information.
         */
        async function getSampleInfo_API({ tag }) {
        const res = await client.get(`/samples/${tag}`)
        return res.data
        }

        const useGetSample = (APIParams = {tag}, useQueryOptions = {staleTime : 3000000}) => {
        return useQuery({
            queryKey: ["getSampleInfo", APIParams.tag],
            queryFn: () => getSampleInfo_API({...APIParams}),
            ...useQueryOptions
        })
        }

        /**
         * @description Retrieves the sample condition application. 
         * @param {Object} props
         * @param {String} props.tag  The tag of the sample
         * @returns {String[]} The tags of the condition application for the sample.
         */
        async function getSampleConditionApplication_API({ tag, group_by_attribute}) {
        const res = await client.get(`/samples/${tag}/ca`, { params: { group_by_attribute } } )
        return res.data
        }

        const useGetSampleConditionApplications = (APIParams = {tag, group_by_attribute : false}, useQueryOptions = {staleTime : 3000000}) => {
        return useQuery({
            queryKey: ["getSampleConditionApplications", APIParams.tag, APIParams.group_by_attribute],
            queryFn: () => getSampleConditionApplication_API({...APIParams}),
            ...useQueryOptions
        })
        }

        /**
         * @description Get the genotype for the given sample 
         * @param {object} props
         * @param {String} props.tag The tag of the sample 
         * @returns {String} The genotype tag for the sample 
         */

        async function getSampleGenotype_API({ tag }) {
        const res = await client.get(`/samples/${tag}/genotype`)
        return res.data
        }

        const useGetSampleGenotype = (APIParams = { tag }, useQueryOptions = {staleTime : 3000000}) => {
        return useQuery({
            queryKey: ["getSampleGenotype", APIParams.tag],
            queryFn: () => getSampleGenotype_API({...APIParams}),
            ...useQueryOptions
        })
        }



        /**
         * @description Add genotype to a sample.
         * @param {object} props
         * @param {String} props.tag The tag of the sample 
         * @param {String} props.genotype_tag The tag of the genotype to be added to the sample 
         * @returns {Object} The updated sample information. 
         */


        async function insertSampleGenotype_API({ sample_tags, genotype_tag }) {
            const res = await client.post(`/samples/genotype`, {sample_tags, genotype_tag })
            return res.data
        }

        const useInsertSampleGenotype = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => insertSampleGenotype_API({...APIParams}),
            ...useMutationOptions
        })
        }

        /**
         * @description Update the sample information.
         * @param {Object} props
         * @param {String} props.tag  The tag of the sample
         * @returns {Object} The updated sample information.
         */
        async function updateSample_API({ tag, data }) {
            const res = await client.put(`/samples/${tag}`, data)
            return res.data
        }   

        const useUpdateSample = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: ({ tag, data }) => updateSample_API({ tag, data }),
            ...useMutationOptions
        })
        }



        /**
         * @description Add genotype to a sample.
         * @param {object} props
         * @param {String} props.tag The tag of the sample 
         * @param {String} props.genotype_tag The tag of the genotype to be added to the sample 
         * @returns {Object} The updated sample information. 
         */

        async function addSampleGenotype_API({ sample_tag, genotype_tag }) {
        const res = await client.post( `/samples/${sample_tag}/genotype/${genotype_tag}`)
        return res.data
        }

        const useAddSampleGenotype = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => addSampleGenotype_API({...APIParams}),
            ...useMutationOptions
        })
        }   

        /**
         * @description Sets whether a sample is excluded from quantification/statistical analysis.
         * @param {Object} props
         * @param {String} props.tag The tag of the sample
         * @param {Boolean} props.excluded Whether the sample should be excluded
         * @returns {Boolean} True if the update succeeded.
         */
        async function setSampleExcluded_API({ tag, excluded }) {
            const res = await client.patch(`/samples/${tag}/exclude`, null, { params: { excluded } })
            return res.data
        }

        const useSetSampleExcluded = (useMutationOptions = {}) => {
            return useMutation({
                mutationFn: (APIParams) => setSampleExcluded_API({ ...APIParams }),
                ...useMutationOptions
            })
        }

        /**
         * @description Sets whether a sample is marked as lost (e.g. lost, corrupted or otherwise unusable). Lost samples are ignored in quantification/statistical analysis.
         * @param {Object} props
         * @param {String} props.tag The tag of the sample
         * @param {Boolean} props.lost Whether the sample should be marked as lost
         * @returns {Boolean} True if the update succeeded.
         */
        async function setSampleLost_API({ tag, lost }) {
            const res = await client.patch(`/samples/${tag}/lost`, null, { params: { lost } })
            return res.data
        }

        const useSetSampleLost = (useMutationOptions = {}) => {
            return useMutation({
                mutationFn: (APIParams) => setSampleLost_API({ ...APIParams }),
                ...useMutationOptions
            })
        }

        /**
         * @description Returns the comments of a sample ordered by creation date.
         * @param {Object} props
         * @param {String} props.tag The tag of the sample
         * @returns {Object[]} The sample comments.
         */
        async function getSampleComments_API({ tag }) {
            const res = await client.get(`/samples/${tag}/comments`)
            return res.data
        }

        const useGetSampleComments = (APIParams = { tag }, useQueryOptions = { staleTime: 0 }) => {
            return useQuery({
                queryKey: ["getSampleComments", APIParams.tag],
                queryFn: () => getSampleComments_API({ ...APIParams }),
                ...useQueryOptions
            })
        }

        /**
         * @description Adds a comment to a sample. Comments are stored as separate Comment nodes and are not loaded with the sample itself.
         * @param {Object} props
         * @param {String} props.tag The tag of the sample
         * @param {String} props.content The comment content
         * @param {String} [props.response_to] The tag of the comment this comment responds to
         * @returns {Boolean} True if the comment was added.
         */
        async function postSampleComment_API({ tag, content, response_to = null }) {
            const res = await client.post(`/samples/${tag}/comments`, { content, response_to })
            return res.data
        }

        const usePostSampleComment = (useMutationOptions = {}) => {
            return useMutation({
                mutationFn: (APIParams) => postSampleComment_API({ ...APIParams }),
                ...useMutationOptions
            })
        }

        /**
         * @description Retrieves export-ready sample data (sample_tag, replicate, genotype, condition applications) for a submission.
        * @param {Object} props
        * @param {String} props.tag The submission tag
        * @returns {Array<Object>} One row per sample, ready for download.
        */
        async function getSamplesExport_API({ tag }) {
            const res = await client.get(`/samples/submissions/${tag}/export`)
            return res.data
        }

        const useGetSamplesExport = (APIParams = { tag }, useQueryOptions = { staleTime: 0 }) => {
            return useQuery({
                queryKey: ["getSamplesExport", APIParams.tag],
                queryFn: () => getSamplesExport_API({ ...APIParams }),
                ...useQueryOptions
            })
        }


    return {
        useGetSample,
        useGetSampleConditionApplications,
        useGetSampleGenotype,
        useInsertSampleGenotype,
        useUpdateSample,
        useAddSampleGenotype,
        useSetSampleExcluded,
        useSetSampleLost,
        useGetSampleComments,
        usePostSampleComment,
        useGetSamplesExport
    };
}
  
  