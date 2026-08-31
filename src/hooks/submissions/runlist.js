import { useQuery, useMutation } from "@tanstack/react-query"

export function createSubmissionRunlistAPI(client) {

    /**
     * @description Returns a runlist (if exists) for a given submission,
     * @param {Object} props 
     * @param {String} props.tag - The submission tag
     * @returns 
     */
    
    async function getRunlist_API({ tag, rl_tag }) {               
        const res = await client.get(`/submissions/${tag}/runlist/${rl_tag}`)
        return res.data
    }
    const useGetRunlist = (APIParams = {}, useQueryOptions = {staleTime : 3000000}) => {
        return useQuery({
            queryKey: ["submissionRunlist", APIParams.tag, APIParams.rl_tag],
            queryFn: () => getRunlist_API({ ...APIParams }),
            enabled: !!APIParams.tag && !!APIParams.rl_tag,          
            ...useQueryOptions
        })
    }

    /**
     * @description Returns all runlists for a given submission.
     * @param {Object} props 
     * @param {String} props.tag - The submission tag
     * @returns 
     */
    async function getRunlists_API({ tag }) {                      
        const res = await client.get(`/submissions/${tag}/runlists`)
        return res.data
    }
    const useGetRunlists = (APIParams = {}, useQueryOptions = { staleTime: 3000000 }) => {
        return useQuery({
            queryKey: ["submissionRunlists", APIParams.tag],
            queryFn: () => getRunlists_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    /**
     * @description Create or update a runlist for a given submission. If a runlist already exists for the submission, it will be updated. Otherwise, a new runlist will be created.
     * @param {Object} props 
     * @param {String} props.tag - The submission tag
     */
    async function postRunlist_API({tag, runlist_props}) { 
        const res = await client.post(`/submissions/${tag}/runlist`, runlist_props)
        return res.data
    }
    
    const usePostRunlist = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postRunlist_API({...APIParams}), 
            ...useMutationOptions
        })
    }

    /**
     * @description Deletes the runlist for a given submission if it exists.
     * @param {Object} props 
     * @param {String} props.tag - The submission tag
     * @returns 
     */
    async function deleteRunlist_API({ tag, rl_tag }) {             
        const res = await client.delete(`/submissions/${tag}/runlist/${rl_tag}`)
        return res.data
    }

    const useDeleteRunlist = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => deleteRunlist_API({...APIParams}), 
            ...useMutationOptions
        })
    }   

    return {        
        useGetRunlist,
        useGetRunlists,
        usePostRunlist,
        useDeleteRunlist
    };

}