
import { useQuery, useMutation } from "@tanstack/react-query"


export function createResearchGroupsAPI(client) {

    /**
     * 
     * @param {Object} props 
     * @returns {String[]} Returns the list of research group tags. 
     */
    async function getResearchGroups_API({limit}) {
    const res = await client.get('/researchgroups', {params : {limit}})
    return res.data
    }

    const useGetResearchGroups = (APIParams = {}, useQueryOptions = {}) => {
    return useQuery({queryKey: ["getResearchGroups"], queryFn: () => getResearchGroups_API({...APIParams}), ...useQueryOptions})
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



  return {
    useGetResearchGroups,
    useGetResearchGroupUsers,
      useGetResearchGroupByTag,
    useGetResearchGroupSubmissionCount,
    usePostResearchGroup,
    usePatchResearchGroup,
    useDeleteResearchGroupUsers,
    usePostResearchGroupUsers,
    useGetResearchGroupUsersCount
  };
}
