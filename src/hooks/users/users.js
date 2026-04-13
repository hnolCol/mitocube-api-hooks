import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import config from "../../../config"

/**
 * @description Endpoint: POST '/api/users'
 * @param {Object} props 
 * @param {} props.userProps
 */
async function postUser_API({ firstname, lastname, email, role, research_group, institute }) {
    const res = await axios.post('/api/users',
    { firstname, lastname, email, role, research_group, institute }
    )
    return res.data 
}

export const usePostUser = (useMutationOptions = {}) => {
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
    const res = await axios.patch('/api/users',
        {}, { params: { firstname, lastname, email, role, research_group, institute } }
    )
    return res.data 
}

export const usePatchUser = (useMutationOptions = {}) => {
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
    const res = await axios.get(`${config.baseURL}/users/${tag}`)
    return res.data
}

export const useGetPublicUserByTag = (APIParams = {}, useQueryOptions = {staleTime: Infinity}) => {
    return useQuery({
        queryKey: ["getPublicUserByLabel", APIParams.tag],
        queryFn: () => getPublicUsersByTag_API({...APIParams}),
        ...useQueryOptions
    })
}
