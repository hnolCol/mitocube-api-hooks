import { useQuery } from "react-query"
import axios from "axios"

/**
 * @description Retrieves the number of users in the database. Endpoint: `/api/users/count`
 * @param {Object} props 
 * @returns {Number} The count of users in the database.
 */
async function getUserCount_API({ exclude_inactive }) {
    const res = await axios.get("/api/users/count", { params: { exclude_inactive } })
    return res.data
}

export const useGetUserCount = (APIParams = {exclude_inactive : true}, useQueryOptions = {}) => {
    return useQuery(["getUserCount"], () => getUserCount_API({...APIParams}), useQueryOptions)
}
