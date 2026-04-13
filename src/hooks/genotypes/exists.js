import { useQuery } from "@tanstack/react-query"
import _ from "lodash"
import axios from "../axios-setup"
import config from "../../../config"; 

/**
 * Query genotype item by its tag 
 * @param {Object} props 
 * @param {String} props.tag - The genotype tag to check for existence.
 * @returns {Boolean} - Whether the genotype item exists. 
 */

async function getGenotypeExists_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/genotypes/${tag}/exists`)
    return res.data
}

export const useGetGenotypeExists = (APIParams = { tag }, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getGenotypeExists", APIParams.tag],
        queryFn: () => getGenotypeExists_API({ ...APIParams }),
        ...useQueryOptions
    });
}
