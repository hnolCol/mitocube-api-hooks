import { useQuery, useMutation } from "@tanstack/react-query";

export function createCoreInstrumentsAPI(client) {

/**
 * @description Retrieves the types of instruments tags that are present in the database. Instruments can be 
 * any attributes that are connected to the AttributeGroup -> tag instrumenttype. In our case, we have mass spectrometers and liquid chromatography
 * systems as a instrument type. 
 * @returns {String[]} - The tags of the attributes that are Instrument types. 
 */
async function getInstrumentTypes_API({}) {
    const res = await client.get(`/instruments/types`)
    return res.data 
}

const useGetInstrumentTypes = (APIParams = {}, useQueryOptions = {stateTime : Infinity}) => {
    return useQuery({
        queryKey: ["getInstrumentTypes"],
        queryFn: () => getInstrumentTypes_API({...APIParams}),
        ...useQueryOptions
    });
}

/**
 * @description 
 * @param {String} tag The type tag
 * @returns {String[]} - The tags of the attributes that are Instrument types. 
 */
async function getInstrumentsByType_API({tag}) {
    const res = await client.get(`/instruments/`, {params : {type : tag}})
    return res.data 
}

const useGetInstrumentsByType = (APIParams = {tag}, useQueryOptions = {stateTime : Infinity}) => {
    return useQuery({
        queryKey: ["getInstrumentByType", APIParams.tag],
        queryFn: () => getInstrumentsByType_API({...APIParams}),
        ...useQueryOptions
    });
}

/**
 * @description Returns the states of an instrument. Order by most recent.
 * @returns {Object[]} - The state responses of the instrument. 
 */
async function getStatesOfAnInstrument_API({tag, limit}) {
    const res = await client.get(`/instruments/${tag}/states`, {params : {limit}})
    return res.data 
}

const useGetStatesOfAnInstrument = (APIParams = {tag, limit}, useQueryOptions = {stateTime : Infinity}) => {
    return useQuery({
        queryKey: ["getStatesOfAnInstrument", APIParams.tag, APIParams.limit],
        queryFn: () => getStatesOfAnInstrument_API({...APIParams}),
        ...useQueryOptions
    });
}


/**
 * @description  
 * @returns {String} - The instrument tag
 */
async function getInstrument_API({tag}) {
    const res = await client.get(`/instruments/${tag}`)
    return res.data 
}

const useGetInstrument = (APIParams = {tag}, useQueryOptions = {stateTime : Infinity}) => {
    return useQuery({
        queryKey: ["getInstrument", APIParams.tag],
        queryFn: () => getInstrument_API({...APIParams}),
        ...useQueryOptions
    });
}

/**
 * @description Retrieves the current state of an instrument
 * @param {Object} props
 * @param {String} props.tag The instrument tag
 * @returns {import("./types").InstrumentState} - The instrument state
 */
async function getInstrumentState_API({ tag }) {
    const res = await client.get(`/instruments/states/${tag}`)
    return res.data 
}

const useGetInstrumentState = (APIParams = {tag}, useQueryOptions = {stateTime : Infinity}) => {
    return useQuery({
        queryKey: ["getInstrumentState", APIParams.tag],
        queryFn: () => getInstrumentState_API({...APIParams}),
        ...useQueryOptions
    });
}




/**
 * @description  Finds instrument states by a search string. If no search string is provided, it returns all instrument states.
 * @param {Object} props
 * @param {String} props.search_string The search string to query the instrument states
 * @param {Number} props.limit The maximum number of results to return
 * @returns {String[]} - The instrument state tags matching the query
 */
async function getInstrumentStateByQuery_API({search_string, limit}) {
    const res = await client.get(`/instruments/states/q`, {params : {search_string, limit}})
    return res.data 
}

const useGetInstrumentStateByQuery = (APIParams = {search_string : "", limit : 20}, useQueryOptions = {stateTime : Infinity, placeholderData: (prev) => prev}) => {
    return useQuery({
        queryKey: ["getInstrumentStateByQuery", APIParams.search_string],
        queryFn: () => getInstrumentStateByQuery_API({ ...APIParams }),
        ...useQueryOptions
    });
}



/**
 * @description  
 * @returns {import("./types").InstrumentStateHistory[]} - The instrument state tags matching the query
 */
async function getInstrumentStateDurations_API({tag, limit, timestamp_min, timestamp_max}) {
    const res = await client.get(`/instruments/${tag}/states/durations`, {params : {limit, timestamp_min, timestamp_max}})
    return res.data 
}

const useGetInstrumentStateDurations = (APIParams = {tag, limit, timestamp_min, timestamp_max}, useQueryOptions = {stateTime : Infinity}) => {
    return useQuery({
        queryKey: ["getInstrumentStateDurations", APIParams.tag, APIParams.limit, APIParams.timestamp_min, APIParams.timestamp_max],
        queryFn: () => getInstrumentStateDurations_API({ ...APIParams }),
        ...useQueryOptions
    });
}



/**
 * @description  
 * @returns {import("./types").InstrumentStateHistory[]} - The instrument state tags matching the query
 */
async function getSpecificInstrumentStateDurations_API({tag, state_tag, limit, timestamp_min, timestamp_max}) {
    const res = await client.get(`/instruments/${tag}/states/${state_tag}/durations`, {params : {limit, timestamp_min, timestamp_max}})
    return res.data 
}

const useGetSpecificInstrumentStateDurations = (APIParams = {tag, state_tag, limit, timestamp_min, timestamp_max}, useQueryOptions = {stateTime : Infinity}) => {
    return useQuery({
        queryKey: ["getSpecificInstrumentStateDurations", APIParams.tag, APIParams.state_tag, APIParams.limit, APIParams.timestamp_min, APIParams.timestamp_max],
        queryFn: () => getSpecificInstrumentStateDurations_API({ ...APIParams }),
        ...useQueryOptions
    });
}




/**
 * @description Adds a new instrument state to the database
 * @param {Object} props
 * @param {String} props.tag The instrument tag
 * @param {String} props.instrument_state_tag The instrument state tag
 * @returns 
 */
async function postInstrumentState_API({tag, instrument_state_tag}){
    //fetch availabe features from the API. Reconsider /details 
    const res = await client.post(`/instruments/${tag}/states/${instrument_state_tag}`)
    return res.data
}

const usePostInstrumentState = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => postInstrumentState_API({...APIParams}),
        ...useMutationOptions
    });
}

return {
    useGetInstrumentTypes,
    useGetInstrumentsByType,
    useGetStatesOfAnInstrument,
    useGetInstrument,
    useGetInstrumentState,
    useGetInstrumentStateByQuery,
    useGetInstrumentStateDurations,
    useGetSpecificInstrumentStateDurations,
    usePostInstrumentState
}

}