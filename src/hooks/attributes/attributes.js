import { useMutation, useQuery } from "@tanstack/react-query"
import _ from "lodash"

export function createModifyAttributesAPI(client) {

    async function postAttribute_API({text, abbreviation, priority, allow_input, children, required_trait_tags, group_tags, min_state, traits, parents}){
        const res = await client.post(`/attributes`,{
            text,
            abbreviation,
            priority,
            min_state,
            allow_input,
            children,
            group_tags,
            required_trait_tags,
            traits,
            parents
        })
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
  
  
  
  