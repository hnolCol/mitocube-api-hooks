// States and states changes of a submission 
import { useQuery } from "@tanstack/react-query"

export function createSubmissionUsersAPI(client) {  

    /**
     * @description Returns the condition applications defined for the submission
     * @param {Object} props 
     * @param {String} props.tag The submission tag.
     * @param {Boolean} props.group_by_attribute - If true, the results are grouped by attribute.
     * @returns {Object} The condition applications for the submission
     */
    async function getSubmissionUsers_API({ tag }) {
        const res = await client.get(`/submissions/${tag}/users`, {
        })
        return res.data
    }

    const useGetSubmissionUsers = (APIParams = {tag }, useQueryOptions = { staleTime: 50000, placeHolderData : prev => prev || []}) => {
        return useQuery({
            queryKey: ["getSubmissionUsers", APIParams.tag],
            queryFn: () => getSubmissionUsers_API({ ...APIParams }),
            ...useQueryOptions
        })
    }


    return {        
        useGetSubmissionUsers
    };

}