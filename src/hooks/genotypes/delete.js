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


async function deleteGenotype_API({ tag }) {
  const res = await axios.delete(`${config.baseURL}/genotypes/${tag}`);
    return res.data
}


export const useDeleteGenotype = (useMutationOptions = {}) => {
    return useMutation((APIParams) => deleteGenotype_API({ ...APIParams }), useMutationOptions)
}
