import { useMutation } from "react-query"
import axios from "axios"
import config from "../../../config";


/**
 * @description Edits the genotype.
 * @param {Object} props 
 * @param {String[]} props.genetic_components The genetic componenets to edit 
 * @returns {Boolean} If editing was successful
 */

async function editGenotype_API({ tag, text, description, publication, technical_text, protein_tags, application_tags }) {
    
    const res = await axios.put(`${config.baseURL}/genotypes/${tag}`, { text, description, publication, technical_text, protein_tags, application_tags })
    
    return res.data
}

export const useEditGenotype = (useMutationOptions = {}) => {
    
    return useMutation((APIParams) => editGenotype_API({ ...APIParams }), useMutationOptions)
}
