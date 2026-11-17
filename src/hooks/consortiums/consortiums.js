import { useQuery, useMutation } from "@tanstack/react-query"


export function createConsortiumsAPI(client) {

    /**
     * @description The list of consortium tags.
     * @param {Object} props
     * @param {Number} props.limit
     * @param {String} props.search_string
     * @returns {String[]} Returns the list of consortium tags.
     */
    async function getConsortiums_API({ limit, search_string }) {
    const res = await client.get('/consortiums/q', { params: { limit, search_string } })
    return res.data
    }

    const useGetConsortiums = (APIParams = {}, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getConsortiums", APIParams.limit, APIParams.search_string],
        queryFn: () => getConsortiums_API({ ...APIParams }),
        ...useQueryOptions
    })
    }


    /**
     * @description The list of consortium tags the current user can share into.
     * @param {Object} props
     * @param {Number} props.limit
     * @returns {String[]} Returns the list of consortium tags of the user.
     */
    async function getUserConsortiums_API({ limit }) {
    const res = await client.get('/consortiums/user', { params: { limit } })
    return res.data
    }

    const useGetUserConsortiums = (APIParams = {}, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getUserConsortiums", APIParams.limit],
        queryFn: () => getUserConsortiums_API({ ...APIParams }),
        ...useQueryOptions
    })
    }


    /**
     * @description Find consortiums by search string, research group tags or user tags.
     * @param {Object} props
     * @param {String} props.search_string
     * @param {String[]} props.user_tags
     * @param {String[]} props.group_tags
     * @param {Number} props.limit
     * @returns {String[]} - The consortium tags matching the search criteria.
     */
    async function getConsortiumsByQuery_API({ search_string, group_tags, user_tags, limit }) {
    const res = await client.get('/consortiums/q', { params: { search_string, group_tags, user_tags, limit } })
    return res.data
    }

    const useGetConsortiumsByQuery = (APIParams = { search_string, group_tags, user_tags, limit: 40 }, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getConsortiumsByQuery",
            APIParams.search_string,
            APIParams.user_tags,
            APIParams.group_tags,
            APIParams.limit],
        queryFn: () => getConsortiumsByQuery_API({ ...APIParams }),
        ...useQueryOptions
    })
    }


    /**
     * @description Returns the consortium item.
     * @param {Object} props
     * @param {String} props.tag The consortium tag to return
     * @returns {import("./types").Consortium} The consortium item.
     */
    async function getConsortiumByTag_API({ tag }) {
    const res = await client.get(`/consortiums/${tag}`, {})
    return res.data
    }

    const useGetConsortiumByTag = (APIParams = { tag }, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getConsortiumByTag", APIParams.tag],
        queryFn: () => getConsortiumByTag_API({ ...APIParams }),
        ...useQueryOptions
    })
    }


    /**
     * @description The list of submission tags shared with the consortium.
     * @param {Object} props
     * @param {String} props.tag Consortium tag
     * @returns {String[]} Returns the list of submission tags shared with the consortium.
     */
    async function getConsortiumSubmissions_API({ tag }) {
    const res = await client.get(`/consortiums/${tag}/submissions`, {})
    return res.data
    }

    const useGetConsortiumSubmissions = (APIParams = { tag }, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getConsortiumSubmissions", APIParams.tag],
        queryFn: () => getConsortiumSubmissions_API({ ...APIParams }),
        ...useQueryOptions
    })
    }


    /**
     * @description Shares a submission with a consortium. If the current user is a research group head (PI) or at least a curator, the share is effective immediately. Otherwise a pending share request is created that a head (PI) of the owners research groups must approve.
     * @param {Object} props
     * @param {String} props.consortium_tag
     * @param {String} props.submission_tag
     */
    async function shareSubmissionWithConsortium_API({ consortium_tag, submission_tag }) {
    const res = await client.post(`/consortiums/${consortium_tag}/submissions/${submission_tag}`, {})
    return res.data
    }

    const useShareSubmissionWithConsortium = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams = { consortium_tag, submission_tag }) => shareSubmissionWithConsortium_API({ ...APIParams }),
        ...useMutationOptions
    })
    }


    /**
     * @description Removes a submission share from a consortium.
     * @param {Object} props
     * @param {String} props.consortium_tag
     * @param {String} props.submission_tag
     */
    async function unshareSubmissionFromConsortium_API({ consortium_tag, submission_tag }) {
    const res = await client.delete(`/consortiums/${consortium_tag}/submissions/${submission_tag}`)
    return res.data
    }

    const useUnshareSubmissionFromConsortium = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams = { consortium_tag, submission_tag }) => unshareSubmissionFromConsortium_API({ ...APIParams }),
        ...useMutationOptions
    })
    }


    /**
     * @description Returns the tags of all consortiums.
     * @returns {String[]} Returns the list of consortium tags.
     */
    async function getAllConsortiums_API() {
    const res = await client.get('/consortiums', {})
    return res.data
    }
    const useGetAllConsortiums = (useQueryOptions = {}) => {
    return useQuery({queryKey: ["getAllConsortiums"], queryFn: () => getAllConsortiums_API(), ...useQueryOptions})
    }

    /**
     * @description Creates a new consortium. Requires at least curator rights. The tag is generated from the consortium content, so identical consortiums cannot be created twice.
     * @param {Object} props
     * @param {import("./types").ConsortiumPost} props.consortium
     * @returns {String} The tag of the created consortium.
     */
    async function postConsortium_API({ consortium }) {
    const res = await client.post('/consortiums', consortium)
    return res.data
    }
    const usePostConsortium = (useMutationOptions = {}) => {
    return useMutation({mutationFn: (APIParams) => postConsortium_API({...APIParams}), ...useMutationOptions})
    }

    /**
     * @description Returns the consortiums of a given user (via their research groups). Requires at least curator rights.
     * @param {Object} props
     * @param {String} props.user_tag The user tag to look up the consortiums for.
     * @returns {String[]} Returns the list of consortium tags of the given user.
     */
    async function getConsortiumsByUser_API({ user_tag }) {
    const res = await client.get(`/consortiums/users/${user_tag}`, {})
    return res.data
    }
    const useGetConsortiumsByUser = (APIParams = { user_tag }, useQueryOptions = {}) => {
    return useQuery({queryKey: ["getConsortiumsByUser", APIParams.user_tag], queryFn: () => getConsortiumsByUser_API({...APIParams}), enabled: !!APIParams.user_tag, ...useQueryOptions})
    }

    /**
     * @description Returns the pending consortium share requests the current user (as research group head/PI) can approve.
     * @returns {import("./types").ConsortiumShareRequest[]} Returns the pending share requests of the members of the research groups the current user leads.
     */
    async function getMyPendingShareRequests_API() {
    const res = await client.get('/consortiums/requests/pending', {})
    return res.data
    }
    const useGetMyPendingShareRequests = (useQueryOptions = {}) => {
    return useQuery({queryKey: ["getPendingConsortiumShareRequests"], queryFn: () => getMyPendingShareRequests_API(), ...useQueryOptions})
    }

    /**
     * @description Approves a pending consortium share request. Requires a head (PI) of the owners research group or a curator. The submission becomes immediately accessible to all members of the consortium.
     * @param {Object} props
     * @param {String} props.consortium_tag
     * @param {String} props.submission_tag
     */
    async function approveShareRequest_API({ consortium_tag, submission_tag }) {
    const res = await client.post(`/consortiums/requests/${consortium_tag}/${submission_tag}/approve`, {})
    return res.data
    }
    const useApproveConsortiumShareRequest = (useMutationOptions = {}) => {
    return useMutation({mutationFn: (APIParams = { consortium_tag, submission_tag }) => approveShareRequest_API({...APIParams}), ...useMutationOptions})
    }

    /**
     * @description Denies a pending consortium share request. Requires a head (PI) of the owners research group or a curator. The pending relation is removed, the submission stays inaccessible to the consortium.
     * @param {Object} props
     * @param {String} props.consortium_tag
     * @param {String} props.submission_tag
     */
    async function denyShareRequest_API({ consortium_tag, submission_tag }) {
    const res = await client.post(`/consortiums/requests/${consortium_tag}/${submission_tag}/deny`, {})
    return res.data
    }
    const useDenyConsortiumShareRequest = (useMutationOptions = {}) => {
    return useMutation({mutationFn: (APIParams = { consortium_tag, submission_tag }) => denyShareRequest_API({...APIParams}), ...useMutationOptions})
    }

    /**
     * @description Deletes a consortium together with its group memberships and shared submissions relations. Requires admin rights.
     * @param {Object} props
     * @param {String} props.tag The consortium tag to delete.
     * @returns {Boolean} True if the consortium was deleted.
     */
    async function deleteConsortium_API({ tag }) {
    const res = await client.delete(`/consortiums/${tag}`)
    return res.data
    }
    const useDeleteConsortium = (useMutationOptions = {}) => {
    return useMutation({mutationFn: (APIParams = { tag }) => deleteConsortium_API({...APIParams}), ...useMutationOptions})
    }

    /**
     * @description Returns the research groups that are members of the consortium.
     * @param {Object} props
     * @param {String} props.tag Consortium tag
     * @returns {String[]} Returns the list of research group tags in the consortium.
     */
    async function getConsortiumGroups_API({ tag }) {
    const res = await client.get(`/consortiums/${tag}/groups`, {})
    return res.data
    }
    const useGetConsortiumGroups = (APIParams = { tag }, useQueryOptions = {}) => {
    return useQuery({queryKey: ["getConsortiumGroups", APIParams.tag], queryFn: () => getConsortiumGroups_API({...APIParams}), enabled: !!APIParams.tag, ...useQueryOptions})
    }

    /**
     * @description Returns the user tags of all users that are direct members of the consortium.
     * @param {Object} props
     * @param {String} props.tag Consortium tag
     * @returns {String[]} Returns the list of user tags in the consortium.
     */
    async function getConsortiumUsers_API({ tag }) {
    const res = await client.get(`/consortiums/${tag}/users`, {})
    return res.data
    }
    const useGetConsortiumUsers = (APIParams = { tag }, useQueryOptions = {}) => {
    return useQuery({queryKey: ["getConsortiumUsers", APIParams.tag], queryFn: () => getConsortiumUsers_API({...APIParams}), enabled: !!APIParams.tag, ...useQueryOptions})
    }

    /**
     * @description Adds research groups to a consortium as eligible groups. The heads (PIs) of the groups automatically become direct members of the consortium. Requires at least curator rights.
     * @param {Object} props
     * @param {String} props.tag Consortium tag
     * @param {String[]} props.group_tags The research group tags to add.
     */
    async function postConsortiumGroups_API({ tag, group_tags }) {
    const res = await client.post(`/consortiums/${tag}/groups`, group_tags)
    return res.data
    }
    const usePostConsortiumGroups = (useMutationOptions = {}) => {
    return useMutation({mutationFn: (APIParams = { tag, group_tags }) => postConsortiumGroups_API({...APIParams}), ...useMutationOptions})
    }

    /**
     * @description Removes research groups from a consortium. Requires at least curator rights.
     * @param {Object} props
     * @param {String} props.tag Consortium tag
     * @param {String[]} props.group_tags The research group tags to remove.
     */
    async function deleteConsortiumGroups_API({ tag, group_tags }) {
    const res = await client.delete(`/consortiums/${tag}/groups`, { data: group_tags })
    return res.data
    }
    const useDeleteConsortiumGroups = (useMutationOptions = {}) => {
    return useMutation({mutationFn: (APIParams = { tag, group_tags }) => deleteConsortiumGroups_API({...APIParams}), ...useMutationOptions})
    }

    /**
     * @description The consortium tags with a pending share request for the submission.
     * @param {Object} props
     * @param {String} props.submission_tag Submission tag
     * @returns {String[]} Returns the list of consortium tags with a pending share request.
     */
    async function getPendingConsortiumShares_API({ submission_tag }) {
        const res = await client.get(`/consortiums/submissions/${submission_tag}/pending`, {})
        return res.data
    }

    const useGetPendingConsortiumShares = (APIParams = { submission_tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getPendingConsortiumShares", APIParams.submission_tag],
            queryFn: () => getPendingConsortiumShares_API({ ...APIParams }),
            enabled: !!APIParams.submission_tag,
            ...useQueryOptions
        })
    }


    /**
     * @description Returns the user tags of all users that are members of the consortiums eligible research groups. These users can be added as direct members.
     * @param {Object} props
     * @param {String} props.tag Consortium tag
     * @returns {String[]} Returns the list of eligible user tags.
     */
    async function getConsortiumEligibleUsers_API({ tag }) {
    const res = await client.get(`/consortiums/${tag}/eligible-users`, {})
    return res.data
    }
    const useGetConsortiumEligibleUsers = (APIParams = { tag }, useQueryOptions = {}) => {
    return useQuery({queryKey: ["getConsortiumEligibleUsers", APIParams.tag], queryFn: () => getConsortiumEligibleUsers_API({...APIParams}), enabled: !!APIParams.tag, ...useQueryOptions})
    }

    /**
     * @description Adds users as direct members of a consortium. A user can only be added if they are a member of an eligible research group whose head (PI) is in the consortium. Requires at least curator rights.
     * @param {Object} props
     * @param {String} props.tag Consortium tag
     * @param {String[]} props.user_tags The user tags to add.
     */
    async function postConsortiumUsers_API({ tag, user_tags }) {
    const res = await client.post(`/consortiums/${tag}/users`, user_tags)
    return res.data
    }
    const usePostConsortiumUsers = (useMutationOptions = {}) => {
    return useMutation({mutationFn: (APIParams = { tag, user_tags }) => postConsortiumUsers_API({...APIParams}), ...useMutationOptions})
    }

    /**
     * @description Removes direct user memberships from a consortium. Removing a head (PI) is blocked while other members depend on them. Requires at least curator rights.
     * @param {Object} props
     * @param {String} props.tag Consortium tag
     * @param {String[]} props.user_tags The user tags to remove.
     */
    async function deleteConsortiumUsers_API({ tag, user_tags }) {
    const res = await client.delete(`/consortiums/${tag}/users`, { data: user_tags })
    return res.data
    }
    const useDeleteConsortiumUsers = (useMutationOptions = {}) => {
    return useMutation({mutationFn: (APIParams = { tag, user_tags }) => deleteConsortiumUsers_API({...APIParams}), ...useMutationOptions})
    }

    /**
     * @description Creates a pending membership request (kind 'add' or 'remove') for a user of a research group the current user leads (as head/PI). The request must be approved by a curator.
     * @param {Object} props
     * @param {String} props.consortium_tag
     * @param {String} props.user_tag
     * @param {String} props.kind Either 'add' or 'remove'.
     */
    async function postConsortiumMembershipRequest_API({ consortium_tag, user_tag, kind }) {
    const res = await client.post(`/consortiums/${consortium_tag}/requests/users/${user_tag}`, null, { params: { kind } })
    return res.data
    }
    const usePostConsortiumMembershipRequest = (useMutationOptions = {}) => {
    return useMutation({mutationFn: (APIParams = { consortium_tag, user_tag, kind }) => postConsortiumMembershipRequest_API({...APIParams}), ...useMutationOptions})
    }

    /**
     * @description Returns all pending consortium membership requests. Requires at least curator rights.
     * @returns {import("./types").ConsortiumMembershipRequest[]} Returns the pending membership requests.
     */
    async function getPendingConsortiumMembershipRequests_API() {
    const res = await client.get('/consortiums/requests/membership/pending', {})
    return res.data
    }
    const useGetPendingConsortiumMembershipRequests = (useQueryOptions = {}) => {
    return useQuery({queryKey: ["getPendingConsortiumMembershipRequests"], queryFn: () => getPendingConsortiumMembershipRequests_API(), ...useQueryOptions})
    }

    /**
     * @description Returns the pending consortium membership requests that concern users of the research groups the current user leads (as head/PI) or that the current user filed themselves.
     * @returns {import("./types").ConsortiumMembershipRequest[]} Returns the relevant pending membership requests.
     */
    async function getMyPendingConsortiumMembershipRequests_API() {
    const res = await client.get('/consortiums/requests/membership', {})
    return res.data
    }
    const useGetMyPendingConsortiumMembershipRequests = (useQueryOptions = {}) => {
    return useQuery({queryKey: ["getMyPendingConsortiumMembershipRequests"], queryFn: () => getMyPendingConsortiumMembershipRequests_API(), ...useQueryOptions})
    }

    /**
     * @description Approves a pending consortium membership request. An 'add' request adds the user as a direct member, a 'remove' request removes their membership. Requires at least curator rights.
     * @param {Object} props
     * @param {String} props.consortium_tag
     * @param {String} props.user_tag
     */
    async function approveConsortiumMembershipRequest_API({ consortium_tag, user_tag }) {
    const res = await client.post(`/consortiums/requests/${consortium_tag}/membership/${user_tag}/approve`, {})
    return res.data
    }
    const useApproveConsortiumMembershipRequest = (useMutationOptions = {}) => {
    return useMutation({mutationFn: (APIParams = { consortium_tag, user_tag }) => approveConsortiumMembershipRequest_API({...APIParams}), ...useMutationOptions})
    }

    /**
     * @description Denies a pending consortium membership request. The pending relation is removed. Requires at least curator rights.
     * @param {Object} props
     * @param {String} props.consortium_tag
     * @param {String} props.user_tag
     */
    async function denyConsortiumMembershipRequest_API({ consortium_tag, user_tag }) {
    const res = await client.post(`/consortiums/requests/${consortium_tag}/membership/${user_tag}/deny`, {})
    return res.data
    }
    const useDenyConsortiumMembershipRequest = (useMutationOptions = {}) => {
    return useMutation({mutationFn: (APIParams = { consortium_tag, user_tag }) => denyConsortiumMembershipRequest_API({...APIParams}), ...useMutationOptions})
    }


    /**
     * @description Returns the eligible research groups of a consortium whose head (PI) agreed to the consortium terms.
     * @param {Object} props
     * @param {String} props.tag Consortium tag
     * @returns {String[]} Returns the list of research group tags with a terms agreement.
     */
    async function getConsortiumTermsGroups_API({ tag }) {
    const res = await client.get(`/consortiums/${tag}/terms`, {})
    return res.data
    }
    const useGetConsortiumTermsGroups = (APIParams = { tag }, useQueryOptions = {}) => {
    return useQuery({queryKey: ["getConsortiumTermsGroups", APIParams.tag], queryFn: () => getConsortiumTermsGroups_API({...APIParams}), enabled: !!APIParams.tag, ...useQueryOptions})
    }

    /**
     * @description Agrees to the consortium terms for a research group. Requires the head (PI) of the group or a curator. Only after the agreement the users of the group can share into and see the submissions of the consortium.
     * @param {Object} props
     * @param {String} props.consortium_tag
     * @param {String} props.group_tag
     */
    async function agreeConsortiumTerms_API({ consortium_tag, group_tag }) {
    const res = await client.post(`/consortiums/${consortium_tag}/terms/${group_tag}`, {})
    return res.data
    }
    const useAgreeConsortiumTerms = (useMutationOptions = {}) => {
    return useMutation({mutationFn: (APIParams = { consortium_tag, group_tag }) => agreeConsortiumTerms_API({...APIParams}), ...useMutationOptions})
    }

    /**
     * @description Revokes the research groups agreement to the consortium terms. The users of the group can then neither share submissions with the consortium nor see its shared submissions. Requires the head (PI) of the group or a curator.
     * @param {Object} props
     * @param {String} props.consortium_tag
     * @param {String} props.group_tag
     */
    async function revokeConsortiumTerms_API({ consortium_tag, group_tag }) {
    const res = await client.delete(`/consortiums/${consortium_tag}/terms/${group_tag}`)
    return res.data
    }
    const useRevokeConsortiumTerms = (useMutationOptions = {}) => {
    return useMutation({mutationFn: (APIParams = { consortium_tag, group_tag }) => revokeConsortiumTerms_API({...APIParams}), ...useMutationOptions})
    }

    /**
     * @description Returns the consortiums where the current user heads (as head/PI) an eligible research group that has not yet agreed to the consortium terms.
     * @returns {import("./types").ConsortiumTermsPending[]} Returns the pending terms agreements.
     */
    async function getPendingConsortiumTerms_API() {
    const res = await client.get('/consortiums/terms/pending', {})
    return res.data
    }
    const useGetPendingConsortiumTerms = (useQueryOptions = {}) => {
    return useQuery({queryKey: ["getPendingConsortiumTerms"], queryFn: () => getPendingConsortiumTerms_API(), ...useQueryOptions})
    }

    /**
     * @description Returns the consortiums the current user is a member of where the head (PI) of none of the users research groups agreed to the terms yet. Frontends use this to warn affected members.
     * @returns {String[]} Returns the list of consortium tags without a terms agreement for the user.
     */
    async function getUserConsortiumsWithPendingTerms_API() {
    const res = await client.get('/consortiums/user/pending-terms', {})
    return res.data
    }
    const useGetUserConsortiumsWithPendingTerms = (useQueryOptions = {}) => {
    return useQuery({queryKey: ["getUserConsortiumsWithPendingTerms"], queryFn: () => getUserConsortiumsWithPendingTerms_API(), ...useQueryOptions})
    }


  return {
    useGetConsortiums,
    useGetConsortiumsByQuery,
    useGetUserConsortiums,
    useGetConsortiumByTag,
    useGetConsortiumSubmissions,
    useShareSubmissionWithConsortium,
    useUnshareSubmissionFromConsortium,
    useGetAllConsortiums,
    usePostConsortium,
    useGetConsortiumsByUser,
    useGetConsortiumGroups,
    useGetConsortiumUsers,
    usePostConsortiumGroups,
    useDeleteConsortiumGroups,
    useGetMyPendingShareRequests,
    useApproveConsortiumShareRequest,
    useDenyConsortiumShareRequest,
    useDeleteConsortium,
    useGetPendingConsortiumShares,
    useGetConsortiumEligibleUsers,
    usePostConsortiumUsers,
    useDeleteConsortiumUsers,
    usePostConsortiumMembershipRequest,
    useGetPendingConsortiumMembershipRequests,
    useGetMyPendingConsortiumMembershipRequests,
    useApproveConsortiumMembershipRequest,
    useDenyConsortiumMembershipRequest,
    useGetConsortiumTermsGroups,
    useAgreeConsortiumTerms,
    useRevokeConsortiumTerms,
    useGetPendingConsortiumTerms,
    useGetUserConsortiumsWithPendingTerms
  };
}
