import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import config from "../../../config";


/**
 * @description Return the total maintenance cost for a given instrument.
* @param {Object} props
* @param {String} props.tag The mainteance event tag
* @returns {import("./types").MaintenanceEvent} - The maintenance event.
 */
async function getMaintenanceEventsByTag_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/maintenance/${tag}`)
    return res.data 
}

export const useGetMaintenanceEventByTag = (APIParams = { tag }, useQueryOptions = {stateTime : 200000}) => {
    return useQuery({
        queryKey: ["getMaintenanceEventByTag", APIParams.tag],
        queryFn: () => getMaintenanceEventsByTag_API({ ...APIParams }),
        ...useQueryOptions
    });
}

/**
 * 
 * @param {Object} props
 * @param {String} props.maintenance_event_tag  Maintenance event tag
 * @param {String} props.event_state_tag  The new event state tag
 * @description Post a new event state to a maintenance event. Endpoint: POST '/api/maintenance/{maintenance_event_tag}/state/{event_state_tag}' 
 * @returns 
 */
async function postMaintenanceEventState_API({ maintenance_event_tag, event_state_tag }) {
    const res = await axios.post(`${config.baseURL}/maintenance/${maintenance_event_tag}/state/${event_state_tag}`,
    )
    return res.data 
}
export const usePostMaintenanceEventState = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => postMaintenanceEventState_API({...APIParams}),
        ...useMutationOptions
    });
}

/**
 * 
 * @param {Object} props
 * @param {String} props.maintenance_event_tag  Maintenance event tag
 * @description Get the current state of a maintenance event. Endpoint: GET '/api/maintenance/{tag}/state'
 * @description This returns the current state of the maintenance event, which is the last state that was set.
 * @description The state_tag is a string that describes the current state of the maintenance event, e.g. "open", "resolved".
 * @description This is useful to check 
 * @returns 
 */
async function getMaintenanceEventState_API({ maintenance_event_tag }) {
    const res = await axios.get(`${config.baseURL}/maintenance/${maintenance_event_tag}/state`)
    return res.data
}   

export const useGetMaintenanceEventState = (APIParams = { maintenance_event_tag }, useQueryOptions = {stateTime : 2000, placeholderData : prev => prev}) => {
    return useQuery({
        queryKey: ["getMaintenanceEventState", APIParams.maintenance_event_tag],
        queryFn: () => getMaintenanceEventState_API({ ...APIParams }),
        ...useQueryOptions
    });
}


/**
 * @description Finds maintenance event by querying the instrument_tag timestamp range (min and max) and user_tag
* @param {Object} props
* @param {String} props.instrument_tag The instrument tag
* @param {Number} props.timestamp_min The minimum timestamp for the query
* @param {Number} props.timestamp_max The maximum timestamp for the query
* @param {String} props.user_tag The user tag
* @param {Number} props.limit The limit of the number of maintenance events to return
* @returns {Array} - An array of maintenance event tags.
 */
async function getMaintenanceEventsByQuery_API({ instrument_tag, timestamp_min, timestamp_max, user_tag, limit }) {
    const res = await axios.get(`${config.baseURL}/maintenance/q`, { params: {instrument_tag, timestamp_min, timestamp_max, user_tag, limit} })
    return res.data 
}

export const useGetQueryMaintenanceEvents = (APIParams = {instrument_tag, timestamp_min, timestamp_max, user_tag, limit}, useQueryOptions = {stateTime : 200000, placeholderData: (prev) => prev}) => {
    return useQuery({
        queryKey: ["getMaintenanceEventsQuery",
            APIParams.instrument_tag,
            APIParams.timestamp_max,
            APIParams.timestamp_min,
            APIParams.limit,
            APIParams.user_tag],
        queryFn: () => getMaintenanceEventsByQuery_API({ ...APIParams }),
        ...useQueryOptions
    });
}




/**
 * @description Counts the maintenance events by querying the instrument_tag timestamp range (min and max) and user_tag
* @param {Object} props
* @param {String} props.instrument_tag The instrument tag
* @param {Number} props.timestamp_min The minimum timestamp for the query
* @param {Number} props.timestamp_max The maximum timestamp for the query
* @param {String} props.user_tag The user tag
* @returns {Number} - The number of maintenance events matching the query.
 */
async function getMaintenanceEventsCount_API({ instrument_tag, timestamp_min, timestamp_max, user_tag  }) {
    const res = await axios.get(`${config.baseURL}/maintenance/count`, { params: {instrument_tag, timestamp_min, timestamp_max, user_tag } })
    return res.data 
}

export const useGetMaintenanceEventCount = (APIParams = {instrument_tag, timestamp_min, timestamp_max, user_tag}, useQueryOptions = {stateTime : 200000, placeholderData: (prev) => prev}) => {
    return useQuery({
        queryKey: ["getMaintenanceEventsQuery",
            APIParams.instrument_tag,
            APIParams.timestamp_max,
            APIParams.timestamp_min,
            APIParams.user_tag],
        queryFn: () => getMaintenanceEventsCount_API({ ...APIParams }),
        ...useQueryOptions
    });
}


/**
 * @description Return the total maintenance cost for a given instrument.
 * @returns {Number} - The total maintenance costs for the instrument.
 * This is the sum of all costs for all maintenance events for the instrument. 
 */
async function getMaintenanceCosts_API({ instrument_tag, timestamp_min, timestamp_max }) {
    const res = await axios.get(`${config.baseURL}/maintenance/instruments/${instrument_tag}/costs`, { params: {timestamp_min, timestamp_max} })
    return res.data 
}

export const useGetMaintenanceCosts = (APIParams = {instrument_tag, timestamp_min, timestamp_max}, useQueryOptions = {stateTime : 200000}) => {
    return useQuery({
        queryKey: ["getMaintenanceCosts", APIParams.instrument_tag],
        queryFn: () => getMaintenanceCosts_API({...APIParams}),
        ...useQueryOptions
    });
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

export const usePostMaintenanceEvent = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => postMaintenanceEvent_API({...APIParams}),
        ...useMutationOptions
    });
}


/**
 * 
 * @param {Object} props 
 * @param {String} props.maintenance_event_tag  Maintenance event tag
 * @param {String} props.procedure_tag  Procedure tag
 * @description Add procedure to maintenance event. Endpoint: POST '/api/maintenance/{maintenance_event_tag}/procedures/{procedure_tag}' 
 * @returns 
 */
async function postMaintenanceProcedureToMaintenanceEvent_API({ maintenance_event_tag, procedure_tag }) {
    const res = await axios.post(`${config.baseURL}/maintenance/${maintenance_event_tag}/procedures/${procedure_tag}`,
    )
    return res.data 
}   


export const usePostMaintenanceProcedureToMaintenanceEvent = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => postMaintenanceProcedureToMaintenanceEvent_API({...APIParams}),
        ...useMutationOptions
    });
}


/**
 * 
 * @param {Object} props 
 * @param {String} props.maintenance_event_tag  Maintenance event tag
 * @param {String} props.sparepart_tag  Procedure tag
 * @description Add procedure to maintenance event. Endpoint: POST '/api/maintenance/{maintenance_event_tag}/procedures/{sparepart_tag}' 
 * @returns 
 */
async function postSparePartToMaintenanceEvent_API({ maintenance_event_tag, sparepart_tag }) {
    const res = await axios.post(`${config.baseURL}/maintenance/${maintenance_event_tag}/spareparts/${sparepart_tag}`,
    )
    return res.data 
}   


export const usePostSparePartToMaintenanceEvent = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => postSparePartToMaintenanceEvent_API({...APIParams}),
        ...useMutationOptions
    });
}

/**
 * 
 * @param {Object} props 
 * @param {String} props.maintenance_event_tag  Maintenance event tag
 * @param {String} props.sparepart_tag  Spare part tag
 * @description Get the count of a spare part by maintenance event. Endpoint: GET '/api/maintenance/{maintenance_event_tag}/spareparts/{sparepart_tag}/count'
 * @returns {Number} - The count of the spare part in the maintenance event.
 */
async function getSparePartCountByMaintenanceEvent_API({ maintenance_event_tag, sparepart_tag }) {
    const res = await axios.get(`${config.baseURL}/maintenance/${maintenance_event_tag}/spareparts/${sparepart_tag}/count`)
    return res.data
}   


export const useGetSparePartCountByMaintenanceEvent = (APIParams = { maintenance_event_tag, sparepart_tag }, useQueryOptions = { placeholderData : prev => prev }) => {
    return useQuery({
        queryKey: ["getMaintenanceSparePartCount", APIParams.maintenance_event_tag, APIParams.sparepart_tag],
        queryFn: () => getSparePartCountByMaintenanceEvent_API({ ...APIParams }),
        ...useQueryOptions
    });
}

/**
 * 
 * @param {Object} props 
 * @param {String} props.maintenance_event_tag  Maintenance event tag
 * @param {String} props.sparepart_tag  Procedure tag
 * @description Add procedure to maintenance event. Endpoint: POST '/api/maintenance/{maintenance_event_tag}/procedures/{sparepart_tag}' 
 * @returns 
 */
async function deleteSparePartToMaintenanceEvent_API({ maintenance_event_tag, sparepart_tag }) {
    const res = await axios.delete(`${config.baseURL}/maintenance/${maintenance_event_tag}/spareparts/${sparepart_tag}`,
    )
    return res.data 
}   


export const useDeleteSparePartToMaintenanceEvent = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => deleteSparePartToMaintenanceEvent_API({...APIParams}),
        ...useMutationOptions
    });
}





/**
 * @description Delete maintenance procedure of a maintenance event. Endpoint: DELETE '/api/maintenance/{maintenance_event_tag}/procedures/{procedure_tag}'
 * @param {Object} props 
 * @param {String} props.maintenance_event_tag  Maintenance event tag
 * @param {String} props.procedure_tag Maintenance procedure tag
 */
async function deleteProcedureOfMaintenanceEvent_API({ maintenance_event_tag, procedure_tag}) {
    const res = await axios.delete(`${config.baseURL}/maintenance/${maintenance_event_tag}/procedures/${procedure_tag}`,
    )
    return res.data 
}

export const useDeleteMaintenanceProcedureToMaintenanceEvent = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => deleteProcedureOfMaintenanceEvent_API({...APIParams}),
        ...useMutationOptions
    });
}




/**
 * @description Add symptom to maintenance event. Endpoint: POST '/api/maintenance/{maintenance_event_tag}/symtoms/{symptom_tag}'
 * @param {Object} props 
 * @param {String} props.maintenance_event_tag  Maintenance event tag
 * @param {String} props.symptom_tag  Symptom tag
 */
async function postSymptomToMaintenanceEvent_API({ maintenance_event_tag, symptom_tag }) {
    const res = await axios.post(`${config.baseURL}/maintenance/${maintenance_event_tag}/symptoms/${symptom_tag}`,
    )
    return res.data 
}

export const usePostSymptomToMaintenanceEvent = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => postSymptomToMaintenanceEvent_API({...APIParams}),
        ...useMutationOptions
    });
}



/**
 * @description Delete symptom of a maintance event. Endpoint: DELETE '/api/maintenance/{maintenance_event_tag}/symtoms/{symptom_tag}'
 * @param {Object} props 
 * @param {String} props.maintenance_event_tag  Maintenance event tag
 * @param {String} props.symptom_tag  Symptom tag
 */
async function deleteSymptomToMaintenanceEvent_API({ maintenance_event_tag, symptom_tag }) {
    const res = await axios.delete(`${config.baseURL}/maintenance/${maintenance_event_tag}/symptoms/${symptom_tag}`,
    )
    return res.data 
}

export const useDeleteSymptomToMaintenanceEvent = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => deleteSymptomToMaintenanceEvent_API({...APIParams}),
        ...useMutationOptions
    });
}



/**
 * @description Get cost per maintenance event. Endpoint: GET '/api/maintenance/{maintenance_event_tag}/costs'
 * @param {Object} props 
 * @param {String} props.maintenance_event_tag  Maintenance event tag
 */
async function getMaintenanceEventCosts_API({ maintenance_event_tag }) {
    const res = await axios.get(`${config.baseURL}/maintenance/${maintenance_event_tag}/costs`)
    return res.data 
}

export const useGetMaintenanceEventCosts = (APIParams = { maintenance_event_tag }, useQueryOptions = { placeholderData : prev => prev }) => {
    return useQuery({
        queryKey: ["getMaintenanceEventCosts", APIParams.maintenance_event_tag],
        queryFn: () => getMaintenanceEventCosts_API({ ...APIParams }),
        ...useQueryOptions
    });
}   

/**
 * @description
 * @param {Object} props
 * @param {String} props.maintenance_event_tag  Maintenance event tag
 */


async function postExternalServiceToMaintenanceEvent_API({ maintenance_event_tag, external_service_tag }) {
    const res = await axios.post(`${config.baseURL}/maintenance/${maintenance_event_tag}/externalservice/${external_service_tag}`,
    )
    return res.data 
}

export const usePostExternalServiceToMaintenanceEvent = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => postExternalServiceToMaintenanceEvent_API({...APIParams}),
        ...useMutationOptions
    });
}   

/**
 * @description
 * @param {Object} props
 * @param {String} props.maintenance_event_tag
 */

async function deleteExternalServiceFromMaintenanceEvent_API({ maintenance_event_tag, external_service_tag }) {
    const res = await axios.delete(`${config.baseURL}/maintenance/${maintenance_event_tag}/externalservice/${external_service_tag}`,
    )
    return res.data 
}

export const useDeleteExternalServiceFromMaintenanceEvent = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => deleteExternalServiceFromMaintenanceEvent_API({...APIParams}),
        ...useMutationOptions
    });
}   

