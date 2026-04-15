// States and states changes of a submission 
import { useQuery, useMutation } from "@tanstack/react-query"


export function createSubmissionStateAPI(client) {


    /**
     * @description Returns the current state of a submission.
     * @param {Object} props 
     * @param {String} props.tag The submission tag.
     * @returns {Number} The state of the submission given as the number
     */
    async function getSubmissionState_API({ tag }) {
        const res = await client.get(`/submissions/${tag}/state`)
        return res.data
    }
            
    const useGetSubmissionState = (APIParams = {tag}, useQueryOptions = { staleTime: 500}) => {
        return useQuery({
            queryKey: ["getSubmissionState", APIParams.tag],
            queryFn: () => getSubmissionState_API({ ...APIParams }),
            ...useQueryOptions
        })
    }



    /**
     * @description Updates the state of the submission. A state can go in both directions. 
     * @param {Object} props 
     * @param {String} props.tag Submission tag 
     * @param {Number} props.state The new state of the submission. 
     */
    async function patchSubmissionState_API({ tag, state }) {
    
        const res = await client.patch(`/submissions/${tag}/state/${state}`)
        return res.data
    }

    const usePatchSubmissionState = (useMutationOptions = {}) => {
        return useMutation({mutationFn: (APIParams) => patchSubmissionState_API({...APIParams}), ...useMutationOptions})
    }


    /**
     * @description Returns the current state of a submission.
     * @param {Object} props 
     * @param {String} props.state The submission state to get the counts for.
     * @returns {Number} The number of submissions in the given state
     */
    async function getSubmissionStateCount_API({ state }) {
        const res = await client.get(`/submissions/counts/states/${state}`)
        return res.data
    }
            
    const useGetSubmissionStateCount = (APIParams = {state}, useQueryOptions = { staleTime: 2000}) => {
        return useQuery({
            queryKey: ["getSubmissionStateNumber", APIParams.state],
            queryFn: () => getSubmissionStateCount_API({ ...APIParams }),
            ...useQueryOptions
        })
    }


    /**
     * @description Returns the available states of a submission from the API.
     * @returns {String[]} - The available submission state tags.
     */
    async function getSubmissionStates_API() {
        const res = await client.get('/submissions/states')
        return res.data
    }

    const useGetStates = (APIParams = {}, useQueryOptions = {staleTime : Infinity}) => {
        return useQuery({
            queryKey: ["submissionStates"],
            queryFn: () => getSubmissionStates_API({...APIParams}),
            ...useQueryOptions
        })
    }

    return {
        useGetSubmissionState,
        usePatchSubmissionState,
        useGetSubmissionStateCount,
        useGetStates
    }
}
