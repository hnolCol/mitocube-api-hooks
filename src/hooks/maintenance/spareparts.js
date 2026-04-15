import { useQuery, useMutation } from "@tanstack/react-query";

export function createModifySparePartsAPI(client) {

    /**
     * @description Creates a new sparepart.
     * @returns {Boolean}
     */
    async function postSparePart_API({ text, description, company, product_id, price, link }) {
        const res = await client.post(`/maintenance/spareparts/`, { text, description, company, product_id, price, link })
        return res.data
    }

    const usePostSparePart = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postSparePart_API({ ...APIParams }),
            ...useMutationOptions
        });
    }


    /**
     * @description Updates an existing sparepart.
     * @returns {Boolean}
     */
    async function updateSparePart_API({ tag, text, description, company, product_id, price, link }) {
        const res = await client.put(`/maintenance/spareparts/${tag}`, { tag, text, description, company, product_id, price, link })
        return res.data
    }

    const useUpdateSparePart = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => updateSparePart_API({ ...APIParams }),
            ...useMutationOptions
        });
    }


    /**
     * @description Deletes a sparepart.
     * @returns {Boolean}
     */
    async function deleteSparePart_API({ tag }) {
        const res = await client.delete(`/maintenance/spareparts/${tag}`)
        return res.data
    }

    const useDeleteSparePart = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => deleteSparePart_API({ ...APIParams }),
            ...useMutationOptions
        });
    }

    return {
        usePostSparePart,
        useUpdateSparePart,
        useDeleteSparePart
    }

}
