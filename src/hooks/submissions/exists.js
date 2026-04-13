import axios from "../axios-setup"
import { useQuery } from "@tanstack/react-query"
import config from "../../../config";
/**
 * @description Returns if the submission exists in the database.
 * @param {Object} props 
 * @param {String} props.tag The submission tag
 * @returns {Boolean} True if the submission exists, false otherwise.
 */

export async function getSubmissionExists_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/submissions/${tag}/exists`)
    return res.data
}

export const useGetSubmissionExists = (APIParams = {tag}, useQueryOptions = { staleTime: 2000000}) => {
    return useQuery({
        queryKey: ["getSubmissionExists", APIParams.tag],
        queryFn: () => getSubmissionExists_API({ ...APIParams }),
        ...useQueryOptions
    });
}
