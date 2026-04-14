import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import config from "../../../config";

/**
 * @description Retrieves the total count of samples for a given instrument tag. 
 * @param {Object} props
 * @param {String} props.tag The instrument tag
 * @returns {Number} - The count of samples for the given instrument tag. 
 */
async function getInstrumentSamplesCount_API({tag}) {
    const res = await axios.get(`${config.baseURL}/instruments/${tag}/samples/count`)
    return res.data 
}

export const useGetInstrumentSamplesCount = (APIParams = {tag}, useQueryOptions = {staleTime : 60000}) => {
    return useQuery({
        queryKey: ["getInstrumentSamplesCount", APIParams.tag],
        queryFn: () => getInstrumentSamplesCount_API({...APIParams}),
        ...useQueryOptions
    });
}
