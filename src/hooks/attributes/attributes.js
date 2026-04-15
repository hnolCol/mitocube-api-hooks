import { useMutation, useQuery } from "@tanstack/react-query"
import _ from "lodash"

export function createModifyAttributesAPI(client) {

    async function postAttribute_API({}){
        const res = await client.post(`/attributes`,{})
        return res.data
    }

    const usePostAttribute = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postAttribute_API({...APIParams}),
            ...useMutationOptions
        })
    }

    async function postAttributeValues_API({attribute_tag}){
        const res = await client.post(`/attributes/${attribute_tag}/values`)
        return res.data
    }

    const usePostAttributeValues = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postAttributeValues_API({...APIParams}),
            ...useMutationOptions
        })
    }

    async function deleteAttributeValue_API({attribute_tag, attribute_value_tag}){
        const res = await client.delete(`/attributes/${attribute_tag}/values/${attribute_value_tag}`)
        return res.data
    }

    const useDeleteAttributeValue = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => deleteAttributeValue_API({...APIParams}),
            ...useMutationOptions
        })
    }

    async function patchAttributeValue_API({ attribute_tag, attribute_value_props }) {
        const res = await client.patch(`/attributes/${attribute_tag}/values/${attribute_value_props.tag}`,
            attribute_value_props
        )
        return res.data
    }

    const useUpdateAttributeValue = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => patchAttributeValue_API({...APIParams}),
            ...useMutationOptions
        })
    }

    return {
        usePostAttribute,
        usePostAttributeValues,
        useDeleteAttributeValue,
        useUpdateAttributeValue,
    };
}
  
  
  
  