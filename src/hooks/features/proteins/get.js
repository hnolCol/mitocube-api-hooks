import axios from "../../axios-setup"
import { useQuery } from "@tanstack/react-query"


/**
 * @description Get the information about a feature including gene name, etc. Endpoint: /api/features/${tag}/i
 * @param {Object} props
 * @param {String} props.tag - The feature tag (e.g. Uniprot ID)
 * @returns {import("./types").Feature} The feature information. 
 */
async function getProteinByTag_API({ tag }) {
    const res = await axios.get(`/api/features/proteins/${tag}`, { })
    return res.data
}

export function useGetProteinByTag(APIParams = {tag}, useQueryOptions = { }) {
    return useQuery({
        queryKey: ["protein", APIParams.tag],
        queryFn: () => getProteinByTag_API({ ...APIParams }),
        ...useQueryOptions
    });
}