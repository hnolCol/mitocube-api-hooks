import { useQuery, useMutation } from "react-query"
import axios from "axios"
import config from "../../../config";


/**
 *  Get the number of proteomes available
 * @param {Object} props 
 * @returns {}
 */
async function getProteomeCount_API() {
    const res = await axios.get(`${config.baseURL}/proteomes/count`)
    return res.data
}

export const useGetProteomeCount = (APIParams = {}, useQueryOptions = {}) => {
    return useQuery(["getProteomeCount",],() =>  getProteomeCount_API({...APIParams}), useQueryOptions)
}




/**
 *  Get the number of proteins in a proteome
 * @param {Object} props 
 * @param {String} props.tag The proteome tag
 * @returns {}
 */
async function getProteomeProteinCount_API({tag}) {
    const res = await axios.get(`${config.baseURL}/proteomes/${tag}/proteins/count`)
    return res.data
}

export const useGetProteomeProteinCount = (APIParams = {tag}, useQueryOptions = {}) => {
    return useQuery(["getProteomeProteinCount",APIParams.tag],() =>  getProteomeProteinCount_API({...APIParams}), useQueryOptions)
}
