import { useQuery, useMutation } from "@tanstack/react-query"

export function createDepositionRequestsAPI(client) {
    /**
     * @description Requests the deposition of a submission's data to an external database (e.g. PRIDE). Any verified user can submit a request. Endpoint: POST '/api/requests/depositions'
     * @param {Object} props
     * @param {String} props.submission_tag - The tag of the submission to request the deposition for.
     * @param {String} props.database - The external database the data should be deposited to (e.g. PRIDE).
     * @param {String} [props.comment] - An optional comment for the curators.
     * @returns {String} The tag of the created deposition request.
     */
    async function createDepositionRequest_API({ submission_tag, database, comment }) {
        const res = await client.post(`/requests/depositions`, {
            submission_tag, database, comment
        })
        return res.data
    }
    const usePostDepositionRequest = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => createDepositionRequest_API({ ...APIParams }),
            ...useMutationOptions
        })
    }
    /**
     * @description Returns deposition requests, newest first. Curator rights required. Endpoint: GET '/api/requests/depositions'
     * @param {Object} props
     * @param {String} [props.status] - Filter by status ("pending", "deposited" or "rejected").
     * @param {Number} [props.limit=50] - The limit of requests to return.
     * @returns {Object[]} The deposition requests (tag, submission_tag, status, user_tag, database, comment, created_at, identifier, url, token, reviewer_tag, reviewed_at, review_comment).
     */
    async function getDepositionRequests_API({ status, limit }) {
        const res = await client.get(`/requests/depositions`, {
            params: { status, limit }
        })
        return res.data
    }
    const useGetDepositionRequests = (APIParams = {}, useQueryOptions = { staleTime: 500 }) => {
        return useQuery({
            queryKey: ["getDepositionRequests", APIParams.status, APIParams.limit],
            queryFn: () => getDepositionRequests_API({ ...APIParams }),
            ...useQueryOptions
        });
    }
    /**
     * @description Returns the pending deposition requests, newest first. Curator rights required. Endpoint: GET '/api/requests/depositions/pending'
     * @param {Object} props
     * @param {Number} [props.limit=50] - The limit of requests to return.
     * @returns {Object[]} The pending deposition requests.
     */
    async function getPendingDepositionRequests_API({ limit }) {
        const res = await client.get(`/requests/depositions/pending`, {
            params: { limit }
        })
        return res.data
    }
    const useGetPendingDepositionRequests = (APIParams = {}, useQueryOptions = { staleTime: 500 }) => {
        return useQuery({
            queryKey: ["getPendingDepositionRequests", APIParams.limit],
            queryFn: () => getPendingDepositionRequests_API({ ...APIParams }),
            ...useQueryOptions
        });
    }
    /**
     * @description Returns the deposition requests created by the requesting user, newest first. Deposited requests include the accession identifier, url and login token. Endpoint: GET '/api/requests/depositions/mine'
     * @param {Object} props
     * @param {Number} [props.limit=50] - The limit of requests to return.
     * @returns {Object[]} The user's deposition requests.
     */
    async function getMyDepositionRequests_API({ limit }) {
        const res = await client.get(`/requests/depositions/mine`, {
            params: { limit }
        })
        return res.data
    }
    const useGetMyDepositionRequests = (APIParams = {}, useQueryOptions = { staleTime: 500 }) => {
        return useQuery({
            queryKey: ["getMyDepositionRequests", APIParams.limit],
            queryFn: () => getMyDepositionRequests_API({ ...APIParams }),
            ...useQueryOptions
        });
    }
    /**
     * @description Returns the deposition requests of a submission, newest first. Curators see all requests of the submission, users only their own requests. Endpoint: GET '/api/requests/depositions/submissions/{submission_tag}'
     * @param {Object} props
     * @param {String} props.submission_tag - The tag of the submission.
     * @param {Number} [props.limit=10] - The limit of requests to return.
     * @returns {Object[]} The deposition requests of the submission.
     */
    async function getSubmissionDepositionRequests_API({ submission_tag, limit }) {
        const res = await client.get(`/requests/depositions/submissions/${submission_tag}`, {
            params: { limit }
        })
        return res.data
    }
    const useGetSubmissionDepositionRequests = (APIParams = {}, useQueryOptions = { staleTime: 500 }) => {
        return useQuery({
            queryKey: ["getSubmissionDepositionRequests", APIParams.submission_tag, APIParams.limit],
            queryFn: () => getSubmissionDepositionRequests_API({ ...APIParams }),
            ...useQueryOptions
        });
    }
    /**
     * @description Completes a pending deposition request. Stores the accession identifier and optional url and login token on the request and notifies the requesting user. Curator rights required. Endpoint: POST '/api/requests/depositions/{request_tag}/complete'
     * @param {Object} props
     * @param {String} props.request_tag - The tag of the deposition request.
     * @param {String} props.identifier - The accession identifier of the deposition (e.g. PXD...).
     * @param {String} [props.url] - The url of the deposited dataset.
     * @param {String} [props.token] - An optional login token for the deposition.
     * @param {String} [props.comment] - An optional comment for the requesting user.
     * @returns {Object} The updated deposition request.
     */
    async function completeDepositionRequest_API({ request_tag, identifier, url, token, comment }) {
        const res = await client.post(`/requests/depositions/${request_tag}/complete`, {
            identifier, url, token, comment
        })
        return res.data
    }
    const usePostCompleteDepositionRequest = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => completeDepositionRequest_API({ ...APIParams }),
            ...useMutationOptions
        })
    }
    /**
     * @description Rejects a pending deposition request. Curator rights required. Endpoint: POST '/api/requests/depositions/{request_tag}/reject'
     * @param {Object} props
     * @param {String} props.request_tag - The tag of the deposition request.
     * @param {String} [props.comment] - An optional review comment.
     * @returns {Object} The updated deposition request.
     */
    async function rejectDepositionRequest_API({ request_tag, comment }) {
        const res = await client.post(`/requests/depositions/${request_tag}/reject`, {
            comment
        })
        return res.data
    }
    const usePostRejectDepositionRequest = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => rejectDepositionRequest_API({ ...APIParams }),
            ...useMutationOptions
        })
    }
    return {
        usePostDepositionRequest,
        useGetDepositionRequests,
        useGetPendingDepositionRequests,
        useGetMyDepositionRequests,
        useGetSubmissionDepositionRequests,
        usePostCompleteDepositionRequest,
        usePostRejectDepositionRequest
    };
}
