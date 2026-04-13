import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "../axios-setup"
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
    return useQuery({
        queryKey: ["getNewsPermissions"],
        queryFn: () => getNewsPermission_API({...APIParams}),
        ...useQueryOptions
    })
}
