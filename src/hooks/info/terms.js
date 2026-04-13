import { useQuery } from "@tanstack/react-query";
import axios from "../axios-setup"


/**
 * @description Retrieves the use of terms from the backend. Endpoint: '/api/info/terms'
 * @returns {} 
 * @todo Define the return type.
 */
async function getTerms_API({}) {
    const res = await axios.get('/api/info/terms')
    return res.data 
}

export const useGetTermsOfUse = (APIParams = {}, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getTermsOfUse"],
        queryFn: () => getTerms_API({...APIParams}),
        ...useQueryOptions
    });
}


