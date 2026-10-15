import { useQuery, useMutation } from "@tanstack/react-query"


export function createCollaborationsAPI(client) {

    /**
     * @description Finds submissions by title and tags and returns only the minimal metadata required to request collaboration (title, owner, research group, state). Endpoint: GET '/api/collaborations/submissions/explore'
     * @param {Object} props 
     * @param {String} [props.search_string] - The search string to match against the submission title.
     * @param {Number} [props.limit=40] - The limit of submissions to return.
     * @param {String[]} [props.ca_tags] - Condition application tags the submission must have (AND semantics, submission- or sample-level).
     * @param {String[]} [props.user_tags] - User tags that must be creator or collaborator of the submission (AND semantics).
     * @returns {Object[]} The submission explore data (tag, title, state, created_at, owner_tag, owner_firstname, owner_lastname, owner_institute, research_group_tag, research_group_text, research_group_institute, has_open_collaboration_request, matched_condition_application_tags, matched_user_tags).
     */
    async function getSubmissionExplore_API({ search_string, limit, ca_tags, user_tags }) {
        const repeatedParams = []
        if (Array.isArray(ca_tags)) {
            ca_tags.forEach(tag => { if (tag) repeatedParams.push(`ca_tags=${encodeURIComponent(tag)}`) })
        }
        if (Array.isArray(user_tags)) {
            user_tags.forEach(tag => { if (tag) repeatedParams.push(`user_tags=${encodeURIComponent(tag)}`) })
        }
        const queryString = repeatedParams.length > 0 ? `?${repeatedParams.join("&")}` : ""
        const res = await client.get(`/collaborations/submissions/explore${queryString}`, {
            params: { search_string, limit }
        })
        return res.data
    }

    const useGetSubmissionExplore = (APIParams = {}, useQueryOptions = { staleTime: 500 }) => {
        return useQuery({
            queryKey: ["getSubmissionExplore", APIParams.search_string, APIParams.limit, APIParams.ca_tags, APIParams.user_tags],
            queryFn: () => getSubmissionExplore_API({ ...APIParams }),
            ...useQueryOptions
        });
    }


    /**
     * @description Creates a pending collaboration request for a submission. The request can be created for the requesting user itself or for one of their research groups. Endpoint: POST '/api/collaborations/requests'
     * @param {Object} props 
     * @param {String} props.submission_tag - The tag of the submission to request collaboration for.
     * @param {String} [props.message] - An optional message to the submission owner.
     * @param {String} [props.requested_for_user_tag] - The tag of the user the request is created for (defaults to the requesting user).
     * @param {String} [props.requested_for_group_tag] - The tag of the research group the request is created for (all members become collaborators on approval).
     * @returns {String} The tag of the created collaboration request.
     */
    async function createCollaborationRequest_API({ submission_tag, message, requested_for_user_tag, requested_for_group_tag }) {
        const res = await client.post(`/collaborations/requests`, {
            submission_tag, message, requested_for_user_tag, requested_for_group_tag
        })
        return res.data
    }

    const usePostCollaborationRequest = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => createCollaborationRequest_API({ ...APIParams }),
            ...useMutationOptions
        })
    }


    /**
     * @description Returns the pending collaboration requests created by the current user. Endpoint: GET '/api/collaborations/requests'
     * @param {Object} props 
     * @returns {Object[]} The collaboration requests (tag, submission_tag, requested_by, created_at, requested_for_user_tag, requested_for_group_tag, message, status).
     */
    async function getMyCollaborationRequests_API({ }) {
        const res = await client.get(`/collaborations/requests`)
        return res.data
    }

    const useGetMyCollaborationRequests = (APIParams = {}, useQueryOptions = { staleTime: 500 }) => {
        return useQuery({
            queryKey: ["getMyCollaborationRequests"],
            queryFn: () => getMyCollaborationRequests_API({ ...APIParams }),
            ...useQueryOptions
        });
    }


    /**
     * @description Returns the pending collaboration requests the current user can approve (owned submissions and submissions of research groups they lead). Endpoint: GET '/api/collaborations/requests/pending'
     * @param {Object} props 
     * @returns {Object[]} The pending collaboration requests.
     */
    async function getPendingCollaborationRequests_API({ }) {
        const res = await client.get(`/collaborations/requests/pending`)
        return res.data
    }

    const useGetPendingCollaborationRequests = (APIParams = {}, useQueryOptions = { staleTime: 500 }) => {
        return useQuery({
            queryKey: ["getPendingCollaborationRequests"],
            queryFn: () => getPendingCollaborationRequests_API({ ...APIParams }),
            ...useQueryOptions
        });
    }


    /**
     * @description Returns the collaboration requests for a given submission. Endpoint: GET '/api/collaborations/requests/submissions/{submission_tag}'
     * @param {Object} props 
     * @param {String} props.submission_tag - The tag of the submission.
     * @returns {Object[]} The collaboration requests of the submission.
     */
    async function getSubmissionCollaborationRequests_API({ submission_tag }) {
        const res = await client.get(`/collaborations/requests/submissions/${submission_tag}`)
        return res.data
    }

    const useGetSubmissionCollaborationRequests = (APIParams = { submission_tag }, useQueryOptions = { staleTime: 500 }) => {
        return useQuery({
            queryKey: ["getSubmissionCollaborationRequests", APIParams.submission_tag],
            queryFn: () => getSubmissionCollaborationRequests_API({ ...APIParams }),
            ...useQueryOptions
        });
    }


    /**
     * @description Approves a pending collaboration request. On approval the requesting user is added as collaborator of the submission. Requires owner, head (PI) or curator rights. Endpoint: POST '/api/collaborations/requests/{request_tag}/approve'
     * @param {Object} props 
     * @param {String} props.request_tag - The tag of the collaboration request.
     * @returns {Boolean} True if the request was approved.
     */
    async function approveCollaborationRequest_API({ request_tag }) {
        const res = await client.post(`/collaborations/requests/${request_tag}/approve`, {})
        return res.data
    }

    const usePostApproveCollaborationRequest = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => approveCollaborationRequest_API({ ...APIParams }),
            ...useMutationOptions
        })
    }


    /**
     * @description Denies a pending collaboration request. Requires owner, head (PI) or curator rights. Endpoint: POST '/api/collaborations/requests/{request_tag}/deny'
     * @param {Object} props 
     * @param {String} props.request_tag - The tag of the collaboration request.
     * @returns {Boolean} True if the request was denied.
     */
    async function denyCollaborationRequest_API({ request_tag }) {
        const res = await client.post(`/collaborations/requests/${request_tag}/deny`, {})
        return res.data
    }

    const usePostDenyCollaborationRequest = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => denyCollaborationRequest_API({ ...APIParams }),
            ...useMutationOptions
        })
    }


    return {
        useGetSubmissionExplore,
        usePostCollaborationRequest,
        useGetMyCollaborationRequests,
        useGetPendingCollaborationRequests,
        useGetSubmissionCollaborationRequests,
        usePostApproveCollaborationRequest,
        usePostDenyCollaborationRequest
    };
}
