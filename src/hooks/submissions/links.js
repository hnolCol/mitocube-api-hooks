import { useQuery } from "@tanstack/react-query"


export function createSubmissionLinksAPI(client) {

    /**
     * @description Returns the external links of a submission (list of {id, url, comment}).
     * @param {Object} props
     * @param {String} props.tag The submission tag
     * @returns {Array} The external links of the submission.
     */
    async function getSubmissionLinks_API({ tag }) {
        const res = await client.get(`/submissions/${tag}/links`)
        return res.data
    }

    const useGetSubmissionLinks = (APIParams = { tag }, useQueryOptions = { staleTime: 200000 }) => {
        return useQuery({
            queryKey: ["getSubmissionLinks", APIParams.tag],
            queryFn: () => getSubmissionLinks_API({ ...APIParams }),
            staleTime: 200000,
            ...useQueryOptions
        })
    }

    /**
     * @description Returns the tag of the submission this submission is linked to
     * (e.g. a repeated experiment), or null.
     * @param {Object} props
     * @param {String} props.tag The submission tag
     * @returns {String|null} The linked submission tag or null.
     */
    async function getLinkedSubmission_API({ tag }) {
        const res = await client.get(`/submissions/${tag}/linked_submission`)
        return res.data
    }

    const useGetLinkedSubmission = (APIParams = { tag }, useQueryOptions = { staleTime: 200000 }) => {
        return useQuery({
            queryKey: ["getLinkedSubmission", APIParams.tag],
            queryFn: () => getLinkedSubmission_API({ ...APIParams }),
            staleTime: 200000,
            ...useQueryOptions
        })
    }

    return {
        useGetSubmissionLinks,
        useGetLinkedSubmission
    };
}
