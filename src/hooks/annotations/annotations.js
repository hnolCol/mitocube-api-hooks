import { useQuery, useMutation } from "@tanstack/react-query"
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
    return useQuery({
        queryKey: ["getAnnotationsByTag", APIParams.tag],
        queryFn: () => getAnnotationsByTag_API({ ...APIParams }),
        ...useQueryOptions
    });
}


/**
 * @description Get annotation by search string.
 * @return {Object} - The annotation matching thhe search string. 
 */

async function getAnnotationsBySearchString_API({ search_string, group_tags, protein_tags,limit, group_by_group }) {
    const res = await axios.get(`${config.baseURL}/annotations/q`, { params: { search_string, group_tags, protein_tags, limit, group_by_group}})
    return res.data
}

export const useGetAnnotationsBySearchString = (APIParams = { search_string, limit: 10, group_by_group, group_tags, protein_tags}, useQueryOptions = {stateTime: 200000}) => {
    return useQuery({
        queryKey: ["getAnnotationsBySearchString",
            APIParams.search_string,
            APIParams.group_by_group,
            APIParams.limit,
            APIParams.protein_tags],
        queryFn: () => getAnnotationsBySearchString_API({ ...APIParams }),
        ...useQueryOptions
    });
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
    return useQuery({
        queryKey: ["getAnnotationsByProteinTag", APIParams.protein_tag],
        queryFn: () => getAnnotationsByProteinTag_API({ ...APIParams }),
        ...useQueryOptions
    });
}

/**
 * @description Get annotation by group tag.
 * @returns {Object} - The annotation matching the group tag.   
 */

async function getAnnotationsByGroupTag_API ({ tag, limit = 20 }) {
    const res = await axios.get(`${config.baseURL}/annotations/groups/${tag}/annotations`, {
        params: { limit }
    })
    return res.data
}

export const useGetAnnotationsByGroupTag = (APIParams = { tag: "", limit: 20 }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getAnnotationsByGroupTag", APIParams.tag, APIParams.limit],
        queryFn: () => getAnnotationsByGroupTag_API({ ...APIParams }),
        ...useQueryOptions
    });
}

/**
 * @description Creates a new annotation.
 * @return {Boolean}
 */

async function postAnnotations_API({ text, description, publication, pubmed_id, source, protein_tags, group_tag}) {
    const res = await axios.post(`${config.baseURL}/annotations/`, { text, description, publication, pubmed_id, source, protein_tags, group_tag})
    return res.data
}

export const usePostAnnotations = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => postAnnotations_API ({ ...APIParams}),
        ...useMutationOptions
    });
}

/**
 * @description Updates annotations.
 * @return {Boolean}
 */

async function updateAnnotations_API({ tag, text, description, publication, pubmed_id, source, protein_tags, group_tag}) {
    const res = await axios.put(`${config.baseURL}/annotations/${tag}`, { tag, text, description, publication, pubmed_id, source, protein_tags, group_tag})
    return res.data
}

export const useUpdateAnnotations = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => updateAnnotations_API ({ ...APIParams}),
        ...useMutationOptions
    });
}

/**
 * @description Deletes an annotation by its tag.
 * @param {Object} props
 * @param {String} props.tag - The annotation tag
 */

async function deleteAnnotations_API({ tag }) {
    const res = await axios.delete(`${config.baseURL}/annotations/${tag}`)
    return res.data
}

export const useDeleteAnnotations = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => deleteAnnotations_API({...APIParams}),
        ...useMutationOptions
    });
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
    return useQuery({
        queryKey: ["getAnnotationProteinCount", APIParams.tag],
        queryFn: () => getAnnotationProteinCount_API({ ...APIParams }),
        ...useQueryOptions
    });
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
    return useQuery({
        queryKey: ["getAnnotationGroupByTag", APIParams.tag],
        queryFn: () => getAnnotationGroupByTag_API({ ...APIParams }),
        ...useQueryOptions
    });
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
    return useQuery({
        queryKey: ["getAnnotationGroupByQuery", APIParams.search_string],
        queryFn: () => getAnnotationGroupByQuery_API({ ...APIParams }),
        ...useQueryOptions
    });
}

/**
 * @description Creates a new annotation group.
 * @return {Boolean}
 */

async function postAnnotationGroup_API({ text, description, source, url }) {
    const res = await axios.post(`${config.baseURL}/annotations/groups/`, { text, description, source, url })
    return res.data
}

export const usePostAnnotationGroup = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => postAnnotationGroup_API ({ ...APIParams}),
        ...useMutationOptions
    });
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
    return useQuery({
        queryKey: ["getAnnotationGroupCount", APIParams.tag],
        queryFn: () => getAnnotationGroupCount_API({ ...APIParams }),
        ...useQueryOptions
    });
}

/**
 * @description Update annotation group.
 * @returns 
 */

async function updateAnnotationGroup_API({ tag }) {
    const res = await axios.post(`${config.baseURL}/annotations/groups/${tag}/update`)
    return res.data
}

export const useUpdateAnnotationGroup = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => updateAnnotationGroup_API ({ ...APIParams}),
        ...useMutationOptions
    });
}





/**
 * @description Get bool if protein is in annotation 
 * @returns
 */

async function getIsProteinInAnnotation_API({ tag, protein_tag }) {
    const res = await axios.get(`${config.baseURL}/annotations/${tag}/annotates/${protein_tag}`)
    return res.data
}       

export const useGetIsProteinInAnnotation = (APIParams = { tag, protein_tag }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getIsProteinInAnnotation", APIParams.tag, APIParams.protein_tag],
        queryFn: () => getIsProteinInAnnotation_API({ ...APIParams }),
        ...useQueryOptions
    });
}   



