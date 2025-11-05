import { useQuery } from "react-query"
import axios from "axios"
import config from "../../../config";
/**
 * @description Retrieves the sample information by its tag. 
 * @param {Object} props
 * @param {String} props.tag  The tag of the sample
 * @returns {Object} The sample information.
 */
async function getSampleInfo_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/samples/${tag}`)
    return res.data
}

export const useGetSample = (APIParams = {tag}, useQueryOptions = {staleTime : 3000000}) => {
    return useQuery(["getSampleInfo", APIParams.tag], () => getSampleInfo_API({...APIParams}), useQueryOptions)
}



/**
 * @description Retrieves the sample condition application. 
 * @param {Object} props
 * @param {String} props.tag  The tag of the sample
 * @returns {String[]} The tags of the condition application for the sample.
 */
async function getSampleConditionApplication_API({ tag, group_by_attribute}) {
    const res = await axios.get(`${config.baseURL}/samples/${tag}/ca`, { params: { group_by_attribute } } )
    return res.data
}

export const useGetSampleConditionApplications = (APIParams = {tag, group_by_attribute : false}, useQueryOptions = {staleTime : 3000000}) => {
    return useQuery(["getSampleConditionApplications", APIParams.tag, APIParams.group_by_attribute], () => getSampleConditionApplication_API({...APIParams}), useQueryOptions)
}
