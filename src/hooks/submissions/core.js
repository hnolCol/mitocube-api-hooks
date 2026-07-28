
import { useQuery, useMutation } from "@tanstack/react-query"


export function createSubmissionCoreAPI(client) {

        /**
     * @description Returns the title of the submission.
     * @param {Object} props 
     * @param {String} props.tag The submission tag
     * @returns {String} The title of the submission. If the tag is not
     * assiciated with a submission an error is returned.
     */

    async function getSubmissionCreatedAt_API({ tag }) {
        const res = await client.get(`/submissions/${tag}/createdat`)
        return res.data
    }

    const useGetSubmissionCreatedAt = (APIParams = {tag}, useQueryOptions = { staleTime: Infinity}) => {
        return useQuery({
            queryKey: ["getSubmissionCreatedAt", APIParams.tag],
            queryFn: () => getSubmissionCreatedAt_API({ ...APIParams }),
            ...useQueryOptions
        })
    }


        /**
     * @description Returns if the submission exists in the database.
     * @param {Object} props 
     * @param {String} props.tag The submission tag
     * @returns {Boolean} True if the submission exists, false otherwise.
     */

    async function getSubmissionExists_API({ tag }) {
        const res = await client.get(`/submissions/${tag}/exists`)
        return res.data
    }

    const useGetSubmissionExists = (APIParams = {tag}, useQueryOptions = { staleTime: 2000000}) => {
        return useQuery({
            queryKey: ["getSubmissionExists", APIParams.tag],
            queryFn: () => getSubmissionExists_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    async function checkSubmission_API({ tag }) {
        const res = await client.get(`/submissions/${tag}/check`)
        return res.data
    }
    
    const useCheckSubmission = (APIParams = {}, useQueryOptions = { staleTime: 30000 }) => {
        return useQuery({
            queryKey: ["submissionCheck", APIParams.tag],
            queryFn: () => checkSubmission_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    async function getSubmissionHasGenotype_API({ tag }) {
        const res = await client.get(`/submissions/${tag}/genotypes/exists`)
        return res.data
    }
    
    const useGetSubmissionHasGenotype = (APIParams = {tag}, useQueryOptions = { staleTime: Infinity }) => {
        return useQuery({
            queryKey: ["submissionHasGenotype", APIParams.tag],
            queryFn: () => getSubmissionHasGenotype_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    async function getSubmissionProteomes_API({ tag }) {
        const res = await client.get(`/submissions/${tag}/proteomes`)
        return res.data
    }
    
    const useGetSubmissionProteomes = (APIParams = {tag}, useQueryOptions = { staleTime: Infinity }) => {
        return useQuery({
            queryKey: ["submissionProteomes", APIParams.tag],
            queryFn: () => getSubmissionProteomes_API({ ...APIParams }),
            ...useQueryOptions
        })
    }


    async function getSubmissionTag_API({}) {
        const res = await client.get('/submissions/tag')
        return res.data
    }

    const useGetSubmissionTag = (APIParams = {}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getSubmissionTAG"],
            queryFn: () => getSubmissionTag_API({...APIParams}),
            ...useQueryOptions
        })
    }


    // submit submission
    async function postSubmission_API({ submission }) {
        const res = await client.post('/submissions', submission)
        return res.data
    }

    const usePostSubmission = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postSubmission_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    


    return {
        useGetSubmissionExists,
        useGetSubmissionCreatedAt,
        useCheckSubmission,
        useGetSubmissionHasGenotype,
        useGetSubmissionProteomes,
        useGetSubmissionTag,
        usePostSubmission
  };
}


