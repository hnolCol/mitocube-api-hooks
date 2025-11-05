// States and states changes of a submission 
import { useQuery } from "react-query"
import config from "../../../config"
import axios from "axios"

/**
 * @description Returns the condition applications defined for the submission
 * @param {Object} props 
 * @param {String} props.tag The submission tag.
 * @param {Boolean} props.filter_tag - The filter tag to filter the features before performing the PCA: only features associated with this tag will be used.
 * @returns {Object} The PCA data for the submission
 */
export async function getSubmissionPCA_API({ tag, filter_tag }) {
    const res = await axios.get(`${config.baseURL}/submissions/analysis/${tag}/pca`, {
        params: { filter_tag }
    })
    return res.data
}

export const useGetSubmissionPCA = (APIParams = {tag, filter_tag}, useQueryOptions = { staleTime: 500}) => {
    return useQuery(["getSubmissionPCA", APIParams.tag, APIParams.filter_tag],
        () => getSubmissionPCA_API({ ...APIParams }), useQueryOptions)
}
