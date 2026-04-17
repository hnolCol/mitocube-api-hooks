
import { useQuery } from "@tanstack/react-query"

export function createFeatureAPI(client) {

    /**
     * @description Get the information about a feature including gene name, etc. Endpoint: /api/features/${tag}/i
     * @param {Object} props
     * @param {String} props.tag - The feature tag (e.g. Uniprot ID)
     * @returns {import("./types").Feature} The feature information. 
     */
    async function getFeatureByTag_API({ tag }) {
        const res = await client.get(`/features/${tag}`, { })
        return res.data
    }

    function useGetFeatureByTag(APIParams = {tag}, useQueryOptions = { }) {
        return useQuery({
            queryKey: ["infoFeature", APIParams.tag],
            queryFn: () => getFeatureByTag_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    return {
        useGetFeatureByTag
    };

}   