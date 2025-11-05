import axios from "axios"
import { useQuery } from "react-query"


/**
 * @description Get the information about a feature including gene name, etc. Endpoint: /api/features/${tag}/i
 * @param {Object} props
 * @param {String} props.tag - The feature tag (e.g. Uniprot ID)
 * @returns {import("./types").Feature} The feature information. 
 */
async function featureInfoByTag_API({ tag }) {
    const res = await axios.get(`/api/features/${tag}/i`, { })
    return res.data
}

export function useGetFeatureInfo(APIParams = {tag}, useQueryOptions = { }) {
    return useQuery(["infoFeature",APIParams.tag],() =>  featureInfoByTag_API({...APIParams}), useQueryOptions)
}