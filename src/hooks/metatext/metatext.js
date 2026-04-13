import axios from "axios"
import { useQuery, useMutation } from "@tanstack/react-query"
import config from "../../../config";



async function getMetatextByTag_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/metatexts/${tag}`)
    return res.data 
}
export const useGetMetatext = (APIParams = {tag}, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["metatextByTag", APIParams.tag],
        queryFn: () => getMetatextByTag_API({...APIParams}),
        ...useQueryOptions
    })
}



/**
 * @description Patch a metatext.
 * @param {Object} props
 * @param {String} props.tag The tag of the metatext to edit
 * @param {String} props.title The new title of the metatext
 * @param {String} props.text The new text of the metatext
 * @returns 
 */
async function patchMetatext_API({tag, title, text}){
    const res = await axios.patch(`${config.baseURL}/metatexts/${tag}`, { title, text })
    return res.data
}

export const usePatchMetatext = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => patchMetatext_API({...APIParams}),
        ...useMutationOptions
    })
}



/**
 * @description Deletes a metatext defined by its tag from the database. 
 * Returns an error if the tag is not found. 
 * @param {Object} props
* @param {String} props.tag The tag of the metatext to delete
 * @returns 
 */
async function deleteMetatext_API({tag}){
    const res = await axios.delete(`${config.baseURL}/metatexts/${tag}`)
    return res.data
}

export const useDeleteMetatext = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => deleteMetatext_API({...APIParams}),
        ...useMutationOptions
    })
}

