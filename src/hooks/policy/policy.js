import { useQuery, useMutation } from "@tanstack/react-query"

export function createPolicyAPI(client) {

    /** @description Endpoint: GET '/api/policy' */
    async function getPolicy_API() {
        const res = await client.get(`/policy`)
        return res.data
    }

    const useGetPolicy = (APIParams = {}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getPolicy"],
            queryFn: () => getPolicy_API(),
            ...useQueryOptions
        })
    }

    /** @description Endpoint: GET '/api/policy/status' */
    async function getPolicyStatus_API() {
        const res = await client.get(`/policy/status`)
        return res.data
    }

    const useGetPolicyStatus = (APIParams = {}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getPolicyStatus"],
            queryFn: () => getPolicyStatus_API(),
            ...useQueryOptions
        })
    }

    /** @description Endpoint: POST '/api/policy/agree' */
    async function agreePolicy_API() {
        const res = await client.post(`/policy/agree`)
        return res.data
    }

    const useAgreePolicy = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: () => agreePolicy_API(),
            ...useMutationOptions
        })
    }

    /**
     * @description Endpoint: PUT '/api/policy'
     * @param {Object} props
     * @param {String} props.title
     * @param {String} props.text - markdown
     * @param {Boolean} props.required
     * @param {Boolean} props.bump_version - all users must agree again
     */
    async function updatePolicy_API({ title, text, required, bump_version }) {
        const res = await client.put(`/policy`, { title, text, required, bump_version })
        return res.data
    }

    const useUpdatePolicy = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => updatePolicy_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    return {
        useGetPolicy,
        useGetPolicyStatus,
        useAgreePolicy,
        useUpdatePolicy
    }
}