import { useQuery, useMutation } from "@tanstack/react-query";


export function createModifyExternalServiceAPI(client) {

    /**
     * @description Creates a new External Service.
     * @returns {Boolean}
     */
    async function postExternalService_API({ description, name, company, email, costs , billing_number, internal_id, maintenance_event_tag }) {
        const res = await client.post(`/maintenance/externalservice/`, { description, name, company, email, costs, billing_number, internal_id, maintenance_event_tag })
        return res.data
    }

    const usePostExternalService = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postExternalService_API({ ...APIParams }),
            ...useMutationOptions
        });
    }


    /**
     * @description Updates an existing External Service.
     * @returns {Boolean}
     */
    async function updateExternalService_API({ tag, description, name, company, email, costs, billing_number, internal_id }) {
        const res = await client.put(`/maintenance/externalservice/${tag}`, { tag, description, name, company, email, costs, billing_number, internal_id })
        return res.data
    }

    const useUpdateExternalService = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => updateExternalService_API({ ...APIParams }),
            ...useMutationOptions
        });
    }


    /**
     * @description Deletes a ExternalService.
     * @returns {Boolean}
     */
    async function deleteExternalService_API({ tag }) {
        const res = await client.delete(`/maintenance/externalservice/${tag}`)
        return res.data
    }

    const useDeleteExternalService = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => deleteExternalService_API({ ...APIParams }),
            ...useMutationOptions
        });
    }


    return {
        usePostExternalService,
        useUpdateExternalService,
        useDeleteExternalService
    }

}