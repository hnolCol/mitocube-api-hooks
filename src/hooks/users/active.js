import { useQuery, useMutation } from "@tanstack/react-query"

export function createQueryUserActiveAPI(client) {

    /**
     * @description Retrieves whether the user is active. Endpoint: `/api/users/{tag}/is_active`
     * @param {Object} props
     * @param {String} props.tag  The user tag
     * @returns {Boolean} Whether the user is active or not.
     */
    async function getUserActive_API({ tag }) {
        const res = await client.get(`/users/${tag}/is_active`)
        return res.data
    }

    const useGetUserIsActive = (APIParams = { tag: "" }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getUserActive", APIParams.tag],
            queryFn: () => getUserActive_API({ ...APIParams }),
            ...useQueryOptions
        })
    }


    /**
     * @description Checks if a user exists by its tag. Endpoint: `/api/users/{tag}/exists`
     * @param {Object} props
     * @param {String} props.tag  The user tag
     * @returns {Boolean} Whether the user exists.
     */
    async function getUserExists_API({ tag }) {
        const res = await client.get(`/users/${tag}/exists`)
        return res.data
    }

    const useGetUserExists = (APIParams = { tag: "" }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getUserExists", APIParams.tag],
            queryFn: () => getUserExists_API({ ...APIParams }),
            ...useQueryOptions
        })
    }


    /**
     * @description Blocks a user by its tag. The user is not able to login. Requires admin rights. Endpoint: POST '/api/users/{tag}/block'
     * @param {Object} props
     * @param {String} props.tag  The user tag
     * @returns {Object} The response of the block request.
     */
    async function blockUser_API({ tag }) {
        const res = await client.post(`/users/${tag}/block`, {})
        return res.data
    }

    const usePostBlockUser = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => blockUser_API({ ...APIParams }),
            ...useMutationOptions
        })
    }


    return {
        useGetUserIsActive,
        useGetUserExists,
        usePostBlockUser
    };
}