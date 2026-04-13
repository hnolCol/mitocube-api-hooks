import { useQuery } from "@tanstack/react-query"
import _ from "lodash"
import axios from "../axios-setup"
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
    return useQuery({
        queryKey: ["getGenotypeProteins", APIParams.genotype_tag],
        queryFn: () => getGenotypeProteins_API({ ...APIParams }),
        ...useQueryOptions
    });
}


/**
 * Query genotype Proteome by its tag
 * @param {Object} props 
 * @param {String} props.genotype_tag - The unique genotype tag.
 * @returns {Object} - The genotyple Proteome matching the tag. 
 */

async function getGenotypeProteome_API({ genotype_tag }) {
    const res = await axios.get(`${config.baseURL}/genotypes/${genotype_tag}/proteome`)
    return res.data
}
export const useGetGenotypeProteome = (APIParams = { genotype_tag }, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getGenotypeProteome", APIParams.genotype_tag],
        queryFn: () => getGenotypeProteome_API({ ...APIParams }),
        ...useQueryOptions
    });
}