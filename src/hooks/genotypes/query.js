
import { useQuery } from "react-query"
import _ from "lodash"
import axios from "axios"
import config from "../../../config";

/**
 * Query genotype by search string.
 * @param {Object} props 
 * @param {String} props.search_string - The search string to query genotypes.
 * @param {String} props.proteome_tags - The tags of the proteome to consider. Joined by ';'
 * @returns {String[]} - The genotype tags matching the search string.
 */
async function getGenotypesBySearchString_API({search_string, limit, proteome_tags}) {
    const res = await axios.get(`${config.baseURL}/genotypes/q`, {params: {search_string, limit}})
    return res.data
}

export const useGetGenotypesBySearchString = (APIParams = {search_string, limit, proteome_tags}, useQueryOptions = {}) => {
    return useQuery(["getGenotypesBySearchString", APIParams.search_string, APIParams.limit, _.join(proteome_tags)],() =>  getGenotypesBySearchString_API({...APIParams}), useQueryOptions)
}
