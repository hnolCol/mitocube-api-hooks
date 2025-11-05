import axios from "axios"
import { useQuery } from "react-query"


/**
 * @description Returns a runlist (if exists) for a given submission,
 * @param {Object} props 
 * @param {String} props.tag - The submission tag
 * @returns 
 */
async function getRunlist_API({tag}) {
    const res = await axios.get(`/api/submissions/${tag}/runlist`)
    return res.data
}
export const useGetRunlist = (APIParams = {}, useQueryOptions = {staleTime : 3000000}) => {
    return useQuery(["submissionStates", APIParams.tag],
        () => getRunlist_API({ ...APIParams }), useQueryOptions)
}
