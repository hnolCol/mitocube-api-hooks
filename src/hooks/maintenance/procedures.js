import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import config from "../../../config";

/**
 * @description Finds a procedure by its search string.
 * @returns {String[]} - The tags matching the search string. 
 */
async function getMaintenanceProcedureByQuery_API({search_string, limit}) {
    const res = await axios.get(`${config.baseURL}/maintenance/procedures/q`, { params: { search_string, limit } })
    return res.data 
}

export const useGetMaintenanceProcedureByQuery = (APIParams = {search_string : "", limit : 10}, useQueryOptions = {stateTime : 200000, placeholderData: (prev) => prev}) => {
    return useQuery({
        queryKey: ["getProcedureBySearchString", APIParams.search_string],
        queryFn: () => getMaintenanceProcedureByQuery_API({...APIParams}),
        ...useQueryOptions
    });
}


/**
 * @description  Returns a procedure by its tag. 
 * @returns {Object} - The tags matching the search string. 
 */
async function getSProcedureByTag_API({procedure_tag}) {
    const res = await axios.get(`${config.baseURL}/maintenance/procedures/${procedure_tag}`)
    return res.data 
}

export const useGetMaintenanceProcedureByTag = (APIParams = { procedure_tag }, useQueryOptions = {stateTime : 200000}) => {
    return useQuery({
        queryKey: ["getProcedureByTag", APIParams.procedure_tag],
        queryFn: () => getSProcedureByTag_API({...APIParams}),
        ...useQueryOptions
    });
}

/**
 * @description Checks if theProcedure exists.
 * @returns {Boolean} - If theProcedure exists. 
 */
async function checkMaintenanceProcedureExists_API({ procedure_tag }) {
    const res = await axios.get(`${config.baseURL}/maintenance/procedures/${procedure_tag}/exists`)
    return res.data 
}

export const useCheckMaintenanceProcedureExists = (APIParams = { procedure_tag }, useQueryOptions = {stateTime : 200000}) => {
    return useQuery({
        queryKey: ["checkMaintenanceProcedureExists", APIParams.procedure_tag],
        queryFn: () => checkMaintenanceProcedureExists_API({...APIParams}),
        ...useQueryOptions
    });
}

/** 
 * @description Returns all MaintenanceProcedures.
 * @returns  - The list of MaintenanceProcedures. 
 */

async function getMaintenanceProcedures_API() {
    const res = await axios.get(`${config.baseURL}/maintenance/procedures`);
    return res.data;
}
export const useGetMaintenanceProcedures = (useQueryOptions = { staleTime: 30000 }) => {
    return useQuery({
        queryKey: ["getMaintenanceProcedures"],
        queryFn: () => getMaintenanceProcedures_API(),
        ...useQueryOptions
    });
}


/**
 * @description Returns the MaintenanceProcedure text .
 * @returns  - The MaintenanceProcedure texts.
 */

async function getMaintenanceProcedureText_API({ procedure_tag }) {
    const res = await axios.get(`${config.baseURL}/maintenance/procedures/${procedure_tag}/text`); 
    return res.data;
}
export const useGetMaintenanceProcedureText = (APIParams={procedure_tag},useQueryOptions = { staleTime: 30000 }) => {
    return useQuery({
        queryKey: ["getMaintenanceProcedureText", APIParams.procedure_tag],
        queryFn: () => getMaintenanceProcedureText_API({...APIParams}),
        ...useQueryOptions
    });
}

/**
 * @description Returns the MaintenanceProcedure descriptions for all MaintenanceProcedures.
 * @returns  - The MaintenanceProcedure descriptions.        
 */
async function getMaintenanceProcedureDescription_API({ procedure_tag }) {
    const res = await axios.get(`${config.baseURL}/maintenance/procedures/${procedure_tag}/description`); 
    return res.data;
}
export const useGetMaintenanceProcedureDescription = (APIParams= {procedure_tag}, useQueryOptions = { staleTime: 30000 }) => {
    return useQuery({
        queryKey: ["getMaintenanceProcedureDescription", APIParams.procedure_tag],
        queryFn: () => getMaintenanceProcedureDescription_API({...APIParams}),
        ...useQueryOptions
    });        
}

/**
 * @description Returns the MaintenanceProcedure priorities for all MaintenanceProcedures.
 * @returns  - The MaintenanceProcedure priorities.              
 */
async function getMaintenanceProcedurePriority_API({ procedure_tag }) {
    const res = await axios.get(`${config.baseURL}/maintenance/procedures/${procedure_tag}/priority`); 
    return res.data;
}
export const useGetMaintenanceProcedurePriority = (APIParams= {procedure_tag},useQueryOptions = { staleTime: 30000 }) => {
    return useQuery({
        queryKey: ["getMaintenanceProcedurePriority", APIParams.procedure_tag],
        queryFn: () => getMaintenanceProcedurePriority_API({...APIParams}),
        ...useQueryOptions
    });        
}

/**
 * @description Inserts a new MaintenanceProcedure.
 * @returns {Boolean} - If the insertion was successful. 
 */
async function postMaintenanceProcedure_API({  text, description, priority }) {
    const res = await axios.post(`${config.baseURL}/maintenance/procedures/`, { text, description,  priority })
    return res.data 
}

export const usePostMaintenanceProcedure = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => postMaintenanceProcedure_API({ ...APIParams }),
        ...useMutationOptions
    });
}

/**
 * @description Edits an existing MaintenanceProcedure.
 * @returns {Boolean} - If the editing was successful. 
 */
async function editMaintenanceProcedure_API({ tag, text, description, priority }) {
    const res = await axios.put(`${config.baseURL}/maintenance/procedures/${tag}`, { tag, text, description, priority })
    return res.data 
}

export const useEditMaintenanceProcedure = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => editMaintenanceProcedure_API({ ...APIParams }),
        ...useMutationOptions
    });
}

/**
 * @description Deletes an existing MaintenanceProcedure.
 * @returns {Boolean} - If the deletion was successful.    
 */
async function deleteMaintenanceProcedure_API({ procedure_tag }) {
    const res = await axios.delete(`${config.baseURL}/maintenance/procedures/${procedure_tag}`)
    return res.data 
}

export const useDeleteMaintenanceProcedure = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => deleteMaintenanceProcedure_API({ ...APIParams }),
        ...useMutationOptions
    });
}


