// States and states changes of a submission 
import { useQuery } from "react-query"
import config from "../../../config"
import axios from "axios"

/**
 * @description Returns the condition applications defined for the submission
 * @param {Object} props 
 * @param {String} props.tag The submission tag.
 * @param {Boolean} props.group_by_attribute - If true, the results are grouped by attribute.
 * @returns {Object} The condition applications for the submission
 */
export async function getSubmissionCA_API({ tag, group_by_attribute = false }) {
    const res = await axios.get(`${config.baseURL}/submissions/${tag}/ca`, {
        params: { group_by_attribute }
    })
    return res.data
}

export const useGetSubmissionConditionApplication = (APIParams = {tag, group_by_attribute}, useQueryOptions = { staleTime: 500}) => {
    return useQuery(["getSubmissionConditionApplication", APIParams.tag, APIParams.group_by_attribute],
        () => getSubmissionCA_API({ ...APIParams }), useQueryOptions)
}


/**
 * @description Returns the condition applications defined for the submission
 * @param {Object} props 
 * @param {String} props.tag The submission tag.
 * @param {String[]} props.attribute_tags - The attribute tags to filter the condition applications.
 * @returns {Object} The condition applications for the submission
 */
export async function getSubmissionSamplesCA_API({ tag, attribute_tags }) {
    const res = await axios.get(`${config.baseURL}/submissions/${tag}/samples/ca`, {
        params: { attribute_tags }
    })
    return res.data
}

export const useGetSubmissionSampleConditionApplications = (APIParams = {tag, attribute_tags }, useQueryOptions = { staleTime: 500}) => {
    return useQuery(["getSubmissionSamplesConditionApplication", APIParams.tag, APIParams.attribute_tags],
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