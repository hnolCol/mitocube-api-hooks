import { useQuery } from "react-query";
import axios from "axios"
import config from "../../../config";

/**
 * @description Retrieves the color that is associated with the given state. Endpoint: `/api/states/${state}/color`
 * @returns {String} - The color associated with the state in hex code.  
 */
async function getStateColor_API({tag}) {
    const res = await axios.get(`${config.baseURL}/states/${tag}/color`)
    return res.data 
}

export const useGetStateColor = (APIParams = {tag}, useQueryOptions = {staleTime : Infinity}) => {
    return useQuery(["getStateColor", APIParams.tag],() =>  getStateColor_API({...APIParams}), useQueryOptions)
}

