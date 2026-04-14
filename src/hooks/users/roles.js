import { useQuery } from "@tanstack/react-query"
import axios from "axios"

/**
 * @description Retrieves the available user roles. Endpoint: '/api/users/roles'
 * @param {*} param0 
 * @returns 
 */
async function getUserRoles_API({ }) {
    const res = await axios.get('/api/users/roles')
    return res.data
}

export const useGetUserRoles = (APIParams = {}, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getUserRoles"],
        queryFn: () => getUserRoles_API({...APIParams}),
        ...useQueryOptions
    })
}

/**
 * @description Retrieves the role of a given user (tag). Endpoint: `/api/users/roles/${tag}`
 * @param {Object} props 
 * @param {String} props.tag 
 * @returns {Number} The role of the user.
 */
async function getUserRoleByTag_API({ tag }) {
    const res = await axios.get(`/api/users/roles/${tag}`)
    return res.data
}

export const useGetUserRoleByTag = (APIParams = { tag }, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getUserRoles", APIParams.tag],
        queryFn: () => getUserRoleByTag_API({...APIParams}),
        ...useQueryOptions
    })
}
