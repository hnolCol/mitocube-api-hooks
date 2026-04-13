import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "../axios-setup"
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

export const useGetAttributeChildren = (APIParams = { tag }, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getAttributeChildren", APIParams.tag],
        queryFn: () => getAttributeChildrenByTag_API({ ...APIParams }),
        staleTime: 300000,
        ...useQueryOptions
    })
}


