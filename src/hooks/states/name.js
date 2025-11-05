import { useQuery } from "react-query";
import axios from "axios";
import config from "../../../config";

/**
 * @description Retrieves the name that is associated with the given state (Number). Endpoint: `/api/states/${state}/name`
 * @returns {String} - The name associated with the state in hex code.  
 */
async function getStateName_API({tag}) {
    const res = await axios.get(`${config.baseURL}/states/${tag}/name`)
    return res.data 
}

export const useGetStateName = (APIParams = {tag}, useQueryOptions = {staleTime : Infinity}) => {
    return useQuery(["getStateName", APIParams.tag],() =>  getStateName_API({...APIParams}), useQueryOptions)
}

