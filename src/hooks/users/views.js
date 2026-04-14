import { useQuery } from "@tanstack/react-query"
import axios from "axios"

/**
 * @description Retrieves the last views count of a given user (tag). Endpoint: `/api/users/${tag}/views`
 * @param {Object} props 
 * @param {String} props.tag The user tag.
 * @param {String} props.type The type of views to get. One of "submissions", "proteins", "peptides".
 * @param {Number} props.limit The number of items to return. Default is 10.
 * @returns {Number} Tags of the last viewed items 
 */
async function getUserViews_API({ tag, type, limit }) {
    const res = await axios.get(`/api/users/views`, { params: { user_tag: tag, type, limit } })
    return res.data
}

export const useGetUserViews = (APIParams = { tag, type, limit: 20 }, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getUserViews", APIParams.tag, APIParams.type, APIParams.limit],
        queryFn: () => getUserViews_API({ ...APIParams }),
        ...useQueryOptions
    })
}



