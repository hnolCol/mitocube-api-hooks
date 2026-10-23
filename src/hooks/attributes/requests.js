import { useQuery, useMutation } from "@tanstack/react-query"

export function createAttributeRequestsAPI(client) {

    // ---------- attribute requests ----------

    /** @description Endpoint: GET '/api/attribute_requests/pending' (curator) */
    async function getPendingAttributeRequests_API({ limit = 50 }) {
        const res = await client.get(`/attribute_requests/pending`, { params: { limit } })
        return res.data
    }

    const useGetPendingAttributeRequests = (APIParams = {}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getPendingAttributeRequests", APIParams],
            queryFn: () => getPendingAttributeRequests_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    /**
     * @description Endpoint: POST '/api/attribute_requests'
     * Priority is not requestable; curators set it when approving.
     * @param {Object} props
     * @param {String} props.text
     * @param {String} [props.abbr]
     * @param {String[]} [props.group_tags]
     * @param {Object[]} [props.traits] - [{ text, description }]
     * @param {Boolean} [props.allow_input]
     * @param {String[]} [props.parents]
     * @param {String[]} [props.children]
     * @param {String[]} [props.required_trait_tags]
     * @param {String} [props.comment]
     */
    async function createAttributeRequest_API({ text, abbr, group_tags, traits, allow_input, parents, children, required_trait_tags, comment }) {
        const res = await client.post(`/attribute_requests`, {
            text, abbr, group_tags, traits, allow_input, parents, children, required_trait_tags, comment
        })
        return res.data
    }

    const useCreateAttributeRequest = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => createAttributeRequest_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    /**
     * @description Endpoint: POST '/api/attribute_requests/{tag}/approve' (curator)
     * @param {Object} props
     * @param {String} props.tag
     * @param {String} [props.comment]
     * @param {Object} [props.attribute] - curator edits: { text, abbr, group_tags, priority, allow_input, parents, children, required_trait_tags }
     */
    async function approveAttributeRequest_API({ tag, comment, attribute }) {
        const res = await client.post(`/attribute_requests/${tag}/approve`, { comment, attribute })
        return res.data
    }

    const useApproveAttributeRequest = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => approveAttributeRequest_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    /** @description Endpoint: POST '/api/attribute_requests/{tag}/deny' (curator) */
    async function denyAttributeRequest_API({ tag, comment }) {
        const res = await client.post(`/attribute_requests/${tag}/deny`, { comment })
        return res.data
    }

    const useDenyAttributeRequest = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => denyAttributeRequest_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    // ---------- trait requests ----------

    /** @description Endpoint: GET '/api/trait_requests/pending' (curator) */
    async function getPendingTraitRequests_API({ limit = 50 }) {
        const res = await client.get(`/trait_requests/pending`, { params: { limit } })
        return res.data
    }

    const useGetPendingTraitRequests = (APIParams = {}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getPendingTraitRequests", APIParams],
            queryFn: () => getPendingTraitRequests_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    /**
     * @description Endpoint: POST '/api/trait_requests'
     * Priority is not requestable; curators set it when approving.
     * @param {Object} props
     * @param {String} props.attribute_tag
     * @param {String} props.text
     * @param {String} [props.description]
     * @param {String} [props.comment]
     */
    async function createTraitRequest_API({ attribute_tag, text, description, comment }) {
        const res = await client.post(`/trait_requests`, { attribute_tag, text, description, comment })
        return res.data
    }

    const useCreateTraitRequest = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => createTraitRequest_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    /**
     * @description Endpoint: POST '/api/trait_requests/{tag}/approve' (curator)
     * @param {Object} props
     * @param {String} props.tag
     * @param {String} [props.comment]
     * @param {Object} [props.trait] - curator edits: { text, description, priority }
     */
    async function approveTraitRequest_API({ tag, comment, trait }) {
        const res = await client.post(`/trait_requests/${tag}/approve`, { comment, trait })
        return res.data
    }

    const useApproveTraitRequest = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => approveTraitRequest_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    /** @description Endpoint: POST '/api/trait_requests/{tag}/deny' (curator) */
    async function denyTraitRequest_API({ tag, comment }) {
        const res = await client.post(`/trait_requests/${tag}/deny`, { comment })
        return res.data
    }

    const useDenyTraitRequest = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => denyTraitRequest_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    async function createTraitRequestsBulk_API({ attribute_tag, traits, comment }) {
        const res = await client.post(`/trait_requests/bulk`, { attribute_tag, traits, comment })
        return res.data
    }

    const useCreateTraitRequestsBulk = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => createTraitRequestsBulk_API({ ...APIParams }),
            ...useMutationOptions
        })
    }
    return {
        useGetPendingAttributeRequests,
        useCreateAttributeRequest,
        useApproveAttributeRequest,
        useDenyAttributeRequest,
        useGetPendingTraitRequests,
        useCreateTraitRequest,
        useApproveTraitRequest,
        useDenyTraitRequest,
        useCreateTraitRequestsBulk
    }
}