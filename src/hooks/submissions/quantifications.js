// States and states changes of a submission 
import { useQuery, useMutation } from "@tanstack/react-query"
import config from "../../../config"
import axios from "../axios-setup"



/**
 * @description Endpoint: POST '/api/submissions/:tag/quantifications/proteins'
 * @param {Object} props
 * @param {String} props.tag The submission tag.
 * @param {Array} props.quantifications The protein quantifications to insert.
 * @returns {Boolean} If insertion of view was successful
 */
async function postProteinQuantification_API({ tag, quantifications, apply_statistics = false }) {
    const res = await axios.post(`${config.baseURL}/submissions/${tag}/quantifications/proteins`, { quantifications })
    return res.data
}

export const usePostProteinQuantification = (useMutationOptions = {}) => {
    return useMutation({mutationFn: (APIParams) => postProteinQuantification_API({...APIParams}), ...useMutationOptions})
}


/**
 * @description Endpoint: POST '/api/submissions/:tag/quantifications/precursors'
 * @param {Object} props
 * @param {String} props.tag The submission tag.
 * @param {Array} props.quantifications The protein quantifications to insert.
 * @returns {Boolean} If insertion of view was successful
 */
async function postPrecursorQuantification_API({ tag, quantifications }) {
    const res = await axios.post(`${config.baseURL}/submissions/${tag}/quantifications/precursors`, { quantifications })
    return res.data
}

export const usePostPrecursorQuantification = (useMutationOptions = {}) => {
    return useMutation({mutationFn: (APIParams) => postPrecursorQuantification_API({...APIParams}), ...useMutationOptions})
}





/**
 * @description Retruns if there are already quantification data for a given submission and quantification type.
 * @param {Object} props 
 * @param {String} props.tag The submission tag.
 * @param {String} props.quantification_type The type of quantification to check. E.g., "proteins" or "precursors" or "protein_groups", or any.
 * @returns {Boolean} If quantification data exists 
 */
export async function getSubmissionQuantificationExists_API({ tag, quantification_type}) {
    const res = await axios.get(`${config.baseURL}/submissions/${tag}/quantifications/exists`, {
        params: { quantification_type }
    })
    return res.data
}

export const useGetSubmissionQuantificationExists = (APIParams = {tag, quantification_type}, useQueryOptions = { staleTime: 500}) => {
    return useQuery({
        queryKey: ["getSubmissionQuantificationExists", APIParams.tag, APIParams.quantification_type],
        queryFn: () => getSubmissionQuantificationExists_API({ ...APIParams }),
        ...useQueryOptions
    })
}




