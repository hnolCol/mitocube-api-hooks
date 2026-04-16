import { useMutation, useQuery } from "@tanstack/react-query"

export function createCoreUsersAPI(client) {

    /**
     * @description Endpoint: POST '/api/users'
     * @param {Object} props 
     * @param {} props.userProps
     */
    async function postUser_API({ firstname, lastname, email, role, research_group, institute }) {
        const res = await client.post('/users',
        { firstname, lastname, email, role, research_group, institute }
        )
        return res.data 
    }

    const usePostUser = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postUser_API({...APIParams}),
            ...useMutationOptions
        })
    }



    /**
     * @description Endpoint: POST '/api/users'
     * @param {Object} props 
     * @param {} props.userProps
     */
    async function patchUser_API({ firstname, lastname, email, role, research_group, institute }) {
        const res = await client.patch('/users',
            {}, { params: { firstname, lastname, email, role, research_group, institute } }
        )
        return res.data 
    }

    const usePatchUser = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => patchUser_API({...APIParams}),
            ...useMutationOptions
        })
    }




    /**
     * @description Returns the public information about a user by its tag. Still requires a valid token string. Public indicates here that it is available to all registered users. 
     * @returns {import("./types").PublicUser} The public information about the users in the database as an array.
     */
    async function getPublicUsersByTag_API({tag}) {
        const res = await client.get(`/users/${tag}`)
        return res.data
    }

    const useGetPublicUserByTag = (APIParams = {}, useQueryOptions = {staleTime: Infinity}) => {
        return useQuery({
            queryKey: ["getPublicUserByLabel", APIParams.tag],
            queryFn: () => getPublicUsersByTag_API({...APIParams}),
            ...useQueryOptions
        })
    }

    return {
        usePostUser,
        usePatchUser,
        useGetPublicUserByTag
    }

}