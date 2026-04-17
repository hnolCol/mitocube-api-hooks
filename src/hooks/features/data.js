



import { useQuery } from "@tanstack/react-query"

export function createFeatureDataAPI(client) {

    /**
     * @description Returns the correlation result of a feature to any other feature
     * in the same proteome/samples . 
     * @param {Object} props 
     * @param {String} props.tag  The feature tag 
     * @param {string} props.submission_tag - The submission tag to limit the data to.
     * @returns 
     */
    async function getFeatureDataForSubmission_API({tag, submission_tag}) {
        const res = await client.get(`/features/${tag}/d`, {params : {submission_tag}})
        return res.data
    }


    const useGetFeatureDataForSubmission = (APIParams = { tag, submission_tag }, queryOptions = {placeHolderData: (prev) => prev, staleTime: 30000}) => {

        return useQuery({
            queryKey: ["feature_data",
                APIParams.tag,
                APIParams.submission_tag],
            queryFn: () => getFeatureDataForSubmission_API({ ...APIParams }),
            ...queryOptions
        });
    }

    return {
        useGetFeatureDataForSubmission
    };

}


