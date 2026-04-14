
import { useQuery } from "@tanstack/react-query"


export function createSubmissionCoreAPI(client) {

        /**
     * @description Returns the title of the submission.
     * @param {Object} props 
     * @param {String} props.tag The submission tag
     * @returns {String} The title of the submission. If the tag is not
     * assiciated with a submission an error is returned.
     */

    async function getSubmissionCreatedAt_API({ tag }) {
        const res = await client.get(`/submissions/${tag}/createdat`)
        return res.data
    }

    const useGetSubmissionCreatedAt = (APIParams = {tag}, useQueryOptions = { staleTime: Infinity}) => {
        return useQuery({
            queryKey: ["getSubmissionCreatedAt", APIParams.tag],
            queryFn: () => getSubmissionCreatedAt_API({ ...APIParams }),
            ...useQueryOptions
        })
    }


        /**
     * @description Returns if the submission exists in the database.
     * @param {Object} props 
     * @param {String} props.tag The submission tag
     * @returns {Boolean} True if the submission exists, false otherwise.
     */

    async function getSubmissionExists_API({ tag }) {
        const res = await client.get(`/submissions/${tag}/exists`)
        return res.data
    }

    const useGetSubmissionExists = (APIParams = {tag}, useQueryOptions = { staleTime: 2000000}) => {
        return useQuery({
            queryKey: ["getSubmissionExists", APIParams.tag],
            queryFn: () => getSubmissionExists_API({ ...APIParams }),
            ...useQueryOptions
        });
    }


    return {
        useGetSubmissionExists,
        useGetSubmissionCreatedAt
  };
}


