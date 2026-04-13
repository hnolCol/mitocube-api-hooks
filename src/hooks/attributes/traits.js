import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "../axios-setup"
import config from "../../../config"
import _ from "lodash"


/**
 * @description Returns the trait
 * @param {Object} props
 * @param {String} props.tag - The trait tag.
 * @returns {import("./types").Trait}  Trait
 */
async function getTraitByTag_API({ tag }) {
    
    const res = await axios.get(`${config.baseURL}/attributes/traits/${tag}`)
    return res.data 
}

export const useGetTraitByTag = (APIParams = { tag }, useQueryOptions = { staleTime: Infinity }) => {
    return useQuery({
        queryKey: ["getTraitByTag", APIParams.tag],
        queryFn: () => getTraitByTag_API({ ...APIParams }),
        ...useQueryOptions
    })
}


/**
 * @description Returns the trait tags. 
 * @param {Object} props
 * @param {String} props.search_string - The search string to be used to find the trait. 
 * @param {String} props.attribute_tag - The attribute_tag to limit the search space. 
 * @param {Number} props.limit - Limit the number of returned traits. 
 * @returns {String[]} Matching trait tags. 
 */
async function getTraitBySearchString_API({ search_string, attribute_tag, limit }) {
    const res = await axios.get(`${config.baseURL}/attributes/traits/q`,
        {
            params: {
                search_string,
                attribute_tag,
                limit
            }
        })
    return res.data 
}

export const useGetTraitBySearchString = (APIParams = { search_string, attribute_tag, limit }, useQueryOptions = {staleTime : 30000}) => {
    return useQuery({
        queryKey: ["getTraitBySearch", APIParams.attribute_tag, APIParams.limit, APIParams.search_string],
        queryFn: () => getTraitBySearchString_API({ ...APIParams }),
        ...useQueryOptions
    })
}



/**
 * @description Fetches the trait tags associated with an attribute_tag (tag)
 * @param {Object} props 
 * @param {String} props.tag  The attribute tag
 * @returns {String[]} The tags for the traits matching the attribute
 */ 
async function getTraitsByAttributeTag_API({ tag }) {
    const res = await axios.get(`/api/attributes/${tag}/traits`,{params : {tag}})
    return res.data 
}

export const useGetTraitsByAttributeTag = (APIParams = {tag }, useQueryOptions) => {
    return useQuery({
        queryKey: ["traitsByTag", APIParams.tag],
        queryFn: () => getTraitsByAttributeTag_API({...APIParams}),
        ...useQueryOptions
    })
}


/**
 * @description Adds a trait to an attribute.
 * @param {Object} props
 * @param {String} props.attribute_tag
 * @param {Object} props.trait - {value, text, description}
 * @returns
 */
async function postTrait_API({ attribute_tag, trait }) {
    const res = await axios.post(`${config.baseURL}/attributes/${attribute_tag}/traits`, { ...trait, attribute_tag })
    return res.data
}

export const usePostTrait = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => postTrait_API({ ...APIParams }),
        ...useMutationOptions
    })
}



/**
 * @description Returns the number of traits associated with an attribute_tag (tag)
 * @param {Object} props 
 * @param {String} props.tag  The attribute tag
 * @returns {Number} The number of traits matching the attribute
 */
async function getTraitCountByAttributeTag_API({ tag }) {
    const res = await axios.get(`/api/attributes/${tag}/traits/count`)
    return res.data
}

export const useGetTraitCount = (APIParams = { tag }, useQueryOptions) => {
    return useQuery({
        queryKey: ["traitCountByAttributeTag", APIParams.tag],
        queryFn: () => getTraitCountByAttributeTag_API({ ...APIParams }),
        ...useQueryOptions
    })
}




/**
 * @description Returns the text representation of a trait defined by its tag.
 * @param {Object} props 
 * @param {String} props.tag  The trait tag
 * @returns {String} The trait text
 */
async function getTraitText_API({ tag }) {
    const res = await axios.get(`/api/attributes/traits/${tag}/text`)
    return res.data
}

export const useGetTraitText = (APIParams = { tag }, useQueryOptions = {staleTime : 3000000}) => {
    return useQuery({
        queryKey: ["traitText", APIParams.tag],
        queryFn: () => getTraitText_API({ ...APIParams }),
        ...useQueryOptions
    })
}

/**
 * @description Returns the description of a trait defined by its tag.
 * @param {Object} props 
 * @param {String} props.tag  The trait tag
 * @returns {String} The trait description  
 */

async function getTraitDescription_API({ tag }) {
    const res = await axios.get(`/api/attributes/traits/${tag}/description`)
    return res.data
}

export const useGetTraitDescription = (APIParams = { tag }, useQueryOptions = {staleTime : 3000000}) => {
    return useQuery({
        queryKey: ["traitDescription", APIParams.tag],
        queryFn: () => getTraitDescription_API({ ...APIParams }),
        ...useQueryOptions
    })
}   


/**
 * @description Return the priority of a trait defined by its tag. The priority is used to determine the order of the traits when displayed. The lower the priority, the higher the trait is displayed.
 * @param {Object} props 
 * @param {String} props.tag  The trait tag
 * @returns {Number} The trait priority  
 */

async function getTraitPriority_API({ tag }) {
    const res = await axios.get(`/api/attributes/traits/${tag}/priority`)
    return res.data
}

export const useGetTraitPriority = (APIParams = { tag }, useQueryOptions = {staleTime : 3000000}) => {
    return useQuery({
        queryKey: ["traitPriority", APIParams.tag],
        queryFn: () => getTraitPriority_API({ ...APIParams }),
        ...useQueryOptions
    })
}       


/**
 * @description Updates a trait's text, description, and/or priority.
 * Tag and value are immutable.
 * @param {Object} props
 * @param {String} props.attribute_tag
 * @param {String} props.trait_tag
 * @param {Object} props.updates - {text?, description?, priority?}
 */
async function updateTrait_API({ attribute_tag, trait_tag, updates }) {
    const res = await axios.patch(
        `${config.baseURL}/attributes/${attribute_tag}/traits/${trait_tag}`,
        updates
    )
    return res.data
}

export const useUpdateTrait = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => updateTrait_API({ ...APIParams }),
        ...useMutationOptions
    })
}


/**
 * @description Deletes a trait. The backend will reject the deletion with a 409
 * if the trait is still connected to any ConditionApplication.
 * @param {Object} props
 * @param {String} props.attribute_tag
 * @param {String} props.trait_tag
 */
async function deleteTrait_API({ attribute_tag, trait_tag }) {
    const res = await axios.delete(`${config.baseURL}/attributes/${attribute_tag}/traits/${trait_tag}`)
    return res.data
}

export const useDeleteTrait = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => deleteTrait_API({ ...APIParams }),
        ...useMutationOptions
    })
}


/**
 * @description Returns the current user's permissions for traits and attributes.
 * @returns {Object} { user_tag, role, insert, delete, edit }
 */
async function getTraitPermissions_API() {
    const res = await axios.get(`${config.baseURL}/attributes/traits/permissions`)
    return res.data
}

export const useGetTraitPermissions = (useQueryOptions = { staleTime: 1000 * 60 * 5 }) => {
    return useQuery({
        queryKey: ["getTraitPermissions"],
        queryFn: () => getTraitPermissions_API(),
        ...useQueryOptions
    })
}