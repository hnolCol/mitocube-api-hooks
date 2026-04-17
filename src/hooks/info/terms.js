import { useQuery } from "@tanstack/react-query";

export function createTermsOfUseAPI(client) {


    /**
     * @description Retrieves the use of terms from the backend. Endpoint: '/api/info/terms'
     * @returns {} 
     * @todo Define the return type.
     */
    async function getTerms_API({}) {
        const res = await client.get('/info/terms')
        return res.data 
    }

    const useGetTermsOfUse = (APIParams = {}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getTermsOfUse"],
            queryFn: () => getTerms_API({...APIParams}),
            ...useQueryOptions
        });
    }


    return {
        useGetTermsOfUse
    };

}   