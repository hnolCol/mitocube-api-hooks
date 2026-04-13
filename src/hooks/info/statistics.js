import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import axios from "../axios-setup";
import config from "../../../config";
/**
 * @description Retrieves the statistics information. Endpoint: '/api/info/statistics/metrics'
 * @returns {Object} The statistics information.
 */
async function getStatisticInfo_API({}) {
    const res = await axios.get(`${config.baseURL}/info/statistics/metrics`)
    return res.data 
}

export const useGetStatisticInfo = (APIParams = {}, useQueryOptions = {staleTime : Infinity}) => {
    return useQuery({
        queryKey: ["getStatisticInfo"],
        queryFn: () => getStatisticInfo_API({...APIParams}),
        ...useQueryOptions
    });
}
