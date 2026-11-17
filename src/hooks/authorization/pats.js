import { useMutation, useQuery } from "@tanstack/react-query"

/**
 * @description Creates, lists and revokes personal access tokens (PATs)
 * for non-interactive API access, e.g. automated QC run uploads from a
 * script. The plain token is only returned once at creation and should be
 * stored in the environment of the script that uses it.
 * @param {Object} client - The http client.
 * @returns {Object} The PAT hooks.
 */
export function createPATsAPI(client) {

    /** Creates a personal access token. Returns the plain token exactly once. */
    async function createPAT_API({ patProps }) {
        const res = await client.post('/auth/pats', patProps)
        return res.data
    }

    const useCreatePAT = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => createPAT_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    /** Returns all personal access tokens of the logged in user (metadata only). */
    async function getPATs_API({}) {
        const res = await client.get('/auth/pats')
        return res.data
    }

    const useGetPATs = (useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getPATs"],
            queryFn: () => getPATs_API({}),
            ...useQueryOptions
        })
    }

    /** Revokes one of the personal access tokens of the logged in user. */
    async function revokePAT_API({ patTag }) {
        const res = await client.delete(`/auth/pats/${patTag}`)
        return res.data
    }

    const useRevokePAT = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => revokePAT_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    /** Returns all personal access tokens of a user. Requires admin rights. */
    async function getUserPATs_API({ userTag }) {
        const res = await client.get(`/auth/pats/user/${userTag}`)
        return res.data
    }

    const useGetUserPATs = (APIParams = {}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getUserPATs", APIParams.userTag],
            queryFn: () => getUserPATs_API({ ...APIParams }),
            enabled: Boolean(APIParams.userTag),
            ...useQueryOptions
        })
    }

    /** Revokes any personal access token. Requires admin rights. */
    async function revokePATAsAdmin_API({ patTag }) {
        const res = await client.delete(`/auth/pats/admin/${patTag}`)
        return res.data
    }

    const useRevokePATAsAdmin = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => revokePATAsAdmin_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    /** Blocks or unblocks PAT creation of a user. Requires admin rights. */
    async function setPATCreationBlocked_API({ userTag, blocked }) {
        const res = await client.patch(`/auth/pats/user/${userTag}/creation`,
            { blocked },
            { headers: { "Content-Type": "application/json" } })
        return res.data
    }

    const useSetPATCreationBlocked = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => setPATCreationBlocked_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    return {
        useCreatePAT,
        useGetPATs,
        useRevokePAT,
        useGetUserPATs,
        useRevokePATAsAdmin,
        useSetPATCreationBlocked
    }
}
