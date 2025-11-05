import axios from "axios"
import { useQuery } from "react-query"


/**
 * @description Get the protein tags that match the search string. Endpoint: /api/features/proteins/q
 * @param {Object} props
 * @param {String} props.search_string - The search string to match protein tags.
 * @param {Number} props.limit - The maximum number of results to return.
 * @returns {String[]} The protein tags.
 */
async function getProteinFeatureByQuery_API({ search_string, limit }) {
    const res = await axios.get(`/api/features/proteins/q`, { params: { search_string, limit } })
    return res.data
}

export function useGetProteinFeatureByQuery(APIParams = {search_string, limit}, useQueryOptions = { }) {
    return useQuery(["proteinFeatures_query",APIParams.search_string, APIParams.limit],() =>  getProteinFeatureByQuery_API({...APIParams}), useQueryOptions)
}