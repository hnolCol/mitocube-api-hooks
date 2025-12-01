import { useMutation } from "react-query"
import _ from "lodash"
import axios from "axios"
import config from "../../../config"; 


/**
 * Detach abd delete a genotype
 * @param {Object} props
 * @param {String} props.genotype_tag - The genottype tag tp delete
 * @returns {Object} 
 */


async function deleteGenotype_API({ genotype_tag }) {
  const res = await axios.delete(`${config.baseURL}/genotypes/${genotype_tag}`);
    return res.data
}


export const useDeleteGenotype = (APIParams = { genotype_tag: "" },useMutationOptions = {}) => {
  return useMutation(["deleteGenotype", APIParams.genotype_tag],() => deleteGenotype_API({ ...APIParams }), useMutationOptions);
}
