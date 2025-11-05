
import { useMutation, useQuery } from "react-query"
import axios from "axios"
import config from "../../../config"




/**
 * @description Returns the attribute. The default stale time is 30000 ms.
 * @param {Object} props
 * @param {String} props.tag The attribute tag to be returned.  
 * @returns {import("./types").Attribute}
 */
async function getAttributeByTag_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/attributes/${tag}`)
    return res.data 
}

export const useGetAttribute = (APIParams = { tag }, useQueryOptions = {staleTime : 30000}) => {
    return useQuery(["getAttribute",APIParams.tag],
        () => getAttributeByTag_API({ ...APIParams }), useQueryOptions)
}

/**
 * @description Adds attributes to the database 
 * @param {Object} props
 * @param {String} props
 * @returns 
 */
async function postAttribute_API({}){
    //fetch availabe features from the API. Reconsider /details 
    const res = await axios.post(`${config.baseURL}/attributes`,{})
    return res.data
}

export const usePostAttribute = (useMutationOptions = {}) => {
    return useMutation((APIParams) => postAttribute_API({...APIParams}), useMutationOptions)
}



/**
 * @deprecated Deprecated, please use the usePostTrait
 * @description Adds attribute values for an attribute defined by its tag to the database. 
 * @param {Object} props
 * @param {String} props.attribute_tag The attribute tag to add values for
 * @returns 
 */
async function postAttributeValues_API({attribute_tag}){
    const res = await axios.post(`${config.baseURL}/attributes/${attribute_tag}/values`,) // add data
    return res.data
}

export const usePostAttributeValues = (useMutationOptions = {}) => {
    return useMutation((APIParams) => postAttributeValues_API({...APIParams}), useMutationOptions)
}

/**
 * @description Deletes attribute values for an attribute defined by its tag from the database. 
 * @param {Object} props
 * @param {String} props.attribute_tag 
 * @param {Object} props.attribute_value
 * @returns 
 */
async function deleteAttributeValue_API({attribute_tag, attribute_value_tag}){
    const res = await axios.delete(`${config.baseURL}/attributes/${attribute_tag}/values/${attribute_value_tag}`,)
    return res.data
}

export const useDeleteAttributeValue = (useMutationOptions = {}) => {
    return useMutation((APIParams) => deleteAttributeValue_API({...APIParams}), useMutationOptions)
}


/**
 * @description Update an attribute value in the database. 
 * @param {Object} props 
 * @param {String} props.attribute_tag
 * @param {Object} props.attribute_value_props
 * @returns 
 */
async function patchAttributeValue_API({ attribute_tag, attribute_value_props }) {
    const res = await axios.patch(`${config.baseURL}/attributes/${attribute_tag}/values/${attribute_value_props.tag}`,
        attribute_value_props //updated data 
    )
    return res 
}

export const useUpdateAttributeValue = (useMutationOptions = {}) => {
    return useMutation((APIParams) =>  patchAttributeValue_API({...APIParams}), useMutationOptions)
}

