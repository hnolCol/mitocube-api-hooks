import { useQuery, useMutation } from "react-query"
import axios from "axios"
import config from "../../../config";


/**
 *  Get a proteome by its tag
 * @param {Object} props 
 * @param {Number} props.tag The proteome tag
 * @returns {}
 */
async function getProteomeBySearchString_API({search_string, limit}) {
    const res = await axios.get(`${config.baseURL}/proteomes/q`, { params: { search_string, limit } })
    return res.data
}

export const useGetProteomeBySearchString = (APIParams = {search_string, limit}, useQueryOptions = {}) => {
    return useQuery(["getProteome", APIParams.search_string, APIParams.limit],() =>  getProteomeBySearchString_API({...APIParams}), useQueryOptions)
}
