import { useQuery } from "react-query"
import axios from "axios"
import config from "../../../config"

/**
 * @description Returns the attribute count in the database.
 * @returns {Number} The total count in the database.
 */
async function getAttributeCount_API({  }) {
    const res = await axios.get(`${config.baseURL}/attributes/count`)
    return res.data 
}

export const useGetAttributeCount = (APIParams = {}, useQueryOptions = { staleTime: 300000 }) => {
    return useQuery(["getAttributeCount"],
        () => getAttributeCount_API({ ...APIParams }), useQueryOptions)
}