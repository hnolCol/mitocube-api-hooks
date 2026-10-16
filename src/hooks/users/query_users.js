import { useMutation, useQuery } from "@tanstack/react-query"
export function createQueryUsersByQueryAPI(client) {
    /**
     * @description Returns the public information about the users. Still requires a valid token string. Public indicates here that it is available to all registered users. 
     * @param {Object} props 
     * @param {String} props.query 
     * @param {Number[]} props.roles - The user roles (UserRolesEnum ints) to filter for, e.g. [2, 4].
     * @returns {String[]} The user tag.
     */
    async function getPublicUsersByQuery_API({ search_string, roles, limit }) {
        const res = await client.get('/users/q', {params : { search_string, roles: Array.isArray(roles) && roles.length > 0 ? roles.join(';') : roles, limit }})
        return res.data
    }
    const useGetUserByQuery = (APIParams = {search_string, roles, limit}, useQueryOptions = {staleTime: 500000, placeholderData: (prev) => prev ? prev : []}) => {
        return useQuery({
            queryKey: ["getUserQuery", APIParams.search_string, APIParams.roles, APIParams.limit],
            queryFn: () => getPublicUsersByQuery_API({...APIParams}),
            ...useQueryOptions
        })
    }
    /**
     * @description Changes the role of a user by its tag. Requires admin rights. Endpoint: `/api/users/{user_tag}/role`
     * @param {Object} props 
     * @param {String} props.user_tag - The tag of the user whose role should be changed. 
     * @param {Number} props.role - The new role of the user (UserRolesEnum int).
     * @returns {Boolean} True if the role was changed successfully.
     */
    async function postChangeUserRole_API({ user_tag, role }) {
        const res = await client.post(`/users/${user_tag}/role`, null, { params: { role } })
        return res.data
    }
    const usePostUserRoleChange = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postChangeUserRole_API({...APIParams}),
            ...useMutationOptions
        })
    }
    return {
        useGetUserByQuery,
        usePostUserRoleChange
    }
}
