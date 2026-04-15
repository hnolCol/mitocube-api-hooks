import { useMutation } from "@tanstack/react-query";

export function createModifySymptomsAPI(client) {

    /**
     * @description Inserts a new symptom.
     * @returns {Boolean} - If the insertion was successful. 
     */
    async function postSymptom_API({  text, description, priority }) {
        const res = await client.post(`/maintenance/symptoms/`, { text, description,  priority })
        return res.data 
    }

    const usePostSymptom = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postSymptom_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    /**
     * @description Edits an existing symptom.
     * @returns {Boolean} - If the editing was successful. 
     */
    async function editSymptom_API({ tag, text, description,  priority }) {
        const res = await client.put(`/maintenance/symptoms/${tag}`, { text, description,  priority })
        return res.data 
    }

    const useEditSymptom = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => editSymptom_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    /**
     * @description Deletes an existing symptom.
     * @returns {Boolean} - If the deletion was successful.    
     */
    async function deleteSymptom_API({ tag }) {
        const res = await client.delete(`/maintenance/symptoms/${tag}`)
        return res.data 
    }

    const useDeleteSymptom = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => deleteSymptom_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    return {
        usePostSymptom,
        useEditSymptom,
        useDeleteSymptom
    }

}