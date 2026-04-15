import { useMutation } from "@tanstack/react-query"

export function createModifyAnnotationsAPI(client) {
        
    /**
     * @description Creates a new annotation.
     * @return {Boolean}
     */

    async function postAnnotations_API({ text, description, publication, pubmed_id, source, protein_tags, group_tag}) {
        const res = await client.post(`/annotations/`, { text, description, publication, pubmed_id, source, protein_tags, group_tag})
        return res.data
    }

    const usePostAnnotations = (useMutationOptions = {}) => {
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
        const res = await client.put(`/annotations/${tag}`, { tag, text, description, publication, pubmed_id, source, protein_tags, group_tag})
        return res.data
    }

    const useUpdateAnnotations = (useMutationOptions = {}) => {
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
        const res = await client.delete(`/annotations/${tag}`)
        return res.data
    }

    const useDeleteAnnotations = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => deleteAnnotations_API({...APIParams}),
            ...useMutationOptions
        });
    }

    /**
     * @description Creates a new annotation group.
     * @return {Boolean}
     */

    async function postAnnotationGroup_API({ text, description, source, url }) {
        const res = await client.post(`/annotations/groups/`, { text, description, source, url })
        return res.data
    }

    const usePostAnnotationGroup = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postAnnotationGroup_API ({ ...APIParams}),
            ...useMutationOptions
        });
    }   
        


    /**
     * @description Update annotation group.
     * @returns 
     */

    async function updateAnnotationGroup_API({ tag }) {
        const res = await client.post(`/annotations/groups/${tag}/update`)
        return res.data
    }

    const useUpdateAnnotationGroup = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => updateAnnotationGroup_API ({ ...APIParams}),
            ...useMutationOptions
        });
    }

    return {
        usePostAnnotations,
        useUpdateAnnotations,
        useDeleteAnnotations,
        usePostAnnotationGroup,
        useUpdateAnnotationGroup
    };
}