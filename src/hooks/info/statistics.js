import { useQuery } from "@tanstack/react-query";
import _ from "lodash";

export function createStatisticInfoAPI(client) {

    /**
     * @description Retrieves the statistics information. Endpoint: '/api/info/statistics/metrics'
     * @returns {Object} The statistics information.
     */
    async function getStatisticInfo_API({}) {
        const res = await client.get(`/info/statistics/metrics`)
        return res.data 
    }

    const useGetStatisticInfo = (APIParams = {}, useQueryOptions = {staleTime : Infinity}) => {
        return useQuery({
            queryKey: ["getStatisticInfo"],
            queryFn: () => getStatisticInfo_API({...APIParams}),
            ...useQueryOptions
        });
    }

    return {
        useGetStatisticInfo
    };

}