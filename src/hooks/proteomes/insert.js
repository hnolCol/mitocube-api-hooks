import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "axios"
import config from "../../../config";

/**
 * @description Adds a proteome to the database (e.g. downloads from Uniprot) and updates the 
 * sequence information as well as gene names. Does not delete existing proteins in the database if
 * they are not present in the new version of the reference proteome. 
 * @param {Object} props
 * @param {String} props.proteome_tag - Proteome Tag (starting with UP) Mulitple strings should be separated using a semicolon (;) 
 * @param {Boolean} props.reviewed - If only reviewed proteins from the Uniprot database should be loaded.
 * @returns 
 */
async function postProteome_API({tag, reviewed = true}){
    //fetch availabe features from the API. Reconsider /details 
    const res = await axios.post(`${config.baseURL}/proteomes`,{}, {params : {proteome_tag : tag, reviewed}} )
    return res.data
}

export const usePostProteome = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => postProteome_API({...APIParams}),
        ...useMutationOptions
    })
}

