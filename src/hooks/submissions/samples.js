import { useQuery } from "@tanstack/react-query"

export function createSubmissionSamplesAPI(client) {

    /**
     * @description Returns the sample names of a submission including the replicate, the index, and the name. It
     * is meant for copying it to Excel (tab separated.)
     * @param {Object} props
     * @param {String} props.tag
     * @returns {string[]} - The submission sample tags. 
     */
    async function getSubmissionSampleNames_API({ tag }) {
        const res = await client.get(`/submissions/${tag}/samples`)
        return res.data 
    }

    const useGetSubmissionSampleTags = (APIParams = {tag}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["submission_samples_tags", APIParams.tag],
            queryFn: () => getSubmissionSampleNames_API({ ...APIParams }),
            ...useQueryOptions
        })
    }


    /**
     * 
     * @param {Object} props 
     * @param {String} props.tag - The submission tag 
     * @param {Number} props.sample_index - The sample index  
     * @returns 
     */
    async function deleteSubmissionSample_API({ tag, sample_index }) {
        const res = await client.delete(`/api/submissions/${tag}/samples/${sample_index}`)
        return res.data 
    }
    const useDeleteSample = (APIParams = {}, useMutationOptions = {}) => {
        return useMutation({mutationFn: (APIParams) => deleteSubmissionSample_API({...APIParams}), ...useMutationOptions})
    }




    /**
     * @description Returns the number of samples in a submission.
     * @param {Object} props
     * @param {String} props.tag
     * @returns {Number} - The submission sample names. 
     */
    async function getSubmissionSampleCount_API({ tag }) {
        const res = await client.get(`/submissions/counts/${tag}/samples`)
        return res.data 
    }

    const useGetSubmissionSampleCount= (APIParams = {tag}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["submission_samples_count", APIParams.tag],
            queryFn: () => getSubmissionSampleCount_API({ ...APIParams }),
            ...useQueryOptions
        })
    }



    /**
     * @description Returns the sample information of a submission.
     * @param {Object} props
     * @param {String} props.tag
     * @returns {Object[]} - The submission sample information. 
     */

    async function getSubmissionSamplesFull_API({ tag }) {
        const res = await client.get(`/submissions/${tag}/samples/full`)
        return res.data
    }

    const useGetSubmissionSamplesFull = (APIParams = { tag }, useQueryOptions = { staleTime: 0 }) => {
        return useQuery({
            queryKey: ["getSubmissionSamplesFull", APIParams.tag],
            queryFn: () => getSubmissionSamplesFull_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    return {
        useGetSubmissionSampleTags,
        useGetSubmissionSampleCount,
        useGetSubmissionSamplesFull,
        useDeleteSample
    };

}