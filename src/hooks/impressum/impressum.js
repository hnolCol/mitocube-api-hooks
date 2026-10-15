import { useQuery, useMutation } from "@tanstack/react-query";

export function createImpressumAPI(client) {
    /**
     * @description Retrieves the impressum. Endpoint: GET '/api/impressum'
     * If none exists yet, the backend seeds a default from the environment settings.
     */
    async function getImpressum_API() {
        const res = await client.get(`/impressum`)
        return res.data
    }
    const useGetImpressum = (useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getImpressum"],
            queryFn: () => getImpressum_API(),
            ...useQueryOptions
        })
    }
    /**
     * @description Endpoint: PUT '/api/impressum' - create/update the impressum. Requires admin rights.
     * @param {Object} props
     * @param {String} props.title
     * @param {String} props.text - markdown
     */
    async function updateImpressum_API({ title, text }) {
        const res = await client.put(`/impressum`, { title, text })
        return res.data
    }
    const useUpdateImpressum = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => updateImpressum_API({ ...APIParams }),
            ...useMutationOptions
        })
    }
    return {
        useGetImpressum,
        useUpdateImpressum
    }
}
