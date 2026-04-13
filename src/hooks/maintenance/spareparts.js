import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "../axios-setup";
import config from "../../../config";

/**
 * @description Finds a sparepart by its search string.
 * @returns {String[]} - The tags matching the search string. 
 */
async function getSparePartByQuery_API({search_string, limit}) {
    const res = await axios.get(`${config.baseURL}/maintenance/spareparts/q`, { params: { search_string, limit } })
    return res.data 
}

export const useGetSparePartByQuery = (APIParams = {search_string : "", limit : 10 }, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getSparePartBySearchString", APIParams.search_string, APIParams.limit],
        queryFn: () => getSparePartByQuery_API({...APIParams}),
        ...useQueryOptions
    });
}


/**
 * @description  Returns a sparepart by its tag. 
 * @returns {String[]} - The tags matching the search string. 
 */
async function getSparePartByTag_API({tag}) {
    const res = await axios.get(`${config.baseURL}/maintenance/spareparts/${tag}`)
    return res.data 
}

export const useGetSparePartByTag = (APIParams = { tag: "" }, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getSparePartByTag", APIParams.tag],
        queryFn: () => getSparePartByTag_API({...APIParams}),
        ...useQueryOptions
    });
}

/**
 * @description Returns the text of a sparepart.
 * @returns {String}
 */
async function getSparePartText_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/maintenance/spareparts/${tag}/text`)
    return res.data
}

export const useGetSparePartText = (APIParams = { tag }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getSparePartText", APIParams.tag],
        queryFn: () => getSparePartText_API({ ...APIParams }),
        ...useQueryOptions
    });
}

/**
 * @description Returns the description of a sparepart.
 * @returns {String}
 */
async function getSparePartDescription_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/maintenance/spareparts/${tag}/description`)
    return res.data
}

export const useGetSparePartDescription = (APIParams = { tag }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getSparePartDescription", APIParams.tag],
        queryFn: () => getSparePartDescription_API({ ...APIParams }),
        ...useQueryOptions
    });
}

/**
 * @description Returns the company of a sparepart.
 * @returns {String}
 */
async function getSparePartCompany_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/maintenance/spareparts/${tag}/company`)
    return res.data
}

export const useGetSparePartCompany = (APIParams = { tag }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getSparePartCompany", APIParams.tag],
        queryFn: () => getSparePartCompany_API({ ...APIParams }),
        ...useQueryOptions
    });
}

/**
 * @description Returns the product ID of a sparepart.
 * @returns {String}
 */
async function getSparePartProductID_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/maintenance/spareparts/${tag}/product_id`)
    return res.data
}

export const useGetSparePartProductID = (APIParams = { tag }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getSparePartProductID", APIParams.tag],
        queryFn: () => getSparePartProductID_API({ ...APIParams }),
        ...useQueryOptions
    });
}

/**
 * @description Returns the price of a sparepart.
 * @returns {Number}
 */
async function getSparePartPrice_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/maintenance/spareparts/${tag}/price`)
    return res.data
}

export const useGetSparePartPrice = (APIParams = { tag }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getSparePartPrice", APIParams.tag],
        queryFn: () => getSparePartPrice_API({ ...APIParams }),
        ...useQueryOptions
    });
}

/**
 * @description Returns the  link of a sparepart.
 * @returns {String}
 */
async function getSparePartLink_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/maintenance/spareparts/${tag}/link`)
    return res.data
}

export const useGetSparePartLink = (APIParams = { tag }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getSparePartLink", APIParams.tag],
        queryFn: () => getSparePartLink_API({ ...APIParams }),
        ...useQueryOptions
    });
}

/**
 * @description Creates a new sparepart.
 * @returns {Boolean}
 */
async function postSparePart_API({ text, description, company, product_id, price, link }) {
    const res = await axios.post(`${config.baseURL}/maintenance/spareparts/`, { text, description, company, product_id, price, link })
    return res.data
}

export const usePostSparePart = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => postSparePart_API({ ...APIParams }),
        ...useMutationOptions
    });
}


/**
 * @description Updates an existing sparepart.
 * @returns {Boolean}
 */
async function updateSparePart_API({ tag, text, description, company, product_id, price, link }) {
    const res = await axios.put(`${config.baseURL}/maintenance/spareparts/${tag}`, { tag, text, description, company, product_id, price, link })
    return res.data
}

export const useUpdateSparePart = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => updateSparePart_API({ ...APIParams }),
        ...useMutationOptions
    });
}


/**
 * @description Deletes a sparepart.
 * @returns {Boolean}
 */
async function deleteSparePart_API({ tag }) {
    const res = await axios.delete(`${config.baseURL}/maintenance/spareparts/${tag}`)
    return res.data
}

export const useDeleteSparePart = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => deleteSparePart_API({ ...APIParams }),
        ...useMutationOptions
    });
}


