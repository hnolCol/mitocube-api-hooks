import { useQuery } from "@tanstack/react-query"
import axios from "../axios-setup"
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
    return useQuery({
        queryKey: ["getProteome", APIParams.tag],
        queryFn: () => getProteome_API({...APIParams}),
        ...useQueryOptions
    })
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
    return useQuery({
        queryKey: ["getProteomeText", APIParams.tag],
        queryFn: () => getProteomeText_API({...APIParams}),
        ...useQueryOptions
    })
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
    return useQuery({
        queryKey: ["getProteomeCreatedAt", APIParams.tag],
        queryFn: () => getProteomeCreatedAt_API({...APIParams}),
        ...useQueryOptions
    })
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
    return useQuery({
        queryKey: ["getProteomeIsUpdating", APIParams.tag],
        queryFn: () => getProteomeIsUpdating_API({...APIParams}),
        ...useQueryOptions
    })
}
