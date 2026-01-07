import { useQuery, useMutation } from "react-query";
import axios from "axios";
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
    return useQuery(["getExternalServiceByTag", APIParams.tag], () => getExternalServiceByTag_API({...APIParams}), useQueryOptions)
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
    return useQuery(["getExternalServiceBySearchString", APIParams.search_string],() =>  getExternalServiceByQuery_API({...APIParams}), useQueryOptions)
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
    return useMutation((APIParams) => postExternalService_API({ ...APIParams}), useMutationOptions)
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
    return useMutation((APIParams) => updateExternalService_API({ ...APIParams}), useMutationOptions)
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
    return useMutation((APIParams) => deleteExternalService_API({ ...APIParams}), useMutationOptions)
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
    return useQuery(["getExternalServiceDescription", APIParams.tag], () => getExternalServiceDescription_API({ ...APIParams }), useQueryOptions)
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
    return useQuery(["getExternalServiceName", APIParams.tag], () => getExternalServiceName_API({ ...APIParams }), useQueryOptions)
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
    return useQuery(["getExternalServiceCompany", APIParams.tag], () => getExternalServiceCompany_API({ ...APIParams }), useQueryOptions)
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
    return useQuery(["getExternalServiceEmail", APIParams.tag], () => getExternalServiceEmail_API({ ...APIParams }), useQueryOptions)
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
    return useQuery(["getExternalServiceCosts", APIParams.tag], () => getExternalServiceCosts_API({ ...APIParams }), useQueryOptions)
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
    return useQuery(["getExternalServiceBillingNumber", APIParams.tag], () => getExternalServiceBillingNumber_API({ ...APIParams }), useQueryOptions)
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
    return useQuery(["getExternalServiceInternalID", APIParams.tag], () => getExternalServiceInternalID_API({ ...APIParams }), useQueryOptions)
}