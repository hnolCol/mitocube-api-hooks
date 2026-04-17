import { useQuery, useMutation } from "@tanstack/react-query"

export function createSubmissionCommentsAPI(client) {

    /**
     * @description Returns the comments for a submission using its tag
     * @param {Object} props
     * @param {String} props.tag Submission tag
     * @returns {import("./types").SubmissionSamples} - The submission comments.  
     */
    async function getSubmissionComments_API({ tag }) {
        const res = await client.get(`/submissions/${tag}/comments`)
        return res.data 
    }

    const useGetSubmissionComments = (APIParams = {tag}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["submission_samples", APIParams.tag],
            queryFn: () => getSubmissionComments_API({ ...APIParams }),
            ...useQueryOptions
        })
    }



    /**
     * @description Endpoint: POST '/api/users'
     * @param {Object} props 
     * @param {String} props.tag  Submission tag 
     * @param {String[]} - Tags associated with the given comment. For example trouble shoot, maintenance, performance 
     */
    async function postComment_API({ tag, content, tags }) {
        const res = await client.post(`/submissions/${tag}/comments`,
            {
                content,
                tags
        }
        )
        return res.data 
    }

    const usePostComment = (useMutationOptions = {}) => {
        return useMutation({mutationFn: (APIParams) => postComment_API({...APIParams}), ...useMutationOptions})
    }

    return {
        useGetSubmissionComments,
        usePostComment
    }

}
