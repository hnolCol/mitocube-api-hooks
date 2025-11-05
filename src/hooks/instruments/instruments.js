import { useQuery } from "react-query";
import axios from "axios";
import config from "../../../config";

/**
 * @description Retrieves the types of instruments tags that are present in the database. Instruments can be 
 * any attributes that has the type InstrumentType. In our case, we have mass spectrometers and liquid chromatography
 * systems as a instrument type. 
 * @returns {String[]} - The tags of the attributes that are Instrument types. 
 */
async function getInstrumentTypes_API({}) {
    const res = await axios.get(`${config.baseURL}/instruments/types`)
    return res.data 
}

export const useGetInstrumentTypes = (APIParams = {}, useQueryOptions = {stateTime : Infinity}) => {
    return useQuery(["getInstrumentTypes"],() =>  getInstrumentTypes_API({...APIParams}), useQueryOptions)
}


/**
 * @description 
 * @param {String} tag The type tag
 * @returns {String[]} - The tags of the attributes that are Instrument types. 
 */
async function getInstrumentsByType_API({tag}) {
    const res = await axios.get(`${config.baseURL}/instruments/`, {params : {type : tag}})
    return res.data 
}

export const useGetInstrumentsByType = (APIParams = {tag}, useQueryOptions = {stateTime : Infinity}) => {
    return useQuery(["getInstrumentByType",APIParams.tag],() =>  getInstrumentsByType_API({...APIParams}), useQueryOptions)
}





/**
 * @description  
 * @returns {String} - The instrument tag
 */
async function getInstrument_API({tag}) {
    const res = await axios.get(`${config.baseURL}/instruments/${tag}`)
    return res.data 
}

export const useGetInstrument = (APIParams = {tag}, useQueryOptions = {stateTime : Infinity}) => {
    return useQuery(["getInstrument",APIParams.tag],() =>  getInstrument_API({...APIParams}), useQueryOptions)
}

/**
 * @description  
 * @returns {import("./types").InstrumentState} - The instrument state
 */
async function getInstrumentState_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/instruments/states/${tag}`)
    return res.data 
}

export const useGetInstrumentState = (APIParams = {tag}, useQueryOptions = {stateTime : Infinity}) => {
    return useQuery(["getInstrumentState",APIParams.tag],() =>  getInstrumentState_API({...APIParams}), useQueryOptions)
}




/**
 * @description  Finds instrument states by a search string. If no search string is provided, it returns all instrument states.
 * @param {Object} props
 * @param {String} props.search_string The search string to query the instrument states
 * @param {Number} props.limit The maximum number of results to return
 * @returns {String[]} - The instrument state tags matching the query
 */
async function getInstrumentStateByQuery_API({search_string, limit}) {
    const res = await axios.get(`${config.baseURL}/instruments/states/q`, {params : {search_string, limit}})
    return res.data 
}

export const useGetInstrumentStateByQuery = (APIParams = {search_string : "", limit : 20}, useQueryOptions = {stateTime : Infinity, placeholderData: (prev) => prev}) => {
    return useQuery(["getInstrumentStateByQuery", APIParams.search_string],
        () => getInstrumentStateByQuery_API({ ...APIParams }), useQueryOptions)
}



/**
 * @description  
 * @returns {import("./types").InstrumentStateHistory[]} - The instrument state tags matching the query
 */
async function getInstrumentStateDurations_API({tag, limit, timestamp_min, timestamp_max}) {
    const res = await axios.get(`${config.baseURL}/instruments/${tag}/states/durations`, {params : {limit, timestamp_min, timestamp_max}})
    return res.data 
}

export const useGetInstrumentStateDurations = (APIParams = {tag, limit, timestamp_min, timestamp_max}, useQueryOptions = {stateTime : Infinity}) => {
    return useQuery(["getInstrumentStateDurations", APIParams.tag, APIParams.limit, APIParams.timestamp_min, APIParams.timestamp_max],
        () => getInstrumentStateDurations_API({ ...APIParams }), useQueryOptions)
}



/**
 * @description  
 * @returns {import("./types").InstrumentStateHistory[]} - The instrument state tags matching the query
 */
async function getSpecificInstrumentStateDurations_API({tag, state_tag, limit, timestamp_min, timestamp_max}) {
    const res = await axios.get(`${config.baseURL}/instruments/${tag}/states/${state_tag}/durations`, {params : {limit, timestamp_min, timestamp_max}})
    return res.data 
}

export const useGetSpecificInstrumentStateDurations = (APIParams = {tag, state_tag, limit, timestamp_min, timestamp_max}, useQueryOptions = {stateTime : Infinity}) => {
    return useQuery(["getSpecificInstrumentStateDurations", APIParams.tag, APIParams.state_tag, APIParams.limit, APIParams.timestamp_min, APIParams.timestamp_max],
        () => getSpecificInstrumentStateDurations_API({ ...APIParams }), useQueryOptions)
}