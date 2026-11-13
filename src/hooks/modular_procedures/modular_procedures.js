import { useQuery, useMutation } from "@tanstack/react-query"

export function createQueryModularProceduresAPI(client) {

    /**
     * @description Returns the tags of modular procedures matching the query.
     * @param {Object} props
     * @param {String} props.search_string - The search string
     * @param {String} props.status - The status filter (DRAFT or PUBLISHED)
     * @param {Number} props.limit - The limit
     * @returns {String[]} The modular procedure tags
     */
    async function findModularProcedures_API({ search_string, status, limit }) {
        const res = await client.get(`/procedures/q`, { params: { search_string, status, limit } })
        return res.data
    }

    const useGetModularProceduresByQuery = (APIParams = { search_string, status, limit }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["findModularProcedures", APIParams.search_string, APIParams.status, APIParams.limit],
            queryFn: () => findModularProcedures_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    /**
     * @description Returns a modular procedure by its tag.
     * @param {Object} props
     * @param {String} props.tag - The modular procedure tag
     * @returns {Object} The modular procedure
     */
    async function getModularProcedureByTag_API({ tag }) {
        const res = await client.get(`/procedures/${tag}`)
        return res.data
    }

    const useGetModularProcedureByTag = (APIParams = { tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getModularProcedure", APIParams.tag],
            queryFn: () => getModularProcedureByTag_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    /**
     * @description Returns the submissions linked to a modular procedure.
     * @param {Object} props
     * @param {String} props.tag - The modular procedure tag
     * @returns {Object[]} The linked submissions with created_at, done, done_at and done_by
     */
    async function getModularProcedureSubmissions_API({ tag }) {
        const res = await client.get(`/procedures/${tag}/submissions`)
        return res.data
    }

    const useGetModularProcedureSubmissions = (APIParams = { tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getModularProcedureSubmissions", APIParams.tag],
            queryFn: () => getModularProcedureSubmissions_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    /**
     * @description Returns the modular procedures a submission is linked to, in assignment order.
     * @param {Object} props
     * @param {String} props.submission_tag - The submission tag
     * @returns {Object[]} The ordered procedure links
     */
    async function getSubmissionModularProcedures_API({ submission_tag }) {
        const res = await client.get(`/procedures/submissions/${submission_tag}`)
        return res.data
    }

    const useGetSubmissionModularProcedures = (APIParams = { submission_tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getSubmissionModularProcedures", APIParams.submission_tag],
            queryFn: () => getSubmissionModularProcedures_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    return {
        useGetModularProceduresByQuery,
        useGetModularProcedureByTag,
        useGetModularProcedureSubmissions,
        useGetSubmissionModularProcedures
    }
}

export function createModifyModularProceduresAPI(client) {

    /**
     * @description Creates a new draft modular procedure (curators and admins only).
     * @param {Object} props
     * @param {String} props.title - The title
     * @param {String} props.description - The description
     * @param {String[]} props.condition_application_tags - The condition application tags
     * @param {String[]} props.protocol_tags - The linked protocol tags
     * @returns {Object} The created modular procedure
     */
    async function postModularProcedure_API({ title, description, condition_application_tags, protocol_tags }) {
        const res = await client.post(`/procedures`, { title, description, condition_application_tags, protocol_tags })
        return res.data
    }

    const usePostModularProcedure = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postModularProcedure_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    /**
     * @description Updates a draft modular procedure. Published procedures are immutable.
     * @param {Object} props
     * @param {String} props.tag - The modular procedure tag
     * @param {String} props.title - The title
     * @param {String} props.description - The description
     * @param {String[]} props.condition_application_tags - The condition application tags
     * @param {String[]} props.protocol_tags - The linked protocol tags
     * @returns {Object} The updated modular procedure
     */
    async function updateModularProcedure_API({ tag, title, description, condition_application_tags, protocol_tags }) {
        const res = await client.patch(`/procedures/${tag}`, { title, description, condition_application_tags, protocol_tags })
        return res.data
    }

    const useUpdateModularProcedure = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => updateModularProcedure_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    /**
     * @description Publishes a draft modular procedure: sets the SHA-256 content hash and locks it.
     * @param {Object} props
     * @param {String} props.tag - The modular procedure tag
     * @returns {Object} {tag, version, content_hash}
     */
    async function publishModularProcedure_API({ tag }) {
        const res = await client.post(`/procedures/${tag}/publish`)
        return res.data
    }

    const usePublishModularProcedure = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => publishModularProcedure_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    /**
     * @description Assigns a submission to a modular procedure (curators and admins only).
     * @param {Object} props
     * @param {String} props.tag - The modular procedure tag
     * @param {String} props.submission_tag - The submission tag
     */
    async function linkModularProcedureToSubmission_API({ tag, submission_tag }) {
        const res = await client.post(`/procedures/${tag}/link/${submission_tag}`)
        return res.data
    }

    const useLinkModularProcedureToSubmission = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => linkModularProcedureToSubmission_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    /**
     * @description Removes a submission from a modular procedure.
     * @param {Object} props
     * @param {String} props.tag - The modular procedure tag
     * @param {String} props.submission_tag - The submission tag
     */
    async function unlinkModularProcedureFromSubmission_API({ tag, submission_tag }) {
        const res = await client.delete(`/procedures/${tag}/link/${submission_tag}`)
        return res.data
    }

    const useUnlinkModularProcedureFromSubmission = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => unlinkModularProcedureFromSubmission_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    /**
     * @description Marks a submission as done in a modular procedure so it can proceed to the next one.
     * @param {Object} props
     * @param {String} props.tag - The modular procedure tag
     * @param {String} props.submission_tag - The submission tag
     */
    async function markModularProcedureSubmissionDone_API({ tag, submission_tag }) {
        const res = await client.post(`/procedures/${tag}/link/${submission_tag}/done`)
        return res.data
    }

    const useMarkModularProcedureSubmissionDone = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => markModularProcedureSubmissionDone_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    /**
     * @description Reverts the done flag of a submission in a modular procedure.
     * @param {Object} props
     * @param {String} props.tag - The modular procedure tag
     * @param {String} props.submission_tag - The submission tag
     */
    async function reopenModularProcedureSubmission_API({ tag, submission_tag }) {
        const res = await client.delete(`/procedures/${tag}/link/${submission_tag}/done`)
        return res.data
    }

    const useReopenModularProcedureSubmission = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => reopenModularProcedureSubmission_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    return {
        usePostModularProcedure,
        useUpdateModularProcedure,
        usePublishModularProcedure,
        useLinkModularProcedureToSubmission,
        useUnlinkModularProcedureFromSubmission,
        useMarkModularProcedureSubmissionDone,
        useReopenModularProcedureSubmission
    }
}

export function createExecuteModularProceduresAPI(client) {

    /**
     * @description Executes a published modular procedure on a set of samples (curators and admins only).
     * Maps input plate wells to output plate wells; pooling and splitting are supported.
     * The submissions owning the input samples are marked as done in the procedure.
     * @param {Object} props
     * @param {String} props.tag - The modular procedure tag
     * @param {String} props.input_plate_tag - The input plate tag
     * @param {String} props.output_plate_tag - The output plate tag
     * @param {Array} props.input_wells - [{position, sample_tags, output_positions}]
     * @param {Array} props.output_wells - [{position, condition_application_tags}]
     * @returns {Object} The created procedure execution
     */
    async function executeModularProcedure_API({ tag, input_plate_tag, output_plate_tag, input_wells, output_wells }) {
        const res = await client.post(`/procedures/${tag}/execute`, { input_plate_tag, output_plate_tag, input_wells, output_wells })
        return res.data
    }

    const useExecuteModularProcedure = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => executeModularProcedure_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    /**
     * @description Returns a procedure execution by its tag.
     * @param {Object} props
     * @param {String} props.tag - The procedure execution tag
     * @returns {Object} The procedure execution with input and output wells
     */
    async function getModularProcedureExecution_API({ tag }) {
        const res = await client.get(`/procedures/executions/${tag}`)
        return res.data
    }

    const useGetModularProcedureExecution = (APIParams = { tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getModularProcedureExecution", APIParams.tag],
            queryFn: () => getModularProcedureExecution_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    /**
     * @description Returns the tags of the executions of a modular procedure.
     * @param {Object} props
     * @param {String} props.tag - The modular procedure tag
     * @returns {String[]} The execution tags
     */
    async function getModularProcedureExecutions_API({ tag }) {
        const res = await client.get(`/procedures/${tag}/executions`)
        return res.data
    }

    const useGetModularProcedureExecutions = (APIParams = { tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getModularProcedureExecutions", APIParams.tag],
            queryFn: () => getModularProcedureExecutions_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    return {
        useExecuteModularProcedure,
        useGetModularProcedureExecution,
        useGetModularProcedureExecutions
    }
}
