
import { useQuery, useMutation } from "@tanstack/react-query"


export function createResearchGroupsAPI(client) {

    /**
     * 
     * @param {Object} props 
     * @returns {String[]} Returns the list of research group tags. 
     */
    async function getResearchGroups_API({limit, search_string}) {
    const res = await client.get('/researchgroups/q', {params : {limit, search_string}})
    return res.data
    }

    const useGetResearchGroups = (APIParams = {}, useQueryOptions = {}) => {
    return useQuery({queryKey: ["getResearchGroups", APIParams.limit, APIParams.search_string], queryFn: () => getResearchGroups_API({...APIParams}), ...useQueryOptions})
    }


    /**
     * @description Find research groups by search string, user tags, or submission tags.
     * @return {String[]} - The research group tags matching the search criteria.
     */
    async function getResearchGroupsByQuery_API({ search_string, user_tags, submission_tags, limit }) {
      const res = await client.get('/researchgroups/q', { params: { search_string, user_tags, submission_tags, limit } })
      return res.data
    }

    const useGetResearchGroupsByQuery = (APIParams = { search_string, user_tags, submission_tags, limit: 40 }, useQueryOptions = {}) => {
      return useQuery({
          queryKey: ["getResearchGroupsByQuery",
              APIParams.search_string,
              APIParams.user_tags,
              APIParams.submission_tags,
              APIParams.limit],
          queryFn: () => getResearchGroupsByQuery_API({ ...APIParams }),
          ...useQueryOptions
      })
    }


    /**
     * @description The list of users tags in the research group. 
     * @param {Object} props 
     * @param {String} props.tag Research group tag 
     * @returns {String[]} Returns the list of users in the group. 
     */
    async function getResearchGroupUsers_API({ tag }) {
    const res = await client.get(`/researchgroups/${tag}/users`, {})
    return res.data
    }

    const useGetResearchGroupUsers = (APIParams = {tag}, useQueryOptions = {}) => {
    return useQuery({queryKey: ["getResearchGroupsUsers", APIParams.tag], queryFn: () => getResearchGroupUsers_API({...APIParams}), ...useQueryOptions})
    }

    /**
     * @description The list of users tags in the research group. 
     * @param {Object} props 
     * @param {String} props.tag Research group tag 
     * @returns {Number} Returns the list of users in the group. 
     */
    async function getResearchGroupUsersCount_API({ tag }) {
    const res = await client.get(`/researchgroups/${tag}/users/count`, {})
    return res.data
    }

    const useGetResearchGroupUsersCount = (APIParams = {tag}, useQueryOptions = {}) => {
    return useQuery({queryKey: ["getResearchGroupsUsersCount", APIParams.tag], queryFn: () => getResearchGroupUsersCount_API({...APIParams}), ...useQueryOptions})
    }



    /**
     * @description Returns the research group item
     * @param {Object} props
     * @param {String} props.tag The research group tag to return 
     * @returns {import("./types").ResearchGroup} The research group item.
     */
    async function getResearchGroupsByTag_API({ tag }) {
    const res = await client.get(`/researchgroups/${tag}`, {})
    return res.data
    }

    const useGetResearchGroupByTag = (APIParams = {tag }, useQueryOptions = {}) => {
    return useQuery({queryKey: ["getResearchGroupsByTag", APIParams.tag], queryFn: () => getResearchGroupsByTag_API({...APIParams}), ...useQueryOptions})
    }



    /**
     * @description Returns the research group item
     * @param {Object} props
     * @param {String} props.tag The research group tag to return 
     * @returns {import("./types").ResearchGroup} The research group item.
     */
    async function getResearchGroupSubmissionCount_API({ tag }) {
    const res = await client.get(`/researchgroups/${tag}/submissions/count`, {})
    return res.data
    }

    const useGetResearchGroupSubmissionCount = (APIParams = {tag }, useQueryOptions = {}) => {
    return useQuery({queryKey: ["getResearchGroupSubmissionCount", APIParams.tag], queryFn: () => getResearchGroupSubmissionCount_API({...APIParams}), ...useQueryOptions})
    }


    /**
     * @description Adds a research group to the database 
     * @param {Object} props 
     * @param {import("../../types/researchgroup").ResearchGroupPost} props.researchGroup
     */
    async function postResearchGroup_API({ text, abbreviation, institute, profile_text, address, email, url }) {
    const res = await client.post('/researchgroups/',
        { text, abbreviation, institute, profile_text, address, email, url }
    )
    return res.data
    }
    const usePostResearchGroup = (useMutationOptions = {}) => {
        return useMutation({mutationFn: (APIParams) => postResearchGroup_API({...APIParams}), ...useMutationOptions})
    }


    /**
     * @description Updates a research group by its tag 
     * @param {Object} props 
     * @param {String} props.name The name of the research group 
     * @param {String} props.abbreviation - The abbreviation of the research group 
     * @param {String} props.email - The contact email address 
     * @param {String} props.address 
     */
    async function patchResearchGroup_API({ tag, text, abbreviation, institute, profile_text, address, email, url }) {
    const res = await client.patch(`/researchgroups/${tag}`,
        {},
        {params : {text, abbreviation, institute, profile_text, address, email, url}}
    )
    return res.data
    }
    const usePatchResearchGroup = (useMutationOptions = {}) => {
    return useMutation({mutationFn: (APIParams = { tag, text, abbreviation, institute, profile_text, address, email, url }) => patchResearchGroup_API({...APIParams}), ...useMutationOptions})
    }



    /**
     * @description Deletes user(s) from a research group. 
     * @param {Object} props 
     * @param {String} props.tag 
     * @param {String[]} props.users_tags
     */
    async function deleteResearchGroup_API({ tag, user_tags }) {
    const res = await client.delete(`/researchgroups/${tag}/users`,
        { data: user_tags }
    )
    return res.data
    }
    const useDeleteResearchGroupUsers = (useMutationOptions = {}) => {
    return useMutation({mutationFn: (APIParams) => deleteResearchGroup_API({...APIParams}), ...useMutationOptions})
    }



    /**
     * @description Add user(s) to a research group. 
     * @param {Object} props 
     * @param {String} props.tag 
     * @param {String[]} props.users_tags
     */
    async function postResearchGroupUsers_API({ tag, user_tags }) {
    const res = await client.post(`/researchgroups/${tag}/users`,
        user_tags
    )
    return res.data
    }
    const usePostResearchGroupUsers = (useMutationOptions = {}) => {
    return useMutation({mutationFn: (APIParams) => postResearchGroupUsers_API({...APIParams}), ...useMutationOptions})
    }




    /**
     * @description Returns the research groups a user is a member of.
     * @param {Object} props
     * @param {String} props.user_tag The user tag to look up the research groups for.
     * @returns {String[]} Returns the list of research group tags of the user.
     */
    async function getResearchGroupsOfUser_API({ user_tag }) {
    const res = await client.get(`/researchgroups/users/${user_tag}`, {})
    return res.data
    }
    /**
     * @description Whether the current user is a head (PI) of at least one research group.
     * Frontends use this to decide whether to show PI-only controls.
     * @returns {Boolean} Returns true if the current user heads at least one research group.
     */
    async function getMyIsHead_API() {
        const res = await client.get("/researchgroups/user/is-head")
        return res.data
    }

    const useGetMyIsHead = (useQueryOptions = {}) => {
        return useQuery({ queryKey: ["getMyIsHead"], queryFn: () => getMyIsHead_API(), ...useQueryOptions })
    }

    /**
     * @description Returns the tags of the research groups the current user heads (is PI of).
     * Used to scope PI-only listings (e.g. consortium share terms) to the users own groups.
     * @returns {Array} Returns the tags of the headed research groups.
     */
    async function getMyHeadedGroups_API() {
        const res = await client.get("/researchgroups/user/headed")
        return res.data
    }

    const useGetMyHeadedGroups = (useQueryOptions = {}) => {
        return useQuery({ queryKey: ["getMyHeadedGroups"], queryFn: () => getMyHeadedGroups_API(), ...useQueryOptions })
    }

    /**
     * @description Returns the sharing overview for the current user as head (PI): one entry
     * per submission of the user and their headed groups, with the owner tag, the consortiums
     * the submission is shared with (approved and pending) and the collaborating users.
     * @returns {Array} Entries: { submission_tag, owner_tag, consortium_tags,
     * pending_consortium_tags, collaborator_tags }
     */
    async function getMySharedSubmissionsOverview_API() {
        const res = await client.get("/researchgroups/user/shared-overview")
        return res.data
    }

    const useGetMySharedSubmissionsOverview = (useQueryOptions = {}) => {
        return useQuery({ queryKey: ["getMySharedSubmissionsOverview"], queryFn: () => getMySharedSubmissionsOverview_API(), ...useQueryOptions })
    }

    /**
     * @description Whether the head (PI) of any of the current users research groups disabled
     * the explore visibility of the groups submissions. Frontends use this to hide the explore
     * tab and show an 'Explore disabled by PI' message to the members of such groups.
     * @returns {Boolean} Returns true if explore is disabled by the PI of one of the users groups.
     */
    async function getMyExploreDisabled_API() {
        const res = await client.get("/researchgroups/user/explore-disabled")
        return res.data
    }

    const useGetMyExploreDisabled = (useQueryOptions = {}) => {
        return useQuery({ queryKey: ["getMyExploreDisabled"], queryFn: () => getMyExploreDisabled_API(), ...useQueryOptions })
    }

    /**
     * @description Whether the head (PI) of the research group disabled the explore visibility
     * of the groups submissions.
     * @param {Object} props
     * @param {String} props.tag Research group tag
     * @returns {Boolean} Returns true if explore is disabled for the research group.
     */
    async function getResearchGroupExploreDisabled_API({ tag }) {
        const res = await client.get(`/researchgroups/${tag}/explore-disabled`)
        return res.data
    }

    const useGetResearchGroupExploreDisabled = (APIParams = { tag }, useQueryOptions = {}) => {
        return useQuery({ queryKey: ["getResearchGroupExploreDisabled", APIParams.tag], queryFn: () => getResearchGroupExploreDisabled_API({ ...APIParams }), enabled: !!APIParams.tag, ...useQueryOptions })
    }

    /**
     * @description Lets the head (PI) of a research group (or a curator) disable the explore
     * visibility of the groups submissions. If disabled, the groups submissions are hidden
     * from the explore view for users outside of the group and the members of the group lose
     * access to the explore tab.
     * @param {Object} props
     * @param {String} props.tag Research group tag
     * @param {Boolean} props.disabled True to disable the explore visibility, false to enable it.
     * @returns {Boolean} Returns true if the setting was updated.
     */
    async function setResearchGroupExploreDisabled_API({ tag, disabled }) {
        const res = await client.put(`/researchgroups/${tag}/explore-disabled`, null, { params: { disabled } })
        return res.data
    }

    const useSetResearchGroupExploreDisabled = (useMutationOptions = {}) => {
        return useMutation({ mutationFn: (APIParams = {}) => setResearchGroupExploreDisabled_API({ ...APIParams }), ...useMutationOptions })
    }

    /**
     * @description The explore visibility scope of the research group: whether the explore view
     * is disabled, and whether the groups submissions are visible in the explore view to all
     * research groups (scope 'ALL') or only to the research groups of the explicit allow list
     * (scope 'GROUPS', the group tags in visible_to).
     * @param {Object} props
     * @param {String} props.tag Research group tag
     * @returns {Object} Returns { disabled, scope, visible_to }.
     */
    async function getResearchGroupExploreScope_API({ tag }) {
    const res = await client.get(`/researchgroups/${tag}/explore-scope`)
    return res.data
    }

    const useGetResearchGroupExploreScope = (APIParams = { tag }, useQueryOptions = {}) => {
        return useQuery({ queryKey: ["getResearchGroupExploreScope", APIParams.tag], queryFn: () => getResearchGroupExploreScope_API({ ...APIParams }), enabled: !!APIParams.tag, ...useQueryOptions })
    }

    /**
     * @description Sets the explore visibility scope of the research group ('ALL' or 'GROUPS')
     * and replaces its allow list of research groups. Requires the head (PI) of the research
     * group or a curator.
     * @param {Object} props
     * @param {String} props.tag Research group tag
     * @param {String} props.scope 'ALL' (visible to all research groups) or 'GROUPS' (visible only to the allow list).
     * @param {String[]} [props.visible_to] The research group tags of the allow list (for scope 'GROUPS').
     * @returns {Object} Returns the updated scope { disabled, scope, visible_to }.
     */
    async function setResearchGroupExploreScope_API({ tag, scope, visible_to }) {
    const visible_to_tags = Array.isArray(visible_to) ? visible_to : []
    const res = await client.put(`/researchgroups/${tag}/explore-scope`, null, { params: { scope, visible_to: visible_to_tags.join(";") } })
    return res.data
    }

    const useSetResearchGroupExploreScope = (useMutationOptions = {}) => {
        return useMutation({ mutationFn: (APIParams = { tag, scope, visible_to }) => setResearchGroupExploreScope_API({ ...APIParams }), ...useMutationOptions })
    }

    /**
     * @description All other research groups (ordered alphabetically by name) that can be added
     * to the explore visibility allow list of the research group.
     * @param {Object} props
     * @param {String} props.tag Research group tag
     * @returns {Object[]} Returns the research group models (tag, text, abbreviation, institute, ...).
     */
    async function getResearchGroupExploreScopeTargets_API({ tag }) {
    const res = await client.get(`/researchgroups/${tag}/explore-scope/targets`)
    return res.data
    }

    const useGetResearchGroupExploreScopeTargets = (APIParams = { tag }, useQueryOptions = {}) => {
        return useQuery({ queryKey: ["getResearchGroupExploreScopeTargets", APIParams.tag], queryFn: () => getResearchGroupExploreScopeTargets_API({ ...APIParams }), enabled: !!APIParams.tag, ...useQueryOptions })
    }


    /**
     * @description Returns the sharing overview of the current users research groups: one entry
     * per submission with the owner tag, the consortiums the submission is shared with
     * (approved and pending) and the collaborating users.
     * @returns {Array} Entries: { submission_tag, owner_tag, consortium_tags,
     * pending_consortium_tags, collaborator_tags }
     */
    async function getSharingOverview_API() {
        const res = await client.get("/researchgroups/sharing/overview")
        return res.data
    }

    const useGetSharingOverview = (useQueryOptions = {}) => {
        return useQuery({ queryKey: ["getSharingOverview"], queryFn: () => getSharingOverview_API(), ...useQueryOptions })
    }

    const useGetResearchGroupsOfUser = (APIParams = { user_tag }, useQueryOptions = {}) => {
    return useQuery({queryKey: ["getResearchGroupsOfUser", APIParams.user_tag], queryFn: () => getResearchGroupsOfUser_API({...APIParams}), enabled: !!APIParams.user_tag, ...useQueryOptions})
    }

    /**
     * @description Returns the heads (PIs) of the research group.
     * @param {Object} props
     * @param {String} props.tag Research group tag
     * @returns {String[]} Returns the list of user tags that are heads (PIs) of the research group.
     */
    async function getResearchGroupHeads_API({ tag }) {
    const res = await client.get(`/researchgroups/${tag}/heads`, {})
    return res.data
    }
    const useGetResearchGroupHeads = (APIParams = {tag}, useQueryOptions = {}) => {
    return useQuery({queryKey: ["getResearchGroupHeads", APIParams.tag], queryFn: () => getResearchGroupHeads_API({...APIParams}), enabled: !!APIParams.tag, ...useQueryOptions})
    }

    /**
     * @description Makes a user a head (PI) of the research group. Requires at least curator rights.
     * @param {Object} props
     * @param {String} props.tag Research group tag
     * @param {String} props.user_tag The user tag to make a head (PI).
     */
    async function postResearchGroupHead_API({ tag, user_tag }) {
    const res = await client.post(`/researchgroups/${tag}/heads/${user_tag}`, {})
    return res.data
    }
    const usePostResearchGroupHead = (useMutationOptions = {}) => {
    return useMutation({mutationFn: (APIParams = { tag, user_tag }) => postResearchGroupHead_API({...APIParams}), ...useMutationOptions})
    }

    /**
     * @description Removes a user as head (PI) of the research group. Requires at least curator rights.
     * @param {Object} props
     * @param {String} props.tag Research group tag
     * @param {String} props.user_tag The user tag to remove as head (PI).
     */
    async function deleteResearchGroupHead_API({ tag, user_tag }) {
    const res = await client.delete(`/researchgroups/${tag}/heads/${user_tag}`)
    return res.data
    }
    const useDeleteResearchGroupHead = (useMutationOptions = {}) => {
    return useMutation({mutationFn: (APIParams = { tag, user_tag }) => deleteResearchGroupHead_API({...APIParams}), ...useMutationOptions})
    }

  return {
    useGetResearchGroups,
    useGetResearchGroupsOfUser,
    useGetMyIsHead,
    useGetMyHeadedGroups,
    useGetMySharedSubmissionsOverview,
    useGetSharingOverview,
    useGetMyExploreDisabled,
    useGetResearchGroupExploreDisabled,
    useSetResearchGroupExploreDisabled,
    useGetResearchGroupExploreScope,
    useSetResearchGroupExploreScope,
    useGetResearchGroupExploreScopeTargets,
    useGetResearchGroupHeads,
    usePostResearchGroupHead,
    useDeleteResearchGroupHead,
    useGetResearchGroupUsers,
      useGetResearchGroupByTag,
    useGetResearchGroupSubmissionCount,
    usePostResearchGroup,
    usePatchResearchGroup,
    useDeleteResearchGroupUsers,
    usePostResearchGroupUsers,
    useGetResearchGroupUsersCount,
    useGetResearchGroupsByQuery
  };
}
