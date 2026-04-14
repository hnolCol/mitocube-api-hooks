import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import config from "../../../config";
/**
 *  Get a proteome by its tag
 * @param {Object} props 
 * @param {Number} props.tag The proteome tag
 * @returns {import("../permissions/types").PermissionResponse}
 */
async function getProteomePermissions_API({}) {
    const res = await axios.get(`${config.baseURL}/proteomes/permissions`)
    return res.data
}

export const useGetProteomePermissions = (APIParams = {}, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getProteomePermissions"],
        queryFn: () => getProteomePermissions_API({...APIParams}),
        ...useQueryOptions
    })
}
