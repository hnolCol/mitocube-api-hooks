import axios from "axios"
import { useQuery, useMutation } from "react-query"
import config from "../../../config";



async function getResearchAim_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/submissions/${tag}/researchaim`)
    return res.data 
}
export const useGetResearchAim = (APIParams = {tag}, useQueryOptions = {}) => {
    return useQuery(["researchAimByTag", APIParams.tag], () => getResearchAim_API({...APIParams}), useQueryOptions)
}




/**
 * @description Inserts the research aim for a given submission.
 * @param {Object} props
 * @param {String} props.submission_tag The submission tag to add values for
 * @returns 
 */
async function postResearchAim_API({submission_tag, research_aim}){
    const res = await axios.post(`${config.baseURL}/submissions/${submission_tag}/researchaim`, { research_aim })
    return res.data
}

export const usePostResearchAim = (useMutationOptions = {}) => {
    return useMutation((APIParams) => postResearchAim_API({...APIParams}), useMutationOptions)
}



/**
 * @description Updates the research aim for a given submission.
 * @param {Object} props
 * @param {String} props.submission_tag The submission tag to update values for
 * @returns 
 */
async function patchResearchAim_API({submission_tag, research_aim}){
    const res = await axios.patch(`${config.baseURL}/submissions/${submission_tag}/researchaim`, { research_aim })
    return res.data
}

export const usePatchResearchAim = (useMutationOptions = {}) => {
    return useMutation((APIParams) => patchResearchAim_API({...APIParams}), useMutationOptions)
}
