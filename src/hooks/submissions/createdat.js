import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import config from "../../../config";
/**
 * @description Returns the title of the submission.
 * @param {Object} props 
 * @param {String} props.tag The submission tag
 * @returns {String} The title of the submission. If the tag is not
 * assiciated with a submission an error is returned.
 */

export async function getSubmissionCreatedAt_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/submissions/${tag}/createdat`)
    return res.data
}

export const useGetSubmissionCreatedAt = (APIParams = {tag}, useQueryOptions = { staleTime: Infinity}) => {
    return useQuery({
        queryKey: ["getSubmissionCreatedAt", APIParams.tag],
        queryFn: () => getSubmissionCreatedAt_API({ ...APIParams }),
        ...useQueryOptions
    })
}
