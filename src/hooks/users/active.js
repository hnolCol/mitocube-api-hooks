import { useQuery } from "@tanstack/react-query"
import axios from "../axios-setup"

/**
 * @description Retrieves whether the user is active. Endpoint: `/api/users/{tag}/is_active`
 * @param {Object} props
 * @param {String} props.tag  The user tag
 * @returns {Boolean} Whether the user is active or not.
 */
async function getUserActive_API({ tag }) {
    const res = await axios.get(`/api/users/${tag}/is_active`)
    return res.data
}

export const useGetUserIsActive = (APIParams = { tag: "" }, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getUserActive", APIParams.tag],
        queryFn: () => getUserActive_API({ ...APIParams }),
        ...useQueryOptions
    })
}
