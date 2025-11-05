import { useQuery, useMutation } from "react-query";
import axios from "axios";
import config from "../../../config";

/**
 * @description Finds a procedure by its search string.
 * @returns {String[]} - The tags matching the search string. 
 */
async function getMaintenanceProcedureByQuery_API({search_string, limit}) {
    const res = await axios.get(`${config.baseURL}/maintenance/procedures/q`, { params: { search_string, limit } })
    console.log(res.data)
    return res.data 
}

export const useGetMaintenanceProcedureByQuery = (APIParams = {search_string : "", limit : 10}, useQueryOptions = {stateTime : 200000, placeholderData: (prev) => prev}) => {
    return useQuery(["getProcedureBySearchString", APIParams.search_string],() =>  getMaintenanceProcedureByQuery_API({...APIParams}), useQueryOptions)
}


/**
 * @description  Returns a procedure by its tag. 
 * @returns {Object} - The tags matching the search string. 
 */
async function getSProcedureByTag_API({tag}) {
    const res = await axios.get(`${config.baseURL}/maintenance/procedures/${tag}`)
    return res.data 
}

export const useGetMaintenanceProcedureByTag = (APIParams = { tag }, useQueryOptions = {stateTime : 200000}) => {
    return useQuery(["getProcedureBy", APIParams.tag],() =>  getSProcedureByTag_API({...APIParams}), useQueryOptions)
}
