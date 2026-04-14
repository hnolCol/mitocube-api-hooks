import { useMutation, useQuery } from "@tanstack/react-query"
import _ from "lodash"

export function createModifyTraitsAPI(client) {

    /**
     * @description Adds a trait to an attribute.
     * @param {Object} props
     * @param {String} props.attribute_tag
     * @param {Object} props.trait - {value, text, description}
     * @returns
     */
    async function postTrait_API({ attribute_tag, trait }) {
        const res = await client.post(`/attributes/${attribute_tag}/traits`, { ...trait, attribute_tag })
        return res.data
    }

    const usePostTrait = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postTrait_API({ ...APIParams }),
            ...useMutationOptions
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
        const res = await client.patch(
            `/attributes/${attribute_tag}/traits/${trait_tag}`,
            updates
        )
        return res.data
    }

    const useUpdateTrait = (useMutationOptions = {}) => {
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
        const res = await client.delete(`/attributes/${attribute_tag}/traits/${trait_tag}`)
        return res.data
    }

    const useDeleteTrait = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => deleteTrait_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

return {
    usePostTrait,
    useUpdateTrait,
    useDeleteTrait,
  };
}