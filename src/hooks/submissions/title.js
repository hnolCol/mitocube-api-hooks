import { useQuery, useMutation } from "@tanstack/react-query"


export function createSubmissionTitleAPI(client) {

    /**
     * @description Returns the title of the submission.
     * @param {Object} props 
     * @param {String} props.tag The submission tag
     * @returns {String} The title of the submission. If the tag is not
     * assiciated with a submission an error is returned.
     */

    async function getSubmissionTitle_API({ tag }) {
        const res = await client.get(`/submissions/${tag}/title`)
        return res.data
    }
            
    const useGetSubmissionTitle = (APIParams = {tag}, useQueryOptions = { staleTime: 200000}) => {
        return useQuery({
            queryKey: ["getSubmissionTitle", APIParams.tag],
            queryFn: () => getSubmissionTitle_API({ ...APIParams }),
            staleTime: 200000,
            ...useQueryOptions
        })
    }



    /**
 * @description Updates the state of the submission. A state can go in both directions. 
 * @param {Object} props 
 * @param {String} props.tag Submission tag 
 * @param {Number} props.state The new state of the submission. 
 */
async function patchSubmissionTitle_API({ tag, title }) {

    const res = await client.patch(`submissions/${tag}/title`, {}, { params: { title } })
    return res.data
}

  const usePatchSubmissionTitle = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => patchSubmissionTitle_API({...APIParams}),
        ...useMutationOptions
    })
}


    return {
        useGetSubmissionTitle,
        usePatchSubmissionTitle
  };
}


