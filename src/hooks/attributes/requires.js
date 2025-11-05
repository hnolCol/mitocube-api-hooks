import { useMutation, useQuery } from "react-query"
import axios from "axios"
import config from "../../../config"


/**
 * @description Returns the attribute's required traits. The default stale time is 300000 ms. If this trait has not yet been selected, the attribute should not appear.
 * @param {Object} props
 * @param {String} props.tag The attribute tag to be returned.
 * @returns {String[]} - The attribute tags of the attribute's required traits
 */
async function getRequiredTraitsForAttribute_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/attributes/${tag}/required_traits`)
    return res.data 
}

export const useGetRequiredTraits = (APIParams = { tag }, useQueryOptions = { staleTime: 300000 }) => {
    return useQuery(["getRequiredTraits", APIParams.tag],
        () => getRequiredTraitsForAttribute_API({ ...APIParams }), useQueryOptions)
}
