import { useQuery, useMutation } from "@tanstack/react-query";

export function createModifyMaintenanceProceduresAPI(client) {

    /**
     * @description Inserts a new MaintenanceProcedure.
     * @returns {Boolean} - If the insertion was successful. 
     */
    async function postMaintenanceProcedure_API({  text, description, priority }) {
        const res = await client.post(`/maintenance/procedures/`, { text, description,  priority })
        return res.data 
    }

    const usePostMaintenanceProcedure = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postMaintenanceProcedure_API({ ...APIParams }),
            ...useMutationOptions
        });
    }

    /**
     * @description Edits an existing MaintenanceProcedure.
     * @returns {Boolean} - If the editing was successful. 
     */
    async function editMaintenanceProcedure_API({ tag, text, description, priority }) {
        const res = await client.put(`/maintenance/procedures/${tag}`, { tag, text, description, priority })
        return res.data 
    }

    const useEditMaintenanceProcedure = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => editMaintenanceProcedure_API({ ...APIParams }),
            ...useMutationOptions
        });
    }

    /**
     * @description Deletes an existing MaintenanceProcedure.
     * @returns {Boolean} - If the deletion was successful.    
     */
    async function deleteMaintenanceProcedure_API({ procedure_tag }) {
        const res = await client.delete(`/maintenance/procedures/${procedure_tag}`)
        return res.data 
    }

    const useDeleteMaintenanceProcedure = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => deleteMaintenanceProcedure_API({ ...APIParams }),
            ...useMutationOptions
        });
    }


    return {
        usePostMaintenanceProcedure,
        useEditMaintenanceProcedure,
        useDeleteMaintenanceProcedure
    }

}