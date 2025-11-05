import { useQuery, useMutation } from "react-query";
import axios from "axios";
import config from "../../../config";

/**
 * @description Finds a symtom by its search string.
 * @returns {String[]} - The tags matching the search string. 
 */
async function getSymptom_API({search_string, limit}) {
    const res = await axios.get(`${config.baseURL}/maintenance/symptoms/q`, { params: { search_string, limit } })
    console.log(res.data)
    return res.data 
}

export const useGetSymptomByQuery = (APIParams = {search_string : "", limit : 5}, useQueryOptions = {stateTime : 200000, placeholderData: (prev) => prev}) => {
    return useQuery(["getSymptomBySearchString", APIParams.search_string],() =>  getSymptom_API({...APIParams}), useQueryOptions)
}




/**
 * @description  Returns a symptom by its tag. 
 * @returns {String[]} - The tags matching the search string. 
 */
async function getSymptomByTag_API({tag}) {
    const res = await axios.get(`${config.baseURL}/maintenance/symptoms/${tag}`)
    return res.data 
}

export const useGetSymptomByTag = (APIParams = { tag }, useQueryOptions = {stateTime : 200000}) => {
    return useQuery(["getSymptomBy", APIParams.tag],() =>  getSymptomByTag_API({...APIParams}), useQueryOptions)
}




/**
 * 
 * @param {Object} props 
 * @param {String} props.description
 * @param {String} props.instrument_tag    
 * @param {String} props.instrument_state_tag The new instrument state tag
 * @description Create a new maintenance event. Endpoint: POST '/api/maintenance/'
 * @returns 
 */
async function postMaintenanceEvent_API({ description, instrument_tag, instrument_state_tag, symptom_tags = []}) {
    const res = await axios.post(`${config.baseURL}/maintenance/`,
        { description, instrument_tag, instrument_state_tag, symptom_tags }
    )
    return res.data 
}   

