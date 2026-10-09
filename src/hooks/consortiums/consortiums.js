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
    return useQuery({queryKey: ["getMyPendingShareRequests"], queryFn: () => getMyPendingShareRequests_API(), ...useQueryOptions})
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
     * @description Returns the user tags of all users that are members of the consortiums research groups.
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
     * @description Adds research groups to a consortium. Requires at least curator rights.
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
    useDeleteConsortium
  };
}
