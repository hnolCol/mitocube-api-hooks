import { useQuery } from "react-query"
import axios from "axios"
import config from "../../../config"
/**
 * @description Returns the sample names of a submission including the replicate, the index, and the name. It
 * is meant for copying it to Excel (tab separated.)
 * @param {Object} props
 * @param {String} props.tag
 * @returns {string[]} - The submission sample tags. 
 */
async function getSubmissionSampleNames_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/submissions/${tag}/samples`)
    return res.data 
}

export const useGetSubmissionSampleNames = (APIParams = {tag}, useQueryOptions = {}) => {
    return useQuery(["submission_samples", APIParams.tag],
        () => getSubmissionSampleNames_API({ ...APIParams }), useQueryOptions)
}


/**
 * 
 * @param {Object} props 
 * @param {String} props.tag - The submission tag 
 * @param {Number} props.sample_index - The sample index  
 * @returns 
 */
async function deleteSubmissionSample_API({ tag, sample_index }) {
    const res = await axios.delete(`/api/submissions/${tag}/samples/${sample_index}`)
    return res.data 
}
export const useDeleteSample = (APIParams = {}, useQueryOptions = {}) => {
    return 
}




/**
 * @description Returns the number of samples in a submission.
 * @param {Object} props
 * @param {String} props.tag
 * @returns {Number} - The submission sample names. 
 */
async function getSubmissionSampleCount_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/submissions/counts/${tag}/samples`)
    return res.data 
}

export const useGetSubmissionSampleCount= (APIParams = {tag}, useQueryOptions = {}) => {
    return useQuery(["submission_samples_count", APIParams.tag],
        () => getSubmissionSampleCount_API({ ...APIParams }), useQueryOptions)
}
