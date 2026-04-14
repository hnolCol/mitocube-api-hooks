
import { useQuery } from "@tanstack/react-query"


export function createStateAPI(client) {

    /**
     * @description Retrieves the name that is associated with the given state (Number). Endpoint: `/api/states/${state}/name`
     * @returns {String} - The name associated with the state in hex code.  
     */
    async function getStateName_API({tag}) {
    const res = await client.get(`/states/${tag}/name`)
    return res.data 
    }

    const useGetStateName = (APIParams = {tag}, useQueryOptions = {staleTime : Infinity}) => {
    return useQuery({
        queryKey: ["getStateName", APIParams.tag],
        queryFn: () => getStateName_API({...APIParams}),
        ...useQueryOptions
    })
    }

    /**
     * @description Retrieves the color that is associated with the given state. Endpoint: `/api/states/${state}/color`
     * @returns {String} - The color associated with the state in hex code.  
     */
    async function getStateColor_API({tag}) {
    const res = await client.get(`/states/${tag}/color`)
    return res.data 
    }

    const useGetStateColor = (APIParams = {tag}, useQueryOptions = {staleTime : Infinity}) => {
    return useQuery({
        queryKey: ["getStateColor", APIParams.tag],
        queryFn: () => getStateColor_API({...APIParams}),
        ...useQueryOptions
    })
    }

  return {
    useGetStateName,
    useGetStateColor
  };
}
