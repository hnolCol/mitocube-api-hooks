// States and states changes of a submission 
import { useQuery, useMutation } from "@tanstack/react-query"

export function createSubmissionCAAPI(client) {

    /**
     * @description Returns the condition applications defined for the submission
     * @param {Object} props 
     * @param {String} props.tag The submission tag.
     * @param {String} props.attribute_tags - The attribute tags to filter the condition applications. Multiple can be provided, separated by semicolons.
     * @param {Boolean} props.group_by_attribute - If true, the results are grouped by attribute.
     * @returns {Object} The condition applications for the submission
     */
    async function getSubmissionCA_API({ tag, attribute_tags, group_by_attribute = false }) {
        const res = await client.get(`/submissions/${tag}/ca`, {
            params: { attribute_tags, group_by_attribute }
        })
        return res.data
    }

    const useGetSubmissionConditionApplication = (APIParams = {tag, attribute_tags, group_by_attribute}, useQueryOptions = { staleTime: 500}) => {
        return useQuery({
            queryKey: ["getSubmissionConditionApplication", APIParams.tag, APIParams.attribute_tags, APIParams.group_by_attribute],
            queryFn: () => getSubmissionCA_API({ ...APIParams }),
            ...useQueryOptions
        })
    }


    /**
     * @description Returns the condition applications defined for the submission
     * @param {Object} props 
     * @param {String} props.tag The submission tag.
     * @param {String[]} props.attribute_tags - The attribute tags to filter the condition applications.
     * @returns {Object} The condition applications for the submission
     */
    async function getSubmissionSamplesCA_API({ tag, attribute_tags, return_unique = false }) {
        const res = await client.get(`/submissions/${tag}/samples/ca`, {
            params: { attribute_tags, return_unique }
        })
        return res.data
    }

    const useGetSubmissionSampleConditionApplications = (APIParams = {tag, attribute_tags, return_unique}, useQueryOptions = { staleTime: 500}) => {
        return useQuery({
            queryKey: ["getSubmissionSamplesConditionApplication", APIParams.tag, APIParams.attribute_tags, APIParams.return_unique],
            queryFn: () => getSubmissionSamplesCA_API({ ...APIParams }),
            ...useQueryOptions
        })
    }




    /**
     * @description Returns the condition applications attributes for a submission
     * @param {Object} props 
     * @param {String} props.tag The submission tag.
     * @returns {Object} The condition applications attributes for the submission
     */
    async function getSubmissionCAAttributes_API({ tag }) {
        const res = await client.get(`/submissions/${tag}/ca/attributes`)
        return res.data
    }

    const useGetSubmissionConditionApplicationAttributes = (APIParams = {tag }, useQueryOptions = { staleTime: 500}) => {
        return useQuery({
            queryKey: ["getSubmissionConditionApplicationAttributes", APIParams.tag],
            queryFn: () => getSubmissionCAAttributes_API({ ...APIParams }),
            ...useQueryOptions
        })
    }




    /**
     * @description Returns the condition applications attributes for all submission samples
     * @param {Object} props 
     * @param {String} props.tag The submission tag.
     * @returns {Object} The condition applications attributes for the submission samples
     */
    async function getSubmissionSampleCAAttributes_API({ tag }) {
        const res = await client.get(`/submissions/${tag}/samples/ca/attributes`)
        return res.data
    }

    const useGetSubmissionSampleConditionApplicationAttributes = (APIParams = {tag }, useQueryOptions = { staleTime: 500}) => {
        return useQuery({
            queryKey: ["getSubmissionSampleConditionApplicationAttributes", APIParams.tag],
            queryFn: () => getSubmissionSampleCAAttributes_API({ ...APIParams }),
            ...useQueryOptions
        })
    }


    /**
     * Query submission sample condition application data for the given submission tag and attribute tags
     * @param {Object} props 
     * @param {String} props.tag The submission tag.
     * @param {String[]} props.attribute_tags The attribute tags to filter the condition applications.
     * @returns {Object} The condition application data for the submission samples
     */
    async function getSubmissionConditionApplictionsData_API({ tag, attribute_tags }) {
        const res = await client.get(`/submissions/${tag}/ca/data`, {
            params: { attribute_tags }
        })
        return res.data
    }

    const useGetSubmissionConditionApplicationData = (APIParams = {tag, attribute_tags}, useQueryOptions = { staleTime: 500}) => {
        return useQuery({
            queryKey: ["getSubmissionConditionApplicationData", APIParams.tag, APIParams.attribute_tags],
            queryFn: () => getSubmissionConditionApplictionsData_API({ ...APIParams }),
            ...useQueryOptions
        })   
    }


    async function updateSubmissionCA_API({ tag, selected_traits }) {
        const res = await client.post(`/submissions/${tag}/ca/update`, selected_traits)
        return res.data
    }

    const useUpdateSubmissionCA = (useQueryOptions = {}) => {
        return useMutation({mutationFn: (data) => updateSubmissionCA_API(data), ...useQueryOptions})
    }


    return {
        useGetSubmissionConditionApplication,
        useGetSubmissionSampleConditionApplications,
        useGetSubmissionConditionApplicationAttributes,
        useGetSubmissionSampleConditionApplicationAttributes,
        useGetSubmissionConditionApplicationData,
        useUpdateSubmissionCA   
    }

}