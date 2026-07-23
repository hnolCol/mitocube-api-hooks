import { useQuery, useMutation } from "@tanstack/react-query"

export function createModifyProtocolAPI(client) {

    /**
     * @description Adds a protocol to the database and updates the title and text.
     * @param {Object} props
     * @param {String} props.title - The title of the protocol
     * @param {String} props.text - The text of the protocol
     * @returns 
     */
    async function postProtocol_API({title, text}){
        const res = await client.post(`/protocols`, {title, text})
        return res.data
    }

    const usePostProtocol = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postProtocol_API({...APIParams}),
            ...useMutationOptions
        })
    }

    async function updateProtocol_API({tag, title, text}){
            const res = await client.patch(`/protocols/${tag}`, {title, text})
            return res.data
        }

    const useUpdateProtocol = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => updateProtocol_API({...APIParams}),
            ...useMutationOptions
        })
    }   


    async function linkProtocolToSubmission_API({protocol_tag, submission_tag}){
        const res = await client.post(`/protocols/${protocol_tag}/link/${submission_tag}`)
        return res.data
    }

    const useLinkProtocolToSubmission = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => linkProtocolToSubmission_API({...APIParams}),
            ...useMutationOptions
        })
    }   


    async function unlinkProtocolFromSubmission_API({ protocol_tag, submission_tag }) {    
        const res = await client.delete(`/protocols/${protocol_tag}/link/${submission_tag}`)
        return res.data
    }

    const useUnlinkProtocolFromSubmission = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => unlinkProtocolFromSubmission_API({...APIParams}),
            ...useMutationOptions
        })
    }

    return {
        usePostProtocol,
        useUpdateProtocol,
        useLinkProtocolToSubmission,
        useUnlinkProtocolFromSubmission
    }

}
