import { useMutation, useQuery } from "@tanstack/react-query"

export function createEditUserAPI(client) {

    async function getUserAttributes_API({}) {
        const res = await client.get('/attributes/user')
        return res.data 
    }

    const useGetUserAttributes = (APIParams = {}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getUserAttributes"],
            queryFn: () => getUserAttributes_API({...APIParams}),
            ...useQueryOptions
        })
    }


    async function patchUser_API({ tokenString, userProps }) {
        const res = await client.patch('/users/user',
        userProps,
            {
                headers : {
                    "Authorization": `Bearer ${tokenString}`,
                    'Content-Type': 'application/json'
                }
            })
        return res.data
    }

    const usePatchUser = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => patchUser_API({...APIParams}),
            ...useMutationOptions
        })
    }

    async function postChangePasswordUser_API({ updated_pw }) {
        const res = await client.post('/users/pw', updated_pw)
        return res.data
    }

    const usePostPasswordChange = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postChangePasswordUser_API({...APIParams}),
            ...useMutationOptions
        })
    }

    /**
     * @description Resets a user account: generates a new password (sent to the user's email), disables MFA. Requires admin rights. Endpoint: POST '/api/users/{tag}/reset'
     * @param {Object} props
     * @param {String} props.tag  The user tag
     * @returns {Object} The response of the reset request.
     */
    async function resetUserAccount_API({ tag }) {
        const res = await client.post(`/users/${tag}/reset`, {})
        return res.data
    }

    const usePostResetUserAccount = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => resetUserAccount_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    /**
     * @description Resets the multi-factor authentication of a user, so it can be set up again on the next login. Requires admin rights. Endpoint: POST '/api/users/{tag}/reset_mfa'
     * @param {Object} props
     * @param {String} props.tag  The user tag
     * @returns {Object} The response of the reset request.
     */
    async function resetUserMfa_API({ tag }) {
        const res = await client.post(`/users/${tag}/reset_mfa`, {})
        return res.data
    }

    const usePostResetUserMfa = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => resetUserMfa_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    return {
        useGetUserAttributes,
        usePatchUser,
        usePostPasswordChange,
        usePostResetUserAccount,
        usePostResetUserMfa
    }

}