
import { useQuery } from "react-query"
import _ from "lodash"
import axios from "axios"
import config from "../../../config";
/**
 * Query genotype by search string.
 * @param {Object} props 
 * @param {String} props.search_string - The search string to query genotypes.
 * @returns {String[]} - The genotype tags matching the search string.
 */
async function getGenotypesBySearchString_API({search_string, user_tag, limit}) {
    const res = await axios.get(`${config.baseURL}/genotypes/q`, {params: {search_string, user_tag, limit}})
    return res.data
}

export const useGetGenotypesBySearchString = (APIParams = {search_string, user_tag, limit}, useQueryOptions = {}) => {
    return useQuery(["getGenotypesBySearchString", APIParams.search_string, APIParams.user_tag, APIParams.limit],() =>  getGenotypesBySearchString_API({...APIParams}), useQueryOptions)
}

