
import { useQuery } from "@tanstack/react-query"
import axios from "../axios-setup"
import config from "../../../config"


/**
 * @description Returns the attribute by minimal state. This means that the attribute can only be assigned to a submission if the submission matches the minimal state.
 * @param {Object} props
 * @param {String} props.tag The attribute group.  
 * @returns {String[]} Returns the attribute tags that are part of the attribute group
 */
async function getAttributeMinState_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/attributes/${tag}/min_state`)
    return res.data
}

export const useGetAttributeMinState = (APIParams = { tag }, useQueryOptions = { staleTime: 300000 }) => {
    return useQuery({
        queryKey: ["getAttributeMinState", APIParams.tag],
        queryFn: () => getAttributeMinState_API({ ...APIParams }),
        ...useQueryOptions
    });
}