import { useQuery } from "@tanstack/react-query"

export function createGetMaintenanceEventStatesAPI(client) {

    /**
     * 
     * @param {Object} props
     * @description Fetches the available states of a maintenance event.
     * @returns {Object[]} - The available states of the maintenance event.
     */
    async function getMaintenanceEventStates_API() {
        const res = await client.get(`/maintenance/states`)
        return res.data
    }   

    const useGetMaintenanceEventStates = (APIParams = {}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getMaintenanceEventStates"],
            queryFn: () => getMaintenanceEventStates_API({ ...APIParams }),
            staleTime: 20000000,
            placeholderData: prev => prev,
            ...useQueryOptions
        })
    }

    return {
        useGetMaintenanceEventStates
    }

}