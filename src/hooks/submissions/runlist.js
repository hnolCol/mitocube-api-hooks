import { useQuery } from "@tanstack/react-query"

export function createSubmissionRunlistAPI(client) {

    /**
     * @description Returns a runlist (if exists) for a given submission,
     * @param {Object} props 
     * @param {String} props.tag - The submission tag
     * @returns 
     */
    async function getRunlist_API({tag}) {
        const res = await client.get(`/submissions/${tag}/runlist`)
        return res.data
    }
    const useGetRunlist = (APIParams = {}, useQueryOptions = {staleTime : 3000000}) => {
        return useQuery({
            queryKey: ["submissionRunlist", APIParams.tag],
            queryFn: () => getRunlist_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    return {        
        useGetRunlist
    };

}