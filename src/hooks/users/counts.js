import { useQuery } from "@tanstack/react-query"

export function createQueryUserCountAPI(client) {

    /**
     * @description Retrieves the number of users in the database. Endpoint: `/api/users/count`
     * @param {Object} props 
     * @returns {Number} The count of users in the database.
     */
    async function getUserCount_API({ exclude_inactive }) {
        const res = await client.get("/users/count", { params: { exclude_inactive } })
        return res.data
    }

    const useGetUserCount = (APIParams = {exclude_inactive : true}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getUserCount", APIParams.exclude_inactive],
            queryFn: () => getUserCount_API({...APIParams}),
            ...useQueryOptions
        })
    }

    return {
        useGetUserCount
    };
}   
