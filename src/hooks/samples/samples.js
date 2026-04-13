import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "axios"
import config from "../../../config";
/**
 * @description Retrieves the sample information by its tag. 
 * @param {Object} props
 * @param {String} props.tag  The tag of the sample
 * @returns {Object} The sample information.
 */
async function getSampleInfo_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/samples/${tag}`)
    return res.data
}

export const useGetSample = (APIParams = {tag}, useQueryOptions = {staleTime : 3000000}) => {
    return useQuery({
        queryKey: ["getSampleInfo", APIParams.tag],
        queryFn: () => getSampleInfo_API({...APIParams}),
        ...useQueryOptions
    })
}



/**
 * @description Retrieves the sample condition application. 
 * @param {Object} props
 * @param {String} props.tag  The tag of the sample
 * @returns {String[]} The tags of the condition application for the sample.
 */
async function getSampleConditionApplication_API({ tag, group_by_attribute}) {
    const res = await axios.get(`${config.baseURL}/samples/${tag}/ca`, { params: { group_by_attribute } } )
    return res.data
}

export const useGetSampleConditionApplications = (APIParams = {tag, group_by_attribute : false}, useQueryOptions = {staleTime : 3000000}) => {
    return useQuery({
        queryKey: ["getSampleConditionApplications", APIParams.tag, APIParams.group_by_attribute],
        queryFn: () => getSampleConditionApplication_API({...APIParams}),
        ...useQueryOptions
    })
}

/**
 * @description Get the genotype for the given sample 
 * @param {object} props
 * @param {String} props.tag The tag of the sample 
 * @returns {String} The genotype tag for the sample 
 */

async function getSampleGenotype_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/samples/${tag}/genotype`)
    return res.data
}

export const useGetSampleGenotype = (APIParams = { tag }, useQueryOptions = {staleTime : 3000000}) => {
    return useQuery({
        queryKey: ["getSampleGenotype", APIParams.tag],
        queryFn: () => getSampleGenotype_API({...APIParams}),
        ...useQueryOptions
    })
}



/**
 * @description Add genotype to a sample.
 * @param {object} props
 * @param {String} props.tag The tag of the sample 
 * @param {String} props.genotype_tag The tag of the genotype to be added to the sample 
 * @returns {Object} The updated sample information. 
 */


async function insertSampleGenotype_API({ sample_tags, genotype_tag }) {
    const res = await axios.post(`${config.baseURL}/samples/genotype`, {sample_tags, genotype_tag })
    return res.data
}

export const useInsertSampleGenotype = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => insertSampleGenotype_API({...APIParams}),
        ...useMutationOptions
    })
}

/**
 * @description Update the sample information.
 * @param {Object} props
 * @param {String} props.tag  The tag of the sample
 * @returns {Object} The updated sample information.
 */
async function updateSample_API({ tag, data }) {
    const res = await axios.put(`${config.baseURL}/samples/${tag}`, data)
    return res.data
}   

export const useUpdateSample = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: ({ tag, data }) => updateSample_API({ tag, data }),
        ...useMutationOptions
    })
}



/**
 * @description Add genotype to a sample.
 * @param {object} props
 * @param {String} props.tag The tag of the sample 
 * @param {String} props.genotype_tag The tag of the genotype to be added to the sample 
 * @returns {Object} The updated sample information. 
 */

async function addSampleGenotype_API({ sample_tag, genotype_tag }) {
    const res = await axios.post( `${config.baseURL}/samples/${sample_tag}/genotype/${genotype_tag}`)
    return res.data
}

export const useAddSampleGenotype = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => addSampleGenotype_API({...APIParams}),
        ...useMutationOptions
    })
}   
