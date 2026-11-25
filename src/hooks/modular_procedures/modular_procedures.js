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
    async function findModularProcedures_API({ search_string, status, limit, latest_only }) {
        const res = await client.get(`/procedures/q`, { params: { search_string, status, limit, latest_only } })
        return res.data
    }

    const useGetModularProceduresByQuery = (APIParams = { search_string, status, limit, latest_only }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["findModularProcedures", APIParams.search_string, APIParams.status, APIParams.limit, APIParams.latest_only],
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

    /**
     * @description Returns the current plate locations of the samples of a submission: for every
     * sample the wells of its most recent procedure execution (input and output plate), so the
     * submission overview can show where the samples physically are — including executions that
     * failed (the samples stay on the plate). Restricted users cannot query foreign submissions.
     * @param {Object} props
     * @param {String} props.submission_tag - The submission tag
     * @returns {Object[]} The sample locations [{sample_tag, procedure_tag, execution_tag,
     * execution_status, created_at, wells: [{plate_tag, position, side}]}]
     */
    async function getSubmissionSampleLocations_API({ submission_tag }) {
        const res = await client.get(`/procedures/submissions/${submission_tag}/wells`)
        return res.data
    }

    const useGetSubmissionSampleLocations = (APIParams = { submission_tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getSubmissionSampleLocations", APIParams.submission_tag],
            queryFn: () => getSubmissionSampleLocations_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    /**
     * @description Returns the tags of all versions in the lineage of a modular procedure, oldest first.
     * @param {Object} props
     * @param {String} props.tag - The modular procedure tag
     * @returns {String[]} The version tags
     */
    async function getModularProcedureVersions_API({ tag }) {
        const res = await client.get(`/procedures/${tag}/versions`)
        return res.data
    }

    const useGetModularProcedureVersions = (APIParams = { tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getModularProcedureVersions", APIParams.tag],
            queryFn: () => getModularProcedureVersions_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    return {
        useGetModularProceduresByQuery,
        useGetModularProcedureByTag,
        useGetModularProcedureSubmissions,
        useGetSubmissionModularProcedures,
        useGetSubmissionSampleLocations,
        useGetModularProcedureVersions
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
    async function postModularProcedure_API({ title, description, condition_application_tags, condition_application_trees, protocol_tags,
        input_plate_format, input_plate_type, output_plate_format, output_plate_type, input_attribute_tags, output_attribute_tags, success_submission_state,
        required_submission_state, pubmed_ids, min_output_wells_per_sample, max_output_wells_per_sample }) {
        const res = await client.post(`/procedures`, { title, description, condition_application_tags, condition_application_trees, protocol_tags,
            input_plate_format, input_plate_type, output_plate_format, output_plate_type, input_attribute_tags, output_attribute_tags, success_submission_state,
            required_submission_state, pubmed_ids, min_output_wells_per_sample, max_output_wells_per_sample })
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
    async function updateModularProcedure_API({ tag, title, description, condition_application_tags, condition_application_trees, protocol_tags,
        input_plate_format, input_plate_type, output_plate_format, output_plate_type, input_attribute_tags, output_attribute_tags, success_submission_state,
        required_submission_state, pubmed_ids, min_output_wells_per_sample, max_output_wells_per_sample }) {
        const res = await client.patch(`/procedures/${tag}`, { title, description, condition_application_tags, condition_application_trees, protocol_tags,
            input_plate_format, input_plate_type, output_plate_format, output_plate_type, input_attribute_tags, output_attribute_tags, success_submission_state,
            required_submission_state, pubmed_ids, min_output_wells_per_sample, max_output_wells_per_sample })
        return res.data
    }

    const useUpdateModularProcedure = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => updateModularProcedure_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    /**
     * @description Creates a new draft version of a published modular procedure, copying its content.
     * Submissions stay linked to the version they were assigned to.
     * @param {Object} props
     * @param {String} props.tag - The published modular procedure tag
     * @returns {Object} The new draft version
     */
    async function createModularProcedureVersion_API({ tag }) {
        const res = await client.post(`/procedures/${tag}/versions`)
        return res.data
    }

    const useCreateModularProcedureVersion = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => createModularProcedureVersion_API({ ...APIParams }),
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
     * @description Retires a published modular procedure (curators and admins only): because
     * published procedures are content-hash immutable and never deleted (their executions must
     * stay reproducible), retiring ends the life cycle - the content and hash stay forever, but
     * the procedure can no longer be assigned or executed and the UI shows it greyed out.
     * @param {Object} props
     * @param {String} props.tag - The modular procedure tag
     * @returns {Object} The retired modular procedure
     */
    async function retireModularProcedure_API({ tag }) {
        const res = await client.post(`/procedures/${tag}/retire`)
        return res.data
    }

    const useRetireModularProcedure = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => retireModularProcedure_API({ ...APIParams }),
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
        useCreateModularProcedureVersion,
        usePublishModularProcedure,
        useRetireModularProcedure,
        useLinkModularProcedureToSubmission,
        useUnlinkModularProcedureFromSubmission,
        useMarkModularProcedureSubmissionDone,
        useReopenModularProcedureSubmission
    }
}

export function createExecuteModularProceduresAPI(client) {

    /**
     * @description Starts an execution of a published modular procedure on a set of samples (curators and admins only).
     * Maps input plate wells to output plate wells; pooling and splitting are supported.
     * The execution is created in the RUNNING state: the submissions are only freed when the
     * execution is confirmed via useFinishModularProcedureExecution.
     * @param {Object} props
     * @param {String} props.tag - The modular procedure tag
     * @param {String} props.input_plate_tag - The input plate tag (must match the plate layout defined by the procedure)
     * @param {String} props.output_plate_tag - The output plate tag (must match the plate layout defined by the procedure)
     * @param {String} [props.responsible_user_tag] - The user responsible for the execution (defaults to the executing user; must be a curator)
     * @param {Array} props.input_wells - [{position, sample_tags, output_positions}]
     * @param {Array} props.output_wells - [{position, condition_application_tags}]
     * @param {Array} [props.output_well_metrics] - [{position, trait_tag, value, side: "OUTPUT"}] — the trait defines the measured quantity (e.g. ug/ul of the concentration attribute)
     * @param {Array} [props.input_well_metrics] - [{position, trait_tag, value, side: "INPUT"}] — the per-well values of the declared input attributes (e.g. the concentration before harmonization)
     * @returns {Object} The created procedure execution
     */
    async function executeModularProcedure_API({ tag, input_plate_tag, output_plate_tag, responsible_user_tag, input_wells, output_wells, output_well_metrics, input_well_metrics }) {
        const res = await client.post(`/procedures/${tag}/execute`, { input_plate_tag, output_plate_tag, responsible_user_tag, input_wells, output_wells, output_well_metrics, input_well_metrics })
        return res.data
    }

    /**
     * @description Confirms a running procedure execution with its outcome (curators and admins only).
     * Regardless of the outcome the submissions owning the placed samples are freed for the next
     * module; only SUCCEEDED sets the procedure's optional success submission state and makes the
     * submissions adopt the condition applications of the module.
     * @param {Object} props
     * @param {String} props.tag - The procedure execution tag
     * @param {String} props.outcome - SUCCEEDED | FAILED | ABORTED
     * @param {String} [props.comment] - An optional comment (e.g. why the run failed)
     * @param {Boolean} [props.block_output_wells] - Overrides whether the output wells stay blocked
     * after the change (e.g. an aborted robot run with dirty wells must stay blocked); omitted it
     * defaults to the outcome (SUCCEEDED blocks, FAILED/ABORTED release the wells for a re-run)
     * @returns {Object} The finished procedure execution
     */
    async function finishModularProcedureExecution_API({ tag, outcome, comment, block_output_wells }) {
        const res = await client.post(`/procedures/executions/${tag}/finish`, { outcome, comment, block_output_wells })
        return res.data
    }

    const useFinishModularProcedureExecution = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => finishModularProcedureExecution_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    /**
     * @description Sets or updates the measured attribute values (metrics) of the output wells of a
     * procedure execution, e.g. the protein concentration of each well (curators and admins only).
     * @param {Object} props
     * @param {String} props.tag - The procedure execution tag
     * @param {Array} props.well_metrics - [{position, trait_tag, value, side: "OUTPUT" | "INPUT"}]
     * @returns {Object} The updated procedure execution
     */
    async function setModularProcedureExecutionMetrics_API({ tag, well_metrics }) {
        const res = await client.post(`/procedures/executions/${tag}/metrics`, well_metrics)
        return res.data
    }

    const useSetModularProcedureExecutionMetrics = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => setModularProcedureExecutionMetrics_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    const useExecuteModularProcedure = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => executeModularProcedure_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    /**
     * @description Creates an empty DRAFT procedure execution with a backend-generated ID
     * (curators and admins only): the design (plates, sample placement, transfer map, per-well
     * values) is saved via useSaveExecutionDraft and can be continued later; drafts do not
     * block anything until they are started via useStartExecutionDraft.
     * @param {Object} props
     * @param {String} props.tag - The modular procedure tag
     * @returns {Object} The created draft procedure execution
     */
    async function createExecutionDraft_API({ tag }) {
        const res = await client.post(`/procedures/${tag}/executions/draft`)
        return res.data
    }

    const useCreateExecutionDraft = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => createExecutionDraft_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    /**
     * @description Saves the setup of a DRAFT procedure execution (replacing the stored design
     * wholesale): plates, responsible user, sample placement, transfer map, condition
     * applications and per-well values. Come back and save anytime; started executions are
     * immutable.
     * @param {Object} props
     * @param {String} props.tag - The draft execution tag
     * @returns {Object} The saved draft procedure execution
     */
    async function saveExecutionDraft_API({ tag, input_plate_tag, output_plate_tag, responsible_user_tag, input_wells, output_wells, output_well_metrics, input_well_metrics }) {
        const res = await client.put(`/procedures/executions/${tag}`,
            { input_plate_tag, output_plate_tag, responsible_user_tag, input_wells, output_wells, output_well_metrics, input_well_metrics })
        return res.data
    }

    const useSaveExecutionDraft = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => saveExecutionDraft_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    /**
     * @description Starts a saved draft execution as a run (curators and admins only): the stored
     * design is validated in full — including the output well occupancy, which drafts do not
     * block until they start — and the execution moves to RUNNING.
     * @param {Object} props
     * @param {String} props.tag - The draft execution tag
     * @returns {Object} The started procedure execution
     */
    async function startExecutionDraft_API({ tag }) {
        const res = await client.post(`/procedures/executions/${tag}/start`)
        return res.data
    }

    const useStartExecutionDraft = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => startExecutionDraft_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    /**
     * @description Deletes a DRAFT procedure execution (and only a draft — started executions
     * are recorded history and are never deleted).
     * @param {Object} props
     * @param {String} props.tag - The draft execution tag
     * @returns {Boolean} True on success
     */
    async function deleteExecutionDraft_API({ tag }) {
        const res = await client.delete(`/procedures/executions/${tag}`)
        return res.data
    }

    const useDeleteExecutionDraft = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => deleteExecutionDraft_API({ ...APIParams }),
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

    /**
     * @description Queries the executions visible to the user for the overview dashboard: summary
     * entries (header data and well counts), newest first. The backend respects the user's
     * submission scope: curators and admins see everything, group curators their group's
     * executions, other users only the executions of their own submissions (creators).
     * @param {Object} props
     * @param {String} [props.search_submission_tag] - Filter for executions that placed samples of this submission
     * @param {String} [props.status] - Filter by the current execution state (RUNNING/SUCCEEDED/FAILED/ABORTED)
     * @param {Number} [props.limit] - The limit
     * @returns {Object[]} The visible execution summaries
     */
    /**
     * @description Returns the positions of the plate's output wells that are blocked by
     * executions of modular procedures (still running or kept blocked): the wells an execution
     * setup must not map its outputs onto. Draft executions block nothing.
     * @param {Object} props
     * @param {String} props.tag - The plate tag
     * @returns {String[]} The blocked well positions
     */
    async function getProcedurePlateOccupied_API({ tag }) {
        const res = await client.get(`/procedures/plates/${tag}/occupied`)
        return res.data
    }

    const useGetProcedurePlateOccupied = (APIParams = { tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getProcedurePlateOccupied", APIParams.tag],
            queryFn: () => getProcedurePlateOccupied_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    /**
     * @description Returns a map of the plate's well positions to the tags of the DRAFT
     * executions using them (input or output side). Drafts block nothing, but setups use this
     * to warn about potential conflicts between parallel drafts (only the execution that
     * starts first gets the wells).
     * @param {Object} props
     * @param {String} props.tag - The plate tag
     * @returns {Object} Map of well position to draft execution tags
     */
    async function getProcedurePlateDraftWells_API({ tag }) {
        const res = await client.get(`/procedures/plates/${tag}/drafts/occupied`)
        return res.data
    }

    const useGetProcedurePlateDraftWells = (APIParams = { tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getProcedurePlateDraftWells", APIParams.tag],
            queryFn: () => getProcedurePlateDraftWells_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    async function queryModularProcedureExecutions_API({ search_submission_tag, status, limit }) {
        const res = await client.get(`/procedures/executions/q`, { params: { search_submission_tag, status, limit } })
        return res.data
    }

    const useQueryModularProcedureExecutions = (APIParams = { search_submission_tag, status, limit }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["queryModularProcedureExecutions", APIParams.search_submission_tag, APIParams.status, APIParams.limit],
            queryFn: () => queryModularProcedureExecutions_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    /**
     * @description Returns the state history of a procedure execution: the state, when it was
     * set and the user who made the change, newest first.
     * @param {Object} props
     * @param {String} props.tag - The procedure execution tag
     * @returns {Object[]} The state history [{state, created_at, user_tag}]
     */
    async function getModularProcedureExecutionStates_API({ tag }) {
        const res = await client.get(`/procedures/executions/${tag}/states`)
        return res.data
    }

    const useGetModularProcedureExecutionStates = (APIParams = { tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getModularProcedureExecutionStates", APIParams.tag],
            queryFn: () => getModularProcedureExecutionStates_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    return {
        useExecuteModularProcedure,
        useCreateExecutionDraft,
        useSaveExecutionDraft,
        useStartExecutionDraft,
        useDeleteExecutionDraft,
        useFinishModularProcedureExecution,
        useSetModularProcedureExecutionMetrics,
        useGetModularProcedureExecution,
        useGetModularProcedureExecutions,
        useQueryModularProcedureExecutions,
        useGetProcedurePlateOccupied,
        useGetProcedurePlateDraftWells,
        useGetModularProcedureExecutionStates
    }
}
