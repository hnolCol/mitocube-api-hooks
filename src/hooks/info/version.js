import { useQuery } from "@tanstack/react-query";
import axios from "../axios-setup";

/**
 * @description Retrieves the version of the backend. Endpoint: '/api/info/version'
 * @returns {String} The version string as X.X.XX
 */
async function getVersion_API({}) {
    const res = await axios.get('/api/info/version')
    return res.data 
}

export const useGetBackendVersion = (APIParams = {}, useQueryOptions = {staleTime : Infinity}) => {
    return useQuery({
        queryKey: ["getVersion"],
        queryFn: () => getVersion_API({...APIParams}),
        ...useQueryOptions
    });
}


