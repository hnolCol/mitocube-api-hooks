import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "axios"
import config from "../../../config";




/**
 * @description Endpoint: POST '/api/genotypes' Inserts a new genotype into the database. A genotype is defined by multiple genetic components.
 * @param {Object} props 
 * @param {Object[]} props.genetic_components The genetic components that make up the genotype.
 * @returns {Boolean} If insertion was successful
 */
async function postGenotype_API({ text, description, publication, components }) {
    const res = await axios.post(`${config.baseURL}/genotypes`,
        { text, description, publication, components }
    )
    return res.data 
}

export const usePostGenotype = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => postGenotype_API({...APIParams}),
        ...useMutationOptions
    });
}
