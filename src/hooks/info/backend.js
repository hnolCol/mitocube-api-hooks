import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import axios from "axios";
import config from "../../../config";

/**
 * @description API Call to get the informationa bout the backend including its name and the description. 
 * @param {Object} props - Placeholder for future props and the keep the queries consistent. Ignored at the moment. 
 * @returns {import("../../types/info").AppInfoAPIResponse} The API response for the information about the backend. 
 */
async function getBackendInfo_API({}) {
    const res = await axios.get(`${config.baseURL}/api/info/app`)
    return res.data 
}

export const useGetBackendInfo = (useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["backendInfo"],
        queryFn: () => getBackendInfo_API({}),
        ...useQueryOptions
    })
}