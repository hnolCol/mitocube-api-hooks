import { useQuery, useMutation } from "@tanstack/react-query";
import { use } from "react";

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
/**
 * @description Retrieves an overview of all instruments, including their current state and other relevant information. 
 * @param {Object} props
 * @returns {import("./types").InstrumentOverview[]} - An array of instrument overviews
 */ 

async function getInstrumentsOverview_API({}) {
    const res = await client.get(`/instruments/overview`)
    return res.data
}

const useGetInstrumentsOverview = (APIParams = {}, useQueryOptions = {staleTime: 30000}) => {
    return useQuery({
        queryKey: ["getInstrumentsOverview"],
        queryFn: () => getInstrumentsOverview_API({...APIParams}),
        ...useQueryOptions
    });
}

/**
    * @description Retrieves a summary of quantification data for a specific instrument within a given time range.
 * @param {*} param0 
 * @returns 
 */
async function getInstrumentQuantificationSummary_API({tag, timestamp_min, timestamp_max}) {
    const res = await client.get(`/instruments/${tag}/quantification/summary`, {params: {timestamp_min, timestamp_max}})
    return res.data
}
const useGetInstrumentQuantificationSummary = (APIParams = {tag}, useQueryOptions = {staleTime: 60000}) => {
    return useQuery({ queryKey: ["getInstrumentQuantificationSummary", APIParams.tag, APIParams.timestamp_min, APIParams.timestamp_max], queryFn: () => getInstrumentQuantificationSummary_API({...APIParams}), ...useQueryOptions });
}

/**
    * @description Retrieves a summary of state duration data for a specific instrument within a given time range.
 * @param {*} param0 
 * @returns 
 */
async function getInstrumentStateDurationSummary_API({tag, timestamp_min, timestamp_max}) {
    const res = await client.get(`/instruments/${tag}/state/durations/summary`, {params: {timestamp_min, timestamp_max}})
    return res.data
}
const useGetInstrumentStateDurationSummary = (APIParams = {tag}, useQueryOptions = {staleTime: 60000}) => {
    return useQuery({ queryKey: ["getInstrumentStateDurationSummary", APIParams.tag, APIParams.timestamp_min, APIParams.timestamp_max], queryFn: () => getInstrumentStateDurationSummary_API({...APIParams}), ...useQueryOptions });
}

/**
 * @description Retrieves all instrument states from the database.
 * @returns {import("./types").InstrumentState[]} - An array of all instrument states
 */ 
async function getAllInstrumentStates_API({}) {
    const res = await client.get(`/instruments/states/all`)
    return res.data
}
const useGetAllInstrumentStates = (APIParams = {}, useQueryOptions = {staleTime: Infinity}) => {
    return useQuery({ queryKey: ["getAllInstrumentStates"], queryFn: () => getAllInstrumentStates_API({...APIParams}), ...useQueryOptions });
}


/**
 * @description Retrieves the fractional state durations for a specific instrument within a given time range.
 * @param {*} param0 
 * @returns 
 */
async function getFractionalInstrumentStateDurations_API({tag, timestamp_min, timestamp_max, limit}) {
    const res = await client.get(`/instruments/${tag}/states/durations/fraction`, {params: {timestamp_min, timestamp_max, limit}})
    return res.data
}
const useGetFractionalInstrumentStateDurations = (APIParams = {tag}, useQueryOptions = {staleTime: 60000}) => {
    return useQuery({
        queryKey: ["getFractionalInstrumentStateDurations", APIParams.tag, APIParams.timestamp_min, APIParams.timestamp_max],
        queryFn: () => getFractionalInstrumentStateDurations_API({...APIParams}),
        ...useQueryOptions
    })
}


/**
 * @description Retrieves past submissions for a specific instrument with pagination support.
 * @param {*} param0 
 * @returns 
 */
async function getInstrumentPastSubmissions_API({tag, offset, limit}) {
    const res = await client.get(`/instruments/${tag}/submissions/past`, {params: {offset, limit}})
    return res.data
}
const useGetInstrumentPastSubmissions = (APIParams = {tag, offset, limit}, useQueryOptions = {staleTime: 30000}) => {
    return useQuery({
        queryKey: ["getInstrumentPastSubmissions", APIParams.tag, APIParams.offset, APIParams.limit],
        queryFn: () => getInstrumentPastSubmissions_API({...APIParams}),
        ...useQueryOptions
    })
}

/**
 * @description Retrieves the unique protein group count for a specific instrument in a given year.
 * @param {*} param0 
 * @returns 
 */
async function getInstrumentUniqueProteinGroupCount_API({tag, year}) {
    const res = await client.get(`/instruments/${tag}/quantification/unique-count`, {params: {year}})
    return res.data
}
const useGetInstrumentUniqueProteinGroupCount = (APIParams = {tag, year}, useQueryOptions = {staleTime: 60000}) => {
    return useQuery({
        queryKey: ["getInstrumentUniqueProteinGroupCount", APIParams.tag, APIParams.year],
        queryFn: () => getInstrumentUniqueProteinGroupCount_API({...APIParams}),
        ...useQueryOptions
    })
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
    usePostInstrumentState,
    useGetInstrumentsOverview,
    useGetInstrumentQuantificationSummary,
    useGetInstrumentStateDurationSummary,
    useGetAllInstrumentStates,
    useGetFractionalInstrumentStateDurations,
    useGetInstrumentPastSubmissions,
    useGetInstrumentUniqueProteinGroupCount
}

}
