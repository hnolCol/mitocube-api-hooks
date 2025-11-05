import { useMutation, useQuery } from "react-query"
import axios from "axios"
import config from "../../../config"


/**
 * @description Return the condition application for the given tag. If it does not exist, an error is thrown.
 * @param {Object} props
 * @param {String} props.tag The condition application tag to be returned.
 * @returns {Object} - The condition application
 */
async function getConditionApplicationByTag_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/condition_applications/${tag}`)
    return res.data
}

export const useGetConditionApplication = (APIParams = { tag }, useQueryOptions = {staleTime : 300000}) => {
    return useQuery(["getConditionApplication",APIParams.tag],
        () => getConditionApplicationByTag_API({ ...APIParams }), useQueryOptions)
}


/**
 * @description Return the condition application text
 * @param {Object} props
 * @param {String} props.tag The condition application tag to be returned.You may add multiple tags, separated by semicolons. 
 * @returns {Object} - The condition application text
 */
async function getConditionApplicationTextByTag_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/condition_applications/${tag}/text`)
    return res.data
}

export const useGetConditionApplicationText = (APIParams = { tag }, useQueryOptions = {staleTime : 300000}) => {
    return useQuery(["getConditionApplicationText",APIParams.tag],
        () => getConditionApplicationTextByTag_API({ ...APIParams }), useQueryOptions)
}




/**
 * @description Return the condition application for the given tag. If it does not exist, an error is thrown.
 * @param {Object} props
 * @param {Boolean} props.samples_only - If true, only condition applications that are linked to samples are returned.
 * @param {String} props.submission_tag - If provided, only condition applications that are linked to the given submission are returned. If samples_only is also true, only condition applications that are linked to samples from the given submission are returned.
 * @param {String} props.attribute_tag - If provided, only condition applications that are linked to the given attribute are returned. This link may occur in any level of the condition application hierarchy.
 * @param {String} props.trait_tag - If provided, only condition applications that are linked to the given trait are returned. This link may occur in any level of the condition application hierarchy.
 *  * @returns {String[]} - The condition application tags that match the query
 */
async function getConditionApplicationByQuery_API({ samples_only, submission_tag, attribute_tag, trait_tag, sort_by_frequency, limit }) {
    const res = await axios.get(`${config.baseURL}/condition_applications/q`, {
        params: {
            samples_only,
            submission_tag,
            attribute_tag,
            trait_tag,
            sort_by_frequency,
            limit
        }
    })
    return res.data
}

export const useGetConditionApplicationByQuery = (APIParams = {samples_only : true, submission_tag, attribute_tag,  trait_tag, sort_by_frequency : true, limit}, useQueryOptions = {staleTime : 300000, placeholderData: (prev) => prev }) => {
    return useQuery(["getConditionApplicationByQuery",APIParams.submission_tag, APIParams.attribute_tag, APIParams.samples_only, APIParams.trait_tag, APIParams.sort_by_frequency, APIParams.limit],
        () => getConditionApplicationByQuery_API({ ...APIParams }), useQueryOptions)
}


