

import { useQuery } from "@tanstack/react-query"

export function createBackendInfoAPI(client) {
    /**
     * @description API Call to get the informationa bout the backend including its name and the description. 
     * @param {Object} props - Placeholder for future props and the keep the queries consistent. Ignored at the moment. 
     * @returns {import("../../types/info").AppInfoAPIResponse} The API response for the information about the backend. 
     */
    async function getBackendInfo_API({ }) {
        const res = await client.get(`/info/app`)
        return res.data
    }

    const useGetBackendInfo = (useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["backendInfo"],
            queryFn: () => getBackendInfo_API({}),
            ...useQueryOptions
        })
    }



    /**
     * @description Retrieves the version of the backend. Endpoint: '/api/info/version'
     * @returns {String} The version string as X.X.XX
     */
    async function getVersion_API({ }) {
        const res = await client.get('/info/version')
        return res.data
    }

    const useGetBackendVersion = (APIParams = {}, useQueryOptions = { staleTime: Infinity }) => {
        return useQuery({
            queryKey: ["getVersion"],
            queryFn: () => getVersion_API({ ...APIParams }),
            ...useQueryOptions
        });
    }
    return {
        useGetBackendInfo,
        useGetBackendVersion
    }
}


