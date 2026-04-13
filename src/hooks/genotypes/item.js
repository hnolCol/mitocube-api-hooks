import { useQuery } from "@tanstack/react-query"
import _ from "lodash"
import axios from "axios"
import config from "../../../config"; 

/**
 * Query genotype item by its tag 
 * @param {Object} props 
 * @param {String} props.genotype_tag - The unique genotype tag.
 * @returns {Object} - The genotyple item matching the tag. 
 */

async function getGenotypeItem_API({ genotype_tag }) {
    const res = await axios.get(`${config.baseURL}/genotypes/${genotype_tag}/Item`)
    return res.data
}

export const useGetGenotypeItem = (APIParams = { genotype_tag }, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getGenotypeItem", APIParams.genotype_tag],
        queryFn: () => getGenotypeItem_API({ ...APIParams }),
        ...useQueryOptions
    });
}
