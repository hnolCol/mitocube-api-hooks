import { useQuery } from "@tanstack/react-query"
import axios from "../axios-setup"
import config from "../../../config";

/**
 * 
 * @param {Object} props
 * @description Fetches the available states of a maintenance event.
 * @returns {Object[]} - The available states of the maintenance event.
 */
async function getMaintenanceEventStates_API() {
    const res = await axios.get(`${config.baseURL}/maintenance/states`)
    return res.data
}   

export const useGetMaintenanceEventStates = (APIParams = {}, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getMaintenanceEventStates"],
        queryFn: () => getMaintenanceEventStates_API({ ...APIParams }),
        staleTime: 20000000,
        placeholderData: prev => prev,
        ...useQueryOptions
    })
}