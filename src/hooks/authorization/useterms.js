import { useMutation } from "@tanstack/react-query"

/**
 * @description Acceptance of the terms of use. If terms of use are in
 * force, API access is blocked until they are accepted via this hook.
 * @param {Object} client - The http client.
 * @returns {Object} The use terms hooks.
 */
export function createAcceptUseTermsAPI(client) {

    /** Records the acceptance (or rejection) of the terms of use by a user. */
    async function acceptUseTerms_API({ userTag, accept }) {
        const res = await client.post(`/auth/user/${userTag}/useterms`,
            null,
            { params: { accept } })
        return res.data
    }

    const useAcceptUseTerms = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => acceptUseTerms_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    return {
        useAcceptUseTerms
    }
}
