import { useQuery } from "@tanstack/react-query";

export function createGetInstrumentSamplesCountAPI(client) {

    /**
     * @description Retrieves the total count of samples for a given instrument tag. 
     * @param {Object} props
     * @param {String} props.tag The instrument tag
     * @returns {Number} - The count of samples for the given instrument tag. 
     */
    async function getInstrumentSamplesCount_API({tag}) {
        const res = await client.get(`/instruments/${tag}/samples/count`)
        return res.data 
    }

    const useGetInstrumentSamplesCount = (APIParams = {tag}, useQueryOptions = {staleTime : 60000}) => {
        return useQuery({
            queryKey: ["getInstrumentSamplesCount", APIParams.tag],
            queryFn: () => getInstrumentSamplesCount_API({...APIParams}),
            ...useQueryOptions
        });
    }

    return {
        useGetInstrumentSamplesCount
    }       
    
}