import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "../axios-setup";
import config from "../../../config";

/**
 * @description Get external service by tag.
 * @returns {string[]} - The external service matching the tag. 
 */

async function getExternalServiceByTag_API({tag}) {
    const res = await axios.get(`${config.baseURL}/maintenance/externalservice/${tag}`)
    return res.data
}

export const useGetExternalServiceByTag = (APIParams = {tag: ""}, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getExternalServiceByTag", APIParams.tag],
        queryFn: () => getExternalServiceByTag_API({...APIParams}),
        ...useQueryOptions
    });
} 

/**
 * @description
 * @returns {string[]} - The External Service matching the query.
 */

async function getExternalServiceByQuery_API({search_string, limit}) {
    const res = await axios.get(`${config.baseURL}/maintenance/externalservice/q`, { params: { search_string, limit } })
    return res.data 
}

export const useGetExternalServiceByQuery = (APIParams = {search_string : "", limit : 10}, useQueryOptions = {stateTime : 200000, placeholderData: (prev) => prev}) => {
    return useQuery({
        queryKey: ["getExternalServiceBySearchString", APIParams.search_string],
        queryFn: () => getExternalServiceByQuery_API({...APIParams}),
        ...useQueryOptions
    });
}
/**
 * @description Creates a new External Service.
 * @returns {Boolean}
 */
async function postExternalService_API({ description, name, company, email, costs , billing_number, internal_id, maintenance_event_tag }) {
    const res = await axios.post(`${config.baseURL}/maintenance/externalservice/`, { description, name, company, email, costs, billing_number, internal_id, maintenance_event_tag })
    return res.data
}

export const usePostExternalService = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => postExternalService_API({ ...APIParams }),
        ...useMutationOptions
    });
}


/**
 * @description Updates an existing External Service.
 * @returns {Boolean}
 */
async function updateExternalService_API({ tag, description, name, company, email, costs, billing_number, internal_id }) {
    const res = await axios.put(`${config.baseURL}/maintenance/externalservice/${tag}`, { tag, description, name, company, email, costs, billing_number, internal_id })
    return res.data
}

export const useUpdateExternalService = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => updateExternalService_API({ ...APIParams }),
        ...useMutationOptions
    });
}


/**
 * @description Deletes a ExternalService.
 * @returns {Boolean}
 */
async function deleteExternalService_API({ tag }) {
    const res = await axios.delete(`${config.baseURL}/maintenance/externalservice/${tag}`)
    return res.data
}

export const useDeleteExternalService = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => deleteExternalService_API({ ...APIParams }),
        ...useMutationOptions
    });
}


/**
 * @description Returns the description of an external service.
 * @returns {String}
 */
async function getExternalServiceDescription_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/maintenance/externalservice/${tag}/description`)
    return res.data
}

export const useGetExternalServiceDescription = (APIParams = { tag }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getExternalServiceDescription", APIParams.tag],
        queryFn: () => getExternalServiceDescription_API({ ...APIParams }),
        ...useQueryOptions
    });
}

/**
 * @description Returns the name of the person 
 * @returns {String}
 */
async function getExternalServiceName_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/maintenance/externalservice/${tag}/name`)
    return res.data
}

export const useGetExternalServiceName = (APIParams = { tag }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getExternalServiceName", APIParams.tag],
        queryFn: () => getExternalServiceName_API({ ...APIParams }),
        ...useQueryOptions
    });
}

/**
 * @description Returns the name of the company 
 * @returns {String}
 */
async function getExternalServiceCompany_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/maintenance/externalservice/${tag}/company`)
    return res.data
}

export const useGetExternalServiceCompany = (APIParams = { tag }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getExternalServiceCompany", APIParams.tag],
        queryFn: () => getExternalServiceCompany_API({ ...APIParams }),
        ...useQueryOptions
    });
}

/**
 * @description Returns the email of the contact person
 * @returns {String}
 */
async function getExternalServiceEmail_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/maintenance/externalservice/${tag}/email`)
    return res.data
}

export const useGetExternalServiceEmail = (APIParams = { tag }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getExternalServiceEmail", APIParams.tag],
        queryFn: () => getExternalServiceEmail_API({ ...APIParams }),
        ...useQueryOptions
    });
}

/**
 * @description Returns the costs of the service
 * @returns {Float | int}
 */
async function getExternalServiceCosts_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/maintenance/externalservice/${tag}/costs`)
    return res.data
}

export const useGetExternalServiceCosts = (APIParams = { tag }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getExternalServiceCosts", APIParams.tag],
        queryFn: () => getExternalServiceCosts_API({ ...APIParams }),
        ...useQueryOptions
    });
}

/**
 * @description Returns the billing number of the service
 * @returns {String}
 */

async function getExternalServiceBillingNumber_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/maintenance/externalservice/${tag}/billing_number`)
    return res.data
}

export const useGetExternalServiceBillingNumber = (APIParams = { tag }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getExternalServiceBillingNumber", APIParams.tag],
        queryFn: () => getExternalServiceBillingNumber_API({ ...APIParams }),
        ...useQueryOptions
    });
}

/**
 * @description Returns the internal ID of the service
 * @returns {String}
 */

async function getExternalServiceInternalID_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/maintenance/externalservice/${tag}/internal_id`)
    return res.data
}

export const useGetExternalServiceInternalID = (APIParams = { tag }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getExternalServiceInternalID", APIParams.tag],
        queryFn: () => getExternalServiceInternalID_API({ ...APIParams }),
        ...useQueryOptions
    });
}