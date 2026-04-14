import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import config from "../../../config";


/**
 * @description Edits the genotype.
 * @param {Object} props 
 * @param {String[]} props.genetic_components The genetic componenets to edit 
 * @returns {Boolean} If editing was successful
 */

async function editGenotype_API({ tag, text, description, publication, components }) {
    const res = await axios.put(`${config.baseURL}/genotypes/${tag}`, {text, description, publication, components })
    
    return res.data
}

export const useEditGenotype = (useMutationOptions = {}) => {
    
    return useMutation({
        mutationFn: (APIParams) => editGenotype_API({ ...APIParams }),
        ...useMutationOptions
    });
}
