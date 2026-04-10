// States and states changes of a submission 
import { useQuery, useMutation } from "react-query"
import config from "../../../config"
import axios from "axios"

/**
 * @description Returns the condition applications defined for the submission
 * @param {Object} props 
 * @param {String} props.tag The submission tag.
 * @param {String} props.attribute_tags - The attribute tags to filter the condition applications. Multiple can be provided, separated by semicolons.
 * @param {Boolean} props.group_by_attribute - If true, the results are grouped by attribute.
 * @returns {Object} The condition applications for the submission
 */
export async function getSubmissionCA_API({ tag, attribute_tags, group_by_attribute = false }) {
    const res = await axios.get(`${config.baseURL}/submissions/${tag}/ca`, {
        params: { attribute_tags, group_by_attribute }
    })
    return res.data
}

export const useGetSubmissionConditionApplication = (APIParams = {tag, attribute_tags, group_by_attribute}, useQueryOptions = { staleTime: 500}) => {
    return useQuery(["getSubmissionConditionApplication", APIParams.tag, APIParams.attribute_tags, APIParams.group_by_attribute],
        () => getSubmissionCA_API({ ...APIParams }), useQueryOptions)
}


/**
 * @description Returns the condition applications defined for the submission
 * @param {Object} props 
 * @param {String} props.tag The submission tag.
 * @param {String[]} props.attribute_tags - The attribute tags to filter the condition applications.
 * @returns {Object} The condition applications for the submission
 */
export async function getSubmissionSamplesCA_API({ tag, attribute_tags, return_unique = false }) {
    const res = await axios.get(`${config.baseURL}/submissions/${tag}/samples/ca`, {
        params: { attribute_tags, return_unique }
    })
    return res.data
}

export const useGetSubmissionSampleConditionApplications = (APIParams = {tag, attribute_tags, return_unique}, useQueryOptions = { staleTime: 500}) => {
    return useQuery(["getSubmissionSamplesConditionApplication", APIParams.tag, APIParams.attribute_tags, APIParams.return_unique],
        () => getSubmissionSamplesCA_API({ ...APIParams }), useQueryOptions)
}




/**
 * @description Returns the condition applications attributes for a submission
 * @param {Object} props 
 * @param {String} props.tag The submission tag.
 * @returns {Object} The condition applications attributes for the submission
 */
export async function getSubmissionCAAttributes_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/submissions/${tag}/ca/attributes`)
    return res.data
}

export const useGetSubmissionConditionApplicationAttributes = (APIParams = {tag }, useQueryOptions = { staleTime: 500}) => {
    return useQuery(["getSubmissionConditionApplicationAttributes", APIParams.tag],
        () => getSubmissionCAAttributes_API({ ...APIParams }), useQueryOptions)
}




/**
 * @description Returns the condition applications attributes for all submission samples
 * @param {Object} props 
 * @param {String} props.tag The submission tag.
 * @returns {Object} The condition applications attributes for the submission samples
 */
export async function getSubmissionSampleCAAttributes_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/submissions/${tag}/samples/ca/attributes`)
    return res.data
}

export const useGetSubmissionSampleConditionApplicationAttributes = (APIParams = {tag }, useQueryOptions = { staleTime: 500}) => {
    return useQuery(["getSubmissionSampleConditionApplicationAttributes", APIParams.tag],
        () => getSubmissionSampleCAAttributes_API({ ...APIParams }), useQueryOptions)
}


/**
 * Query submission sample condition application data for the given submission tag and attribute tags
 * @param {Object} props 
 * @param {String} props.tag The submission tag.
 * @param {String[]} props.attribute_tags The attribute tags to filter the condition applications.
 * @returns {Object} The condition application data for the submission samples
 */
export async function getSubmissionConditionApplictionsData_API({ tag, attribute_tags }) {
    const res = await axios.get(`${config.baseURL}/submissions/${tag}/ca/data`, {
        params: { attribute_tags }
    })
    return res.data
}

export const useGetSubmissionConditionApplicationData = (APIParams = {tag, attribute_tags}, useQueryOptions = { staleTime: 500}) => {
    return useQuery(["getSubmissionConditionApplicationData", APIParams.tag, APIParams.attribute_tags],
        () => getSubmissionConditionApplictionsData_API({ ...APIParams }), useQueryOptions)   
}


export async function updateSubmissionCA_API({ tag, selected_traits }) {
    const res = await axios.post(`${config.baseURL}/submissions/${tag}/ca/update`, selected_traits)
    return res.data
}

export const useUpdateSubmissionCA = (useQueryOptions = {}) => {
    return useMutation((data) => updateSubmissionCA_API(data),useQueryOptions)
}

