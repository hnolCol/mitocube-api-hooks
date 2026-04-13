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

async function getGenotypeDescription_API({ genotype_tag }) {
    const res = await axios.get(`${config.baseURL}/genotypes/${genotype_tag}/description`)
    return res.data
}

export const useGetGenotypeDescription = (APIParams = { genotype_tag }, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getGenotypeDescription", APIParams.genotype_tag],
        queryFn: () => getGenotypeDescription_API({ ...APIParams }),
        ...useQueryOptions
    });
}

