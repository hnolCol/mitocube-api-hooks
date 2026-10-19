// States and states changes of a submission 
import { useQuery } from "@tanstack/react-query"


export function createSubmissionCountAPI(client) {

    /**
     * @description Retruns if there are already quantification data for a given submission and quantification type.
     * @param {Object} props 
     * @param {String|String[]} [props.user_tags] User tag(s) restricting the submissions to submissions created or collaborated on by these users (semicolon-delimited if string).
     * @param {String|String[]} [props.ca_tags] Condition application tag(s) restricting the submissions to submissions containing these condition applications (semicolon-delimited if string).
     * @param {Boolean} [props.include_sample_ca=false] If true, sample-level condition applications are matched as well when ca_tags is set.
     * @param {String|String[]} [props.genotype_tags] Genotype tag(s) restricting the submissions to submissions whose samples contain all of these genotypes (semicolon-delimited if string).
     * @returns {import("./types").SubmissionProteinGroupQuantificationCount[]} If quantification data exists 
     */
    async function getSubmissionProteinGroupQuantificationCount_API({ user_tags, ca_tags, include_sample_ca, genotype_tags }) {
        const res = await client.get(`/submissions/quantifications/protein_groups/count`, {
            params: {
                user_tags: Array.isArray(user_tags) && user_tags.length > 0 ? user_tags.join(";") : user_tags,
                ca_tags: Array.isArray(ca_tags) && ca_tags.length > 0 ? ca_tags.join(";") : ca_tags,
                include_sample_ca,
                genotype_tags: Array.isArray(genotype_tags) && genotype_tags.length > 0 ? genotype_tags.join(";") : genotype_tags
            }
        })
        return res.data
    }


    /**
     * @description Returns the number of protein groups in a submission
     * @param {Object} props 
     * @param {String} props.tag The submission tag. If tag is not provided, the endpoint returns the number of protein groups quantified across all submissions.
     * @returns {import("./types").SubmissionProteinGroupQuantificationCount[]} The number of protein groups quantified in the submission
     */
    async function getSubmissionProteinCount_API({ tag }) {
        const res = await client.get(`/submissions/counts/${tag}/protein_groups`, {
            params: {  }
        })
        return res.data
    }

    const useGetSubmissionProteinGroupCount = (APIParams = { tag }, useQueryOptions = { staleTime: 500 }) => {
        
        if (!APIParams.tag) { 

            return useQuery({
                queryKey: ["getSubmissionProteinGroupQuantificationCount", APIParams.user_tags, APIParams.ca_tags, APIParams.include_sample_ca, APIParams.genotype_tags],
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
    async function getSubmissionPeptideCount_API({ tag }) {
        const res = await client.get(`/submissions/counts/${tag}/peptides`, {
            params: {  }
        })
        return res.data
    }

    const useGetSubmissionPeptideCount = (APIParams = {tag}, useQueryOptions = { staleTime: 500}) => {
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
    async function getSubmissionSampleProteinGroupCount_API({ tag }) {

        const res = await client.get(`/submissions/counts/${tag}/samples/protein_groups`, {
            params: {  }
        })
        return res.data
    }

    const useGetSubmissionSampleProteinGroupCount = (APIParams = { tag }, useQueryOptions = { staleTime: 500 }) => {
        
        
        return useQuery({
            queryKey: ["getSubmissionSampleProteinGroupCount", APIParams.tag],
            queryFn: () => getSubmissionSampleProteinGroupCount_API({ ...APIParams }),
            ...useQueryOptions
        });
    }



    /**
     * @description Returns the number of precursors in a submission
     * @param {Object} props 
     * @param {String} props.tag The submission tag.
     * @returns {Object} The number of precursors quantified in the submission
     */
    async function getSubmissionPrecursorCount_API({ tag }) {
        const res = await client.get(`/submissions/counts/${tag}/precursors`, {
            params: {  }
        })
        return res.data
    }

    const useGetSubmissionPrecursorCount = (APIParams = {tag}, useQueryOptions = { staleTime: 500}) => {
        return useQuery({
            queryKey: ["getSubmissionPrecursorCount", APIParams.tag],
            queryFn: () => getSubmissionPrecursorCount_API({ ...APIParams }),
            ...useQueryOptions
        });
    }



    return {
        useGetSubmissionProteinGroupCount,
        useGetSubmissionPeptideCount,
        useGetSubmissionSampleProteinGroupCount,
        useGetSubmissionPrecursorCount
    };
}   