import { useQuery } from "react-query"
import axios from "axios"
import config from "../../../config";
/**
 * 
 * @param {Object} props
 * @description Fetches the available states of a maintenance event.
 * @returns {Object[]} - The availabless states of the maintenance event.
 */
async function getMaintenanceEventStates_API() {
    const res = await axios.get(`${config.baseURL}/maintenance/states`)
    return res.data
}   

export const useGetMaintenanceEventStates = (APIParams = {}, useQueryOptions = { stateTime: 20000000, placeholderData: prev => prev }) => {
    return useQuery(["getMaintenanceEventStates"], () => getMaintenanceEventStates_API({ ...APIParams }), useQueryOptions)
}