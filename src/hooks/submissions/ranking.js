import { useQuery, useMutation } from "react-query"
import config from "../../../config"
import axios from "axios"
/**
 * @description Fetch submissions based on filter criteria. If no filter is provided, it returns all submissions.
 * @param {Object} props 
 * @param {String} props.tag - The submission ranking stats tag t
 * @returns 
 */
async function getSubmissionRanking_API({tag}) {
    const res = await axios.get(`${config.baseURL}/submissions/${tag}/ranking`)
    return res.data 
}
export const useGetSubmissionRanking = (APIParams = {tag}, useQueryOptions = {staleTime : 300000, placeholderData: (prev) => prev}) => {
    return useQuery(["submission_ranking", APIParams.tag],
        () => getSubmissionRanking_API({ ...APIParams }), useQueryOptions)
}


/**
 * @description Fetch submissions based on filter criteria. If no filter is provided, it returns all submissions.
 * @param {Object} props 
 * @param {String} props.tag - The submission ranking stats tag to fetch exclusively quantified protein groups for.
 * @param {String} props.attribute_tags - The attribute tags to filter the exclusively quantified protein groups. Multiple can be provided, separated by semicolons.
 * @param {Number} props.limit - The maximum number of results to return.
 * @returns {import("./types").ExclusivelyQuantifiedProteinGroup[]} Exclusively quantified protein groups for the submission, filtered by the provided attribute tags if given.
 */
async function getSubmissionExclusivelyQuantifiedProteinGroups_API({tag, attribute_tags, limit}) {
    const res = await axios.get(`${config.baseURL}/submissions/${tag}/ranking/exclusively_quantified`, {params: { attribute_tags, limit }})
    return res.data 
}
export const useGetSubmissionExclusivelyQuantifiedProteinGroups = (APIParams = {tag, attribute_tags, limit}, useQueryOptions = {staleTime : 300000, placeholderData: (prev) => prev}) => {
    return useQuery(["submission_exclusively_quantified_protein_groups", APIParams.tag, APIParams.attribute_tags, APIParams.limit],
        () => getSubmissionExclusivelyQuantifiedProteinGroups_API({ ...APIParams }), useQueryOptions)
}


/**
 * @description Update an attribute value in the database. 
 * @param {Object} props 
 * @param {String} props.tag - The submission ranking stats tag to update
 * @returns 
 */
async function patchSubmissionRanking_API({ tag }) {
    const res = await axios.patch(`${config.baseURL}/submissions/${tag}/protein_groups/statistics`    )
    return res 
}

export const useUpdateSubmissionStats = (useMutationOptions = {}) => {
    return useMutation((APIParams) =>  patchSubmissionRanking_API({...APIParams}), useMutationOptions)
}

