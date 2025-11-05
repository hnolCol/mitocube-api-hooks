import { useMutation, useQuery } from "react-query"
import axios from "axios"
import config from "../../../config"


/**
 * @description Returns the attribute's children. The default stale time is 300000 ms.
 * @param {Object} props
 * @param {String} props.tag The attribute tag to be returned.  
 * @returns {String[]} - The attribute tags of the attribute's children
 */
async function getAttributeChildrenByTag_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/attributes/${tag}/children`)
    return res.data 
}

export const useGetAttributeChildren = (APIParams = { tag }, useQueryOptions = {staleTime : 300000}) => {
    return useQuery(["getAttributeChildren",APIParams.tag],
        () => getAttributeChildrenByTag_API({ ...APIParams }), useQueryOptions)
}





