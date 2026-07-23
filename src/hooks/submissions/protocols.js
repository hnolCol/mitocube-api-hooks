// States and states changes of a submission 
import { useQuery } from "@tanstack/react-query"


export function createSubmissionProtocolsAPI(client) {
        


    async function getSubmissionProtocols_API({ tag }) {
        const res = await client.get(`/submissions/${tag}/protocols`)
        return res.data
    }

    const useGetSubmissionProtocols = (APIParams = {tag}, useQueryOptions = { staleTime: 500}) => {
        return useQuery({
            queryKey: ["getSubmissionProtocols", APIParams.tag],
            queryFn: () => getSubmissionProtocols_API({ ...APIParams }),
            ...useQueryOptions
        })
    }



    return {
        useGetSubmissionProtocols
    };
}   