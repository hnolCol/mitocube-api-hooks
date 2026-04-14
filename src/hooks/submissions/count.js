// States and states changes of a submission 
import { useQuery } from "@tanstack/react-query"
import config from "../../../config"
import axios from "axios"



/**
 * @description Retruns if there are already quantification data for a given submission and quantification type.
 * @param {Object} props 
 * @returns {import("./types").SubmissionProteinGroupQuantificationCount[]} If quantification data exists 
 */
export async function getSubmissionProteinGroupQuantificationCount_API({ }) {
    const res = await axios.get(`${config.baseURL}/submissions/quantifications/protein_groups/count`, {
        params: {}
    })
    return res.data
}


/**
 * @description Returns the number of protein groups in a submission
 * @param {Object} props 
 * @param {String} props.tag The submission tag. If tag is not provided, the endpoint returns the number of protein groups quantified across all submissions.
 * @returns {import("./types").SubmissionProteinGroupQuantificationCount[]} The number of protein groups quantified in the submission
 */
export async function getSubmissionProteinCount_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/submissions/counts/${tag}/protein_groups`, {
        params: {  }
    })
    return res.data
}

export const useGetSubmissionProteinGroupCount = (APIParams = { tag }, useQueryOptions = { staleTime: 500 }) => {
    
    if (!APIParams.tag) { 

        return useQuery({
            queryKey: ["getSubmissionProteinGroupQuantificationCount"],
            queryFn: () => getSubmissionProteinGroupQuantificationCount_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    return useQuery({
        queryKey: ["getSubmissionProteinCount", APIParams.tag],
        queryFn: () => getSubmissionProteinCount_API({ ...APIParams }),
        ...useQueryOptions
    });
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
    return useQuery({
        queryKey: ["getSubmissionPeptideCount", APIParams.tag],
        queryFn: () => getSubmissionPeptideCount_API({ ...APIParams }),
        ...useQueryOptions
    });
}




/**
 * @description Returns the number of peptides in a submission
 * @param {Object} props 
 * @param {String} props.tag The submission tag.
 * @returns {import("./types").SubmissionSampleCounts[]} The number protein groups quantified in the submission
 */
export async function getSubmissionSampleProteinGroupCount_API({ tag }) {

    const res = await axios.get(`${config.baseURL}/submissions/counts/${tag}/samples/protein_groups`, {
        params: {  }
    })
    return res.data
}

export const useGetSubmissionSampleProteinGroupCount = (APIParams = { tag }, useQueryOptions = { staleTime: 500 }) => {
    
    
    return useQuery({
        queryKey: ["getSubmissionSampleProteinGroupCount", APIParams.tag],
        queryFn: () => getSubmissionSampleProteinGroupCount_API({ ...APIParams }),
        ...useQueryOptions
    });
}






