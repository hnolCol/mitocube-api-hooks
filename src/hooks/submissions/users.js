// States and states changes of a submission 
import { useQuery, useMutation } from "@tanstack/react-query"

export function createSubmissionUsersAPI(client) {  

    /**
     * @description Returns the condition applications defined for the submission
     * @param {Object} props 
     * @param {String} props.tag The submission tag.
     * @param {Boolean} props.group_by_attribute - If true, the results are grouped by attribute.
     * @returns {Object} The condition applications for the submission
     */
    async function getSubmissionUsers_API({ tag }) {
        const res = await client.get(`/submissions/${tag}/users`, {
        })
        return res.data
    }

    const useGetSubmissionUsers = (APIParams = {tag }, useQueryOptions = { staleTime: 50000, placeHolderData : prev => prev || []}) => {
        return useQuery({
            queryKey: ["getSubmissionUsers", APIParams.tag],
            queryFn: () => getSubmissionUsers_API({ ...APIParams }),
            ...useQueryOptions
        })
    }


    /**
     * @description Returns the creator (owner) user tag of a submission.
     * @param {Object} props 
     * @param {String} props.tag The submission tag.
     * @returns {String} The user tag of the creator (owner) of the submission.
     */
    async function getSubmissionOwner_API({ tag }) {
        const res = await client.get(`/submissions/${tag}/owner`)
        return res.data
    }

    const useGetSubmissionOwner = (APIParams = { tag }, useQueryOptions = { staleTime: 50000 }) => {
        return useQuery({
            queryKey: ["getSubmissionOwner", APIParams.tag],
            queryFn: () => getSubmissionOwner_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    /**
     * @description Changes the creator (owner) of a submission.
     * @param {Object} props 
     * @param {String} props.tag The submission tag.
     * @param {String} props.user_tag The user tag of the new owner.
     * @param {Boolean} props.add_prev_user_to_collaborators - If true, the previous owner is added to the collaborators list.
     * @returns {Object} The updated submission information.
     */
    async function changeSubmissionOwner_API({ tag, user_tag, add_prev_user_to_collaborators = false }) {
        const res = await client.post(`/submissions/${tag}/owner`, null, {
            params: { user_tag, add_prev_user_to_collaborators }
        })
        return res.data
    }

    const useChangeSubmissionOwner = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => changeSubmissionOwner_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    /**
     * @description Sets or extends the collaborators of a submission.
     * @param {Object} props 
     * @param {String} props.tag The submission tag.
     * @param {Array} props.collaborators An array of user tags to be added as collaborators.
     * @param {Boolean} props.replace If true, the existing collaborators are replaced with the new list. If false, the new collaborators are added to the existing list.
     * @returns {Object} The updated submission information.
     */
    async function setSubmissionCollaborators_API({ tag, collaborators, replace = true }) {
        const res = await client.post(`/submissions/${tag}/collaborators`, null, {
            params: { collaborators, replace }
        })
        return res.data
    }

    const useSetSubmissionCollaborators = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => setSubmissionCollaborators_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

        /**
     * @description Returns the user tags of the collaborators of a submission.
     * @param {Object} props
     * @param {String} props.tag The submission tag.
     * @returns {Array} The user tags of the collaborators of the submission.
     */
    async function getSubmissionCollaborators_API({ tag }) {
        const res = await client.get(`/submissions/${tag}/collaborators`)
        return res.data
    }

    const useGetSubmissionCollaborators = (APIParams = { tag }, useQueryOptions = { staleTime: 50000 }) => {
        return useQuery({
            queryKey: ["getSubmissionCollaborators", APIParams.tag],
            queryFn: () => getSubmissionCollaborators_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    /**
     * @description Removes the collaboration access of one user for a submission. Requires the
     * creator of the submission, the head (PI) of the creators research group or a curator.
     * @param {Object} props
     * @param {String} props.tag The submission tag.
     * @param {String} props.user_tag The user tag whose collaboration access is removed.
     * @returns {Boolean} Returns true on success.
     */
    async function deleteSubmissionCollaborator_API({ tag, user_tag }) {
        const res = await client.delete(`/submissions/${tag}/collaborators/${user_tag}`)
        return res.data
    }

    const useDeleteSubmissionCollaborator = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => deleteSubmissionCollaborator_API({ ...APIParams }),
            ...useMutationOptions
        })
    }


    return {        
        useGetSubmissionUsers,
        useGetSubmissionOwner,
        useChangeSubmissionOwner,
        useSetSubmissionCollaborators,
        useGetSubmissionCollaborators,
        useDeleteSubmissionCollaborator
    };

}



