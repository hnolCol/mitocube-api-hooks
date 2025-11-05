import { useQuery, useMutation } from "react-query"
import axios from "axios"
import config from "../../../config";


/**
 * 
 * @param {Object} props 
 * @returns {import("../permissions/types").PermissionResponse} - The permissions for news.
 */
async function getNewsPermission_API({}) {
    const res = await axios.get(`${config.baseURL}/news/permissions`)
    return res.data
}

export const useGetNewsPermissions = (APIParams = {}, useQueryOptions = {}) => {
    return useQuery(["getNewsPermissions"], () => getNewsPermission_API({...APIParams}), useQueryOptions)
}
