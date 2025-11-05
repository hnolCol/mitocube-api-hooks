// States and states changes of a submission 
import { useQuery } from "react-query"
import config from "../../../config"
import axios from "axios"

/**
 * @description Returns the number of protein groups in a submission
 * @param {Object} props 
 * @param {String} props.tag The submission tag.
 * @returns {Object} Te number of protein groups quantified in the submission
 */
export async function getSubmissionProteinCount_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/submissions/counts/${tag}/protein_groups`, {
        params: {  }
    })
    return res.data
}

export const useGetSubmissionProteinGroupCount = (APIParams = {tag}, useQueryOptions = { staleTime: 500}) => {
    return useQuery(["getSubmissionProteinCount", APIParams.tag],
        () => getSubmissionProteinCount_API({ ...APIParams }), useQueryOptions)
}



/**
 * @description Returns the number of peptides in a submission
 * @param {Object} props 
 * @param {String} props.tag The submission tag.
 * @returns {Object} The number of peptides quantified in the submission
 */
export async function getSubmissionPeptideCount_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/submissions/counts/${tag}/peptides`, {
        params: {  }
    })
    return res.data
}

export const useGetSubmissionPeptideCount = (APIParams = {tag}, useQueryOptions = { staleTime: 500}) => {
    return useQuery(["getSubmissionPeptideCount", APIParams.tag],
        () => getSubmissionPeptideCount_API({ ...APIParams }), useQueryOptions)
}
