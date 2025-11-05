import { useQuery, useMutation } from "react-query";
import axios from "axios";
import config from "../../../config";

/**
 * @description Finds a sparepart by its search string.
 * @returns {String[]} - The tags matching the search string. 
 */
async function getSparePartByQuery_API({search_string, limit}) {
    const res = await axios.get(`${config.baseURL}/maintenance/spareparts/q`, { params: { search_string, limit } })
    console.log(res.data)
    return res.data 
}

export const useGetSparePartByQuery = (APIParams = {search_string : "", limit : 10}, useQueryOptions = {stateTime : 200000, placeholderData: (prev) => prev}) => {
    return useQuery(["getSparePartBySearchString", APIParams.search_string],() =>  getSparePartByQuery_API({...APIParams}), useQueryOptions)
}


/**
 * @description  Returns a sparepart by its tag. 
 * @returns {Object} - The tags matching the search string. 
 */
async function getSparePartByTag_API({tag}) {
    const res = await axios.get(`${config.baseURL}/maintenance/spareparts/${tag}`)
    return res.data 
}

export const useGetSparePartByTag = (APIParams = { tag }, useQueryOptions = {stateTime : 200000}) => {
    return useQuery(["getSparePartByTag", APIParams.tag],() =>  getSparePartByTag_API({...APIParams}), useQueryOptions)
}
