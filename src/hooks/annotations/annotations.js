import { useQuery, useMutation } from "react-query"
import axios from "axios"
import config from "../../../config"
import { stubString } from "lodash"

/**
 * @description Get annotation by the tag.
 * @returns {Object} - The annotation matching the tag.
 */

async function getAnnotationsByTag_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/annotations/${tag}`)
    return res.data
}

export const useGetAnnotationsByTag = (APIParams = { tag: "" }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery(["getAnnotationsByTag", APIParams.tag], () => getAnnotationsByTag_API({ ...APIParams }), useQueryOptions)
}


/**
 * @description Get annotation by search string.
 * @return {Object} - The annotation matching thhe search string. 
 */

async function getAnnotationsBySearchString_API({ search_string, group_tag, protein_tag,limit }) {
    const res = await axios.get(`${config.baseURL}/annotations/q`, { params: { search_string, group_tag, protein_tag, limit}})
    return res.data
}

export const useGetAnnotationsBySearchString = (APIParams = { search_string: "", limit: 10}, useQueryOptions = {stateTime: 200000}) => {
    return useQuery(["getAnnotationsBySearchString", APIParams.search_string], () => getAnnotationsBySearchString_API({ ...APIParams }), useQueryOptions)
} 

/**
 * @description Get annotation by protein tag. 
 * @returns {Object} - The annotation matching hhe protein tag.
 */

async function getAnnotationsByProteinTag_API ({ protein_tag }) {
    const res = await axios.get(`${config.baseURL}/annotations/proteins/${protein_tag}`)
    return res.data
}

export const useGetAnnotationsByProteinTag = (APIParams = { protein_tag: "" }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery (["getAnnotationsByProteinTag", APIParams.protein_tag], () => getAnnotationsByProteinTag_API ({ ...APIParams }), useQueryOptions)
}

/**
 * @description Get annotation by group tag.
 * @returns {Object} - The annotation matching the group tag.   
 */

async function getAnnotationsByGroupTag_API ({ tag }) {
    const res = await axios.get(`${config.baseURL}/annotations/groups/${tag}/annotations`)
    return res.data
}

export const useGetAnnotationsByGroupTag = (APIParams = { tag: "" }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery (["getAnnotationsByGroupTag", APIParams.tag], () => getAnnotationsByGroupTag_API ({ ...APIParams }), useQueryOptions)
}


/**
 * @description Creates a new annotation.
 * @return {Boolean}
 */

async function postAnnotations_API({ text, description, publication, pubmed_id, protein_tags, group_tag}) {
    const res = await axios.post(`${config.baseURL}/annotations/`, { text, description, publication, pubmed_id, protein_tags, group_tag})
    return res.data
}

export const usePostAnnotations = (useMutationOptions = {}) => {
    return useMutation((APIParams) => postAnnotations_API ({ ...APIParams}), useMutationOptions)
}

/**
 * @description Get annotation protein count.
 * @returns
 */

async function getAnnotationProteinCount_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/annotations/${tag}/proteins/count`)
    return res.data
}       

export const useGetAnnotationProteinCount = (APIParams = { tag: "" }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery(["getAnnotationProteinCount", APIParams.tag], () => getAnnotationProteinCount_API({ ...APIParams }), useQueryOptions)
}   


/**
 * @description Get annotation group by its tag.
 * @returns 
 */

async function getAnnotationGroupByTag_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/annotations/groups/${tag}`)
    return res.data
}

export const useGetAnnotationGroupByTag = (APIParams = { tag: "" }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery(["getAnnotationGroupByTag", APIParams.tag], () => getAnnotationGroupByTag_API({ ...APIParams }), useQueryOptions)
}

/**
 * @description Get annotation group by query.
 * @returns 
 */

async function getAnnotationGroupByQuery_API({ search_string, limit }) {
    const res = await axios.get(`${config.baseURL}/annotations/groups/q`, { params: { search_string, limit}})
    return res.data
}

export const useGetAnnotationGroupByQuery = (APIParams = { search_string: "", limit: 10}, useQueryOptions = {stateTime: 200000}) => {
    return useQuery(["getAnnotationGroupByQuery", APIParams.search_string], () => getAnnotationGroupByQuery_API({ ...APIParams }), useQueryOptions)
}   

/**
 * @description Creates a new annotation group.
 * @return {Boolean}
 */

async function postAnnotationGroup_API({ text, description}) {
    const res = await axios.post(`${config.baseURL}/annotations/groups/`, { text, description})
    return res.data
}

export const usePostAnnotationGroup = (useMutationOptions = {}) => {
    return useMutation((APIParams) => postAnnotationGroup_API ({ ...APIParams}), useMutationOptions)
}   
    


/**
 * @description Get annotation counnt in a group.
 * @returns
 */

async function getAnnotationGroupCount_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/annotations/groups/${tag}/annotations/count`)
    return res.data
}       

export const useGetAnnotationGroupCount = (APIParams = { tag: "" }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery(["getAnnotationGroupCount", APIParams.tag], () => getAnnotationGroupCount_API({ ...APIParams }), useQueryOptions)
}   

