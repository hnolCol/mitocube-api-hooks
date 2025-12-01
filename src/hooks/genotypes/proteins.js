import { useQuery } from "react-query"
import _ from "lodash"
import axios from "axios"
import config from "../../../config"; 

/**
 * Query genotype Proteins by its tag 
 * @param {Object} props 
 * @param {String} props.genotype_tag - The unique genotype tag.
 * @returns {Object} - The genotyple Proteins matching the tag. 
 */

async function getGenotypeProteins_API({ genotype_tag }) {
    const res = await axios.get(`${config.baseURL}/genotypes/${genotype_tag}/Proteins`)
    return res.data
}

export const useGetGenotypeProteins = (APIParams = { genotype_tag }, useQueryOptions = {}) => {
    return useQuery(["getGenotypeProteins", APIParams.genotype_tag],() => getGenotypeProteins_API({ ...APIParams }),useQueryOptions)
}
