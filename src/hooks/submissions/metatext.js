import axios from "../axios-setup"
import { useQuery, useMutation } from "@tanstack/react-query"
import config from "../../../config";

async function getSubmissionMetatexts_API({ }) {
    const res = await axios.get(`${config.baseURL}/submissions/metatext`)
    return res.data 
}
export const useGetMetatext = (APIParams = {}, useQueryOptions = {staleTime : Infinity}) => {
    return useQuery({
        queryKey: ["metatextForSubmissions"],
        queryFn: () => getSubmissionMetatexts_API({...APIParams}),
        ...useQueryOptions
    });
}




async function getSubmissionMetatextTags_API({ submission_tag }) {
    const res = await axios.get(`${config.baseURL}/submissions/${submission_tag}/metatext`)
    return res.data 
}
export const useGetMetatexts = (APIParams = {submission_tag}, useQueryOptions = {staleTime : 300000}) => {
    return useQuery({
        queryKey: ["metatextForSubmissions", APIParams.submission_tag],
        queryFn: () => getSubmissionMetatextTags_API({...APIParams}),
        ...useQueryOptions
    });
}



/**
 * @description Returns a metatext for a given submission (text) by the metatext tag. Endpoint: `/api/submissions/${tag}/metatext/${metatext_tag}`
 * @param {Object} props 
 * @param {String} props.tag - The submission tag 
 * @param {String} props.metatext_tag - The metatext tag 
 * @returns 
 */
async function getSpecificSubmissionMetatextsByTag_API({tag, metatext_tag}) {
    const res = await axios.get(`${config.baseURL}/submissions/${tag}/metatext/${metatext_tag}`)
    return res.data 
}
export const useGetSubmissionMetatextByTag = (APIParams = {tag, metatext_tag}, useQueryOptions = {staleTime : 30000000}) => {
    return useQuery({
        queryKey: ["submissionMetaText", APIParams.tag, APIParams.metatext_tag],
        queryFn: () => getSpecificSubmissionMetatextsByTag_API({ ...APIParams }),
        ...useQueryOptions
    });
}




/**
 * @description Inserts a metatext for a given submission.
 * @param {Object} props
 * @param {String} props.submission_tag The submission tag to add values for
 * @returns 
 */
async function postMetatext_API({submission_tag, title, text}){
    const res = await axios.post(`${config.baseURL}/submissions/${submission_tag}/metatext`, { title, text })
    return res.data
}

export const usePostMetatext = (useMutationOptions = {}) => {
    return useMutation({mutationFn: (APIParams) => postMetatext_API({...APIParams}), ...useMutationOptions})
}


