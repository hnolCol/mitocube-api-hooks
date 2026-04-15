import { useQuery, useMutation } from "@tanstack/react-query"
import _ from "lodash"

export function createModifyGenotypesAPI(client) {

    /**
     * @description Endpoint: POST '/api/genotypes' Inserts a new genotype into the database. A genotype is defined by multiple genetic components.
     * @param {Object} props 
     * @param {Object[]} props.genetic_components The genetic components that make up the genotype.
     * @returns {Boolean} If insertion was successful
     */
    async function postGenotype_API({ text, description, publication, components }) {
        const res = await client.post(`/genotypes`,
            { text, description, publication, components }
        )
        return res.data 
    }

    const usePostGenotype = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postGenotype_API({...APIParams}),
            ...useMutationOptions
        });
    }



    /**
     * @description Edits the genotype.
     * @param {Object} props 
     * @param {String[]} props.genetic_components The genetic componenets to edit 
     * @returns {Boolean} If editing was successful
     */

    async function editGenotype_API({ tag, text, description, publication, components }) {
        const res = await client.put(`/genotypes/${tag}`, {text, description, publication, components })
        
        return res.data
    }

    const useEditGenotype = (useMutationOptions = {}) => {
        
        return useMutation({
            mutationFn: (APIParams) => editGenotype_API({ ...APIParams }),
            ...useMutationOptions
        });
    }

    /**
     * Detach abd delete a genotype
     * @param {Object} props
     * @param {String} props.genotype_tag - The genottype tag tp delete
     * @returns {Object} 
     */


    async function deleteGenotype_API({ tag }) {
    const res = await client.delete(`/genotypes/${tag}`);
        return res.data
    }


    const useDeleteGenotype = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => deleteGenotype_API({ ...APIParams }),
            ...useMutationOptions
        });
    }

    return {
        usePostGenotype,
        useEditGenotype,
        useDeleteGenotype
    }

}
