import { useQuery, useMutation } from "@tanstack/react-query"


export function createSubmissionMetatextAPI(client) {


    async function getResearchAim_API({ tag }) {
        const res = await client.get(`/submissions/${tag}/researchaim`)
        return res.data 
    }
    const useGetResearchAim = (APIParams = {tag}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["researchAimByTag", APIParams.tag],
            queryFn: () => getResearchAim_API({...APIParams}),
            ...useQueryOptions
        })
    }

    /**
     * @description Inserts the research aim for a given submission.
     * @param {Object} props
     * @param {String} props.submission_tag The submission tag to add values for
     * @returns 
     */
    async function postResearchAim_API({submission_tag, research_aim}){
        const res = await client.post(`/submissions/${submission_tag}/researchaim`, { research_aim })
        return res.data
    }

    const usePostResearchAim = (useMutationOptions = {}) => {
        return useMutation({mutationFn: (APIParams) => postResearchAim_API({...APIParams}), ...useMutationOptions})
    }

    /**
     * @description Updates the research aim for a given submission.
     * @param {Object} props
     * @param {String} props.submission_tag The submission tag to update values for
     * @returns 
     */
    async function patchResearchAim_API({submission_tag, research_aim}){
        const res = await client.patch(`/submissions/${submission_tag}/researchaim`, { research_aim })
        return res.data
    }

    const usePatchResearchAim = (useMutationOptions = {}) => {
        return useMutation({mutationFn: (APIParams) => patchResearchAim_API({...APIParams}), ...useMutationOptions})
    }

    async function getSubmissionMetatexts_API({ }) {
        const res = await client.get(`/submissions/metatext`)
        return res.data 
    }
    const useGetMetatextForSubmission = (APIParams = {}, useQueryOptions = {staleTime : Infinity}) => {
        return useQuery({
            queryKey: ["metatextForSubmissions"],
            queryFn: () => getSubmissionMetatexts_API({...APIParams}),
            ...useQueryOptions
        });
    }


    async function getSubmissionMetatextTags_API({ tag }) {
        const res = await client.get(`/submissions/${tag}/metatext`)
        return res.data 
    }
    const useGetMetatexts = (APIParams = {tag}, useQueryOptions = {staleTime : 300000}) => {
        return useQuery({
            queryKey: ["metatextForSubmissions", APIParams.tag],
            queryFn: () => getSubmissionMetatextTags_API({...APIParams}),
            ...useQueryOptions
        });
    }



    /**
     * @description Returns a metatext for a given submission (text) by the metatext tag. Endpoint: `/api/submissions/${tag}/metatext/${metatext_tag}`
     * @param {Object} props 
     * @param {String} props.tag - The submission tag 
     * @param {String} props.metatext_tag - The metatext tag 
     * @returns 
     */
    async function getSpecificSubmissionMetatextsByTag_API({tag, metatext_tag}) {
        const res = await client.get(`/submissions/${tag}/metatext/${metatext_tag}`)
        return res.data 
    }
    const useGetSubmissionMetatextByTag = (APIParams = {tag, metatext_tag}, useQueryOptions = {staleTime : 30000000}) => {
        return useQuery({
            queryKey: ["submissionMetaText", APIParams.tag, APIParams.metatext_tag],
            queryFn: () => getSpecificSubmissionMetatextsByTag_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    /**
     * @description Inserts a metatext for a given submission.
     * @param {Object} props
     * @param {String} props.submission_tag The submission tag to add values for
     * @returns 
     */
    async function postMetatext_API({submission_tag, title, text}){
        const res = await client.post(`/submissions/${submission_tag}/metatext`, { title, text })
        return res.data
    }

    const usePostMetatext = (useMutationOptions = {}) => {
        return useMutation({mutationFn: (APIParams) => postMetatext_API({...APIParams}), ...useMutationOptions})
    }
    

    return {
        useGetResearchAim,
        usePostResearchAim,
        usePatchResearchAim,    
        useGetMetatextForSubmission,
        useGetMetatexts,
        useGetSubmissionMetatextByTag,
        usePostMetatext
  };
}


