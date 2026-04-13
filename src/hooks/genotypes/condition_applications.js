import { useQuery } from "@tanstack/react-query"
import _ from "lodash"
import axios from "../axios-setup"
import config from "../../../config";

/**
 * Query genotype description by its tag 
 * @param {Object} props 
 * @param {String} props.genotype_tag - The unique genotype tag.
 * @returns {Object} - The genotyple description matching the tag. 
 */

async function getGenotypeConditionApplications_API({ genotype_tag }) {
    const res = await axios.get(`${config.baseURL}/genotypes/${genotype_tag}/condition_applications`)
    return res.data
}

export const useGetGenotypeConditionApplications = (APIParams = { genotype_tag }, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getGenotypeConditionApplication", APIParams.genotype_tag],
        queryFn: () => getGenotypeConditionApplications_API({ ...APIParams }),
        ...useQueryOptions
    });
}



/**
 * Query genotype description by its tag 
 * @param {Object} props 
 * @param {String} props.genotype_tag - The unique genotype tag.
 * @returns {Object} - The genotyple description matching the tag. 
 */

async function getGenotypeConditionApplicationsData_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/genotypes/${tag}/condition_applications/data`)
    return res.data
}

export const useGetGenotypeConditionApplicationsData = (APIParams = { tag }, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getGenotypeConditionApplicationsData", APIParams.tag],
        queryFn: () => getGenotypeConditionApplicationsData_API({ ...APIParams }),
        ...useQueryOptions
    });
}

