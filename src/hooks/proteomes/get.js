import { useQuery } from "react-query"
import axios from "axios"
import config from "../../../config";


/**
 *  Get a proteome by its tag
 * @param {Object} props 
 * @param {Number} props.tag The proteome tag
 * @returns {}
 */
async function getProteome_API({tag}) {
    const res = await axios.get(`${config.baseURL}/proteomes/${tag}`)
    return res.data
}

export const useGetProteome = (APIParams = {tag}, useQueryOptions = {}) => {
    return useQuery(["getProteome", APIParams.tag],() =>  getProteome_API({...APIParams}), useQueryOptions)
}


/**
 *  Get a proteome by its tag
 * @param {Object} props 
 * @param {Number} props.tag The proteome tag
 * @returns {}
 */
async function getProteomeText_API({tag}) {
    const res = await axios.get(`${config.baseURL}/proteomes/${tag}/text`)
    return res.data
}

export const useGetProteomeText = (APIParams = {tag}, useQueryOptions = {}) => {
    return useQuery(["getProteomeText", APIParams.tag],() =>  getProteomeText_API({...APIParams}), useQueryOptions)
}



/**
 *  Get a proteome by its tag
 * @param {Object} props 
 * @param {Number} props.tag The proteome tag
 * @returns {}
 */
async function getProteomeCreatedAt_API({tag}) {
    const res = await axios.get(`${config.baseURL}/proteomes/${tag}/created_at`)
    return res.data
}

export const useGetProteomeCreatedAt = (APIParams = {tag}, useQueryOptions = {}) => {
    return useQuery(["getProteomeCreatedAt", APIParams.tag],() =>  getProteomeCreatedAt_API({...APIParams}), useQueryOptions)
}



/**
 *  Get if a proteome is currently updating
 * @param {Object} props 
 * @param {Number} props.tag The proteome tag
 * @returns {}
 */
async function getProteomeIsUpdating_API({tag}) {
    const res = await axios.get(`${config.baseURL}/proteomes/${tag}/is_updating`)
    return res.data
}

export const useGetProteomeIsUpdating = (APIParams = {tag}, useQueryOptions = {}) => {
    return useQuery(["getProteomeIsUpdating", APIParams.tag],() =>  getProteomeIsUpdating_API({...APIParams}), useQueryOptions)
}
