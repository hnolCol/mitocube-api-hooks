import { useQuery } from "@tanstack/react-query"

export function createQueryUsersByQueryAPI(client) {

    /**
     * @description Returns the public information about the users. Still requires a valid token string. Public indicates here that it is available to all registered users. 
     * @param {Object} props 
     * @param {String} props.query 
     * @returns {String[]} The user tag.
     */
    async function getPublicUsersByQuery_API({ search_string, limit }) {
        const res = await client.get('/users/q', {params : { search_string, limit }})
        return res.data
    }

    const useGetUserByQuery = (APIParams = {search_string, limit}, useQueryOptions = {staleTime: 500000, placeholderData: (prev) => prev ? prev : []}) => {
        return useQuery({
            queryKey: ["getUserQuery", APIParams.search_string, APIParams.limit],
            queryFn: () => getPublicUsersByQuery_API({...APIParams}),
            ...useQueryOptions
        })
    }

    return {
        useGetUserByQuery
    }

}