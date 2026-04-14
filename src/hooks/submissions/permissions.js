import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import config from "../../../config";


/**
 * Fetch specific submission permissions from the API.
 * @param {Object} param0 - The parameters for the API request.
 * @param {string} param0.tag - The tag of the submission.
 * @returns {import("../permissions/types").PermissionResponse} - The permissions for the submission.
 */
async function getSpecificSubmissionPermissions_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/submissions/${tag}/permissions`)
    return res.data 
}
export const useGetSubmissionPermissionsByTag = (APIParams = {tag}, useQueryOptions = {staleTime : 30000}) => {
    return useQuery({
        queryKey: ["permissionsForSubmissions", APIParams.tag],
        queryFn: () => getSpecificSubmissionPermissions_API({...APIParams}),
        ...useQueryOptions
    })
}




/**
 * Fetch submission permissions from the API. For example, if user can create or download a submission or comment on submissions. 
 * @param {Object} props - The parameters for the API request.
 * @returns {import("../permissions/types").PermissionResponse} - The permissions for the submission.
 */
async function getSubmissionPermissions_API({}) {
    const res = await axios.get(`${config.baseURL}/submissions/permissions`)
    return res.data 
}
export const useGetSubmissionPermissions = (APIParams = {}, useQueryOptions = {staleTime : 30000}) => {
    return useQuery({
        queryKey: ["permissionsForSubmissions"],
        queryFn: () => getSubmissionPermissions_API({...APIParams}),
        ...useQueryOptions
    })
}

