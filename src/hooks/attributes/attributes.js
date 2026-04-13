import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import config from "../../../config"

/**
 * @description Returns the attribute. The default stale time is 30000 ms.
 * @param {Object} props
 * @param {String} props.tag The attribute tag to be returned.  
 * @returns {import("./types").Attribute}
 */
async function getAttributeByTag_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/attributes/${tag}`)
    return res.data 
}

export const useGetAttribute = (APIParams = { tag }, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getAttribute", APIParams.tag],
        queryFn: () => getAttributeByTag_API({ ...APIParams }),
        staleTime: 30000,
        ...useQueryOptions
    })
}

async function postAttribute_API({}){
    const res = await axios.post(`${config.baseURL}/attributes`,{})
    return res.data
}

export const usePostAttribute = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => postAttribute_API({...APIParams}),
        ...useMutationOptions
    })
}

async function postAttributeValues_API({attribute_tag}){
    const res = await axios.post(`${config.baseURL}/attributes/${attribute_tag}/values`)
    return res.data
}

export const usePostAttributeValues = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => postAttributeValues_API({...APIParams}),
        ...useMutationOptions
    })
}

async function deleteAttributeValue_API({attribute_tag, attribute_value_tag}){
    const res = await axios.delete(`${config.baseURL}/attributes/${attribute_tag}/values/${attribute_value_tag}`)
    return res.data
}

export const useDeleteAttributeValue = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => deleteAttributeValue_API({...APIParams}),
        ...useMutationOptions
    })
}

async function patchAttributeValue_API({ attribute_tag, attribute_value_props }) {
    const res = await axios.patch(`${config.baseURL}/attributes/${attribute_tag}/values/${attribute_value_props.tag}`,
        attribute_value_props
    )
    return res.data
}

export const useUpdateAttributeValue = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => patchAttributeValue_API({...APIParams}),
        ...useMutationOptions
    })
}
