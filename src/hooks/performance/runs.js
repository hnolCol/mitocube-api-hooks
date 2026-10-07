import { useQuery, useMutation } from "@tanstack/react-query"

export function createPerformanceRunsAPI(client) {
    /**
     * @description Returns the QC runs, optionally filtered by instrument and QC standard. Requires at least curator rights. Endpoint: GET '/api/performance/runs'
     * @param {Object} props
     * @param {String} [props.instrument_name_tag] - The instrument to filter the runs by.
     * @param {String} [props.qc_standard_tag] - The QC standard to filter the runs by.
     * @param {String} [props.condition_application_tag] - The condition application to filter the runs by.
     * @param {Number} [props.limit=50] - The limit of runs to return.
     * @returns {Object[]} The QC runs.
     */
    async function getPerformanceRuns_API({ instrument_name_tag, qc_standard_tag, condition_application_tag, limit }) {
        const res = await client.get(`/performance/runs`, {
            params: { instrument_name_tag, qc_standard_tag, condition_application_tag, limit }
        })
        return res.data
    }

    const useGetPerformanceRuns = (APIParams = { instrument_name_tag, qc_standard_tag, condition_application_tag, limit }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getPerformanceRuns", APIParams.instrument_name_tag, APIParams.qc_standard_tag, APIParams.condition_application_tag, APIParams.limit],
            queryFn: () => getPerformanceRuns_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    /**
     * @description Counts the QC runs, optionally grouped by instrument. Requires at least curator rights. Endpoint: GET '/api/performance/runs/count'
     * @param {Object} props
     * @param {Boolean} [props.by_instrument=false] - If true, the runs are counted per instrument.
     * @returns {Number|Object[]} The number of QC runs.
     */
    async function getPerformanceRunCount_API({ by_instrument }) {
        const res = await client.get(`/performance/runs/count`, {
            params: { by_instrument }
        })
        return res.data
    }

    const useGetPerformanceRunCount = (APIParams = { by_instrument }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getPerformanceRunCount", APIParams.by_instrument],
            queryFn: () => getPerformanceRunCount_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    /**
     * @description Returns a QC run by its tag. Requires at least curator rights. Endpoint: GET '/api/performance/runs/{run_tag}'
     * @param {Object} props
     * @param {String} props.tag - The tag of the QC run.
     * @returns {Object} The QC run data.
     */
    async function getPerformanceRunByTag_API({ tag }) {
        const res = await client.get(`/performance/runs/${tag}`)
        return res.data
    }

    const useGetPerformanceRunByTag = (APIParams = { tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getPerformanceRunByTag", APIParams.tag],
            queryFn: () => getPerformanceRunByTag_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    /**
     * @description Returns the QCPrecursors that were recorded for a QC run. Requires at least curator rights. Endpoint: GET '/api/performance/runs/{run_tag}/precursors'
     * @param {Object} props
     * @param {String} props.tag - The tag of the QC run.
     * @returns {Object[]} The QCPrecursors of the QC run (precursor_tag, value, score, retention_time).
     */
    async function getPerformanceRunPrecursors_API({ tag }) {
        const res = await client.get(`/performance/runs/${tag}/precursors`)
        return res.data
    }

    const useGetPerformanceRunPrecursors = (APIParams = { tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getPerformanceRunPrecursors", APIParams.tag],
            queryFn: () => getPerformanceRunPrecursors_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    /**
     * @description Returns the RT drift of a QCPrecursor over QC runs. Requires at least curator rights. Endpoint: GET '/api/performance/rt_drift/{precursor_tag}'
     * @param {Object} props
     * @param {String} props.precursor_tag - The tag of the QCPrecursor.
     * @param {String} [props.instrument_name_tag] - The instrument to filter the runs by.
     * @param {String} [props.qc_standard_tag] - The QC standard to filter the runs by.
     * @param {String} [props.condition_application_tag] - The condition application to filter the runs by.
     * @param {Number} [props.start] - The start index of the runs to consider.
     * @param {Number} [props.end] - The end index of the runs to consider.
     * @returns {Object[]} The RT drift data over the QC runs.
     */
    async function getRTDrift_API({ precursor_tag, instrument_name_tag, qc_standard_tag, condition_application_tag, start, end }) {
        const res = await client.get(`/performance/rt_drift/${precursor_tag}`, {
            params: { instrument_name_tag, qc_standard_tag, condition_application_tag, start, end }
        })
        return res.data
    }

    const useGetRTDrift = (APIParams = { precursor_tag, instrument_name_tag, qc_standard_tag, condition_application_tag, start, end }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getRTDrift", APIParams.precursor_tag, APIParams.instrument_name_tag, APIParams.qc_standard_tag, APIParams.condition_application_tag, APIParams.start, APIParams.end],
            queryFn: () => getRTDrift_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    /**
     * @description Inserts a QC run into the database. The run is linked to the instrument it was acquired on, the user that acquired it and the QC standard used. The specific precursors can be provided directly with the run or added separately via the run's precursors endpoint. Requires at least curator rights. Endpoint: POST '/api/performance/runs/insert'
     * @param {Object} props
     * @param {String} props.tag - The tag of the QC run.
     * @param {String} props.instrument_name_tag - The instrument the run was acquired on.
     * @param {String} props.user_tag - The user that acquired the run.
     * @param {String} props.qc_standard_tag - The QC standard used to generate the run.
     * @param {Object} props.rt_peptides - The retention times of the QC peptides ({ peptide tag: retention time }).
     * @param {Number} props.quant_proteins - The number of quantified proteins.
     * @param {Number} props.quant_peptides - The number of quantified peptides.
     * @param {Number} props.quant_precursors - The number of quantified precursors.
     * @param {Number} props.quant_protein_groups - The number of quantified protein groups.
     * @param {Object[]} [props.qc_precursors] - The quantified QCPrecursors of the run ({ precursor_tag, value, score, retention_time }).
     * @param {String[]} [props.condition_application_tags] - The condition applications describing the run (e.g. column, gradient).
     * @param {Object} [props.group_attr] - Deprecated, use condition_application_tags instead.
     * @returns {Boolean} True if the insertion was successful.
     */
    async function postPerformanceRun_API({ tag, instrument_name_tag, user_tag, qc_standard_tag, rt_peptides, quant_proteins, quant_peptides, quant_precursors, quant_protein_groups, qc_precursors, condition_application_tags, group_attr }) {
        const res = await client.post(`/performance/runs/insert`, {
            tag, instrument_name_tag, user_tag, qc_standard_tag, rt_peptides, quant_proteins, quant_peptides, quant_precursors, quant_protein_groups, qc_precursors, condition_application_tags, group_attr
        })
        return res.data
    }

    const usePostPerformanceRun = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postPerformanceRun_API({ ...APIParams }),
            ...useMutationOptions
        });
    }

    /**
     * @description Adds quantified QCPrecursors to a QC run. Requires at least curator rights. Endpoint: POST '/api/performance/runs/{run_tag}/precursors'
     * @param {Object} props
     * @param {String} props.tag - The tag of the QC run.
     * @param {Object[]} props.precursors - The QCPrecursors to add ({ precursor_tag, value, score, retention_time }).
     * @returns {Boolean} True if the insertion was successful.
     */
    async function postPerformanceRunPrecursors_API({ tag, precursors }) {
        const res = await client.post(`/performance/runs/${tag}/precursors`, precursors)
        return res.data
    }

    const usePostPerformanceRunPrecursors = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postPerformanceRunPrecursors_API({ ...APIParams }),
            ...useMutationOptions
        });
    }

    /**
     * @description Deletes a QC run and all its relationships. Requires at least curator rights. Endpoint: DELETE '/api/performance/runs/{run_tag}'
     * @param {Object} props
     * @param {String} props.tag - The tag of the QC run.
     * @returns {Boolean} True if the deletion was successful.
     */
    async function deletePerformanceRun_API({ tag }) {
        const res = await client.delete(`/performance/runs/${tag}`)
        return res.data
    }

    const useDeletePerformanceRun = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => deletePerformanceRun_API({ ...APIParams }),
            ...useMutationOptions
        });
    }

    return {
        useGetPerformanceRuns,
        useGetPerformanceRunCount,
        useGetPerformanceRunByTag,
        useGetPerformanceRunPrecursors,
        useGetRTDrift,
        usePostPerformanceRun,
        usePostPerformanceRunPrecursors,
        useDeletePerformanceRun
    };
}

export function createQCStandardsAPI(client) {
    /**
     * @description Returns the available QC standard types (e.g. Cell lysate, Protein). Endpoint: GET '/api/standards/types'
     * @param {Object} props
     * @returns {String[]} The available QC standard types.
     */
    async function getQCStandardTypes_API({ }) {
        const res = await client.get(`/standards/types`)
        return res.data
    }

    const useGetQCStandardTypes = (APIParams = {}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getQCStandardTypes"],
            queryFn: () => getQCStandardTypes_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    /**
     * @description Returns the QC standards, optionally filtered by type and vendor. Requires at least curator rights. Endpoint: GET '/api/standards'
     * @param {Object} props
     * @param {String} [props.type] - The type of the standard (e.g. Cell lysate, Protein).
     * @param {String} [props.vendor] - The vendor of the standard.
     * @returns {Object[]} The QC standards (tag, vendor, type).
     */
    async function getQCStandards_API({ type, vendor }) {
        const res = await client.get(`/standards`, {
            params: { type, vendor }
        })
        return res.data
    }

    const useGetQCStandards = (APIParams = { type, vendor }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getQCStandards", APIParams.type, APIParams.vendor],
            queryFn: () => getQCStandards_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    /**
     * @description Returns a QC standard by its tag. Requires at least curator rights. Endpoint: GET '/api/standards/{standard_tag}'
     * @param {Object} props
     * @param {String} props.tag - The tag of the QC standard.
     * @returns {Object} The QC standard data (tag, vendor, type).
     */
    async function getQCStandardByTag_API({ tag }) {
        const res = await client.get(`/standards/${tag}`)
        return res.data
    }

    const useGetQCStandardByTag = (APIParams = { tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getQCStandardByTag", APIParams.tag],
            queryFn: () => getQCStandardByTag_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    /**
     * @description Inserts a QC standard into the database. Standards are immutable, an existing tag is merged. Requires at least curator rights. Endpoint: POST '/api/standards/insert'
     * @param {Object} props
     * @param {String} props.tag - The tag of the QC standard.
     * @param {String} props.vendor - The vendor of the standard.
     * @param {String} props.type - The type of the standard (e.g. Cell lysate, Protein).
     * @returns {Boolean} True if the insertion was successful.
     */
    async function postQCStandard_API({ tag, vendor, type }) {
        const res = await client.post(`/standards/insert`, {
            tag, vendor, type
        })
        return res.data
    }

    const usePostQCStandard = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postQCStandard_API({ ...APIParams }),
            ...useMutationOptions
        });
    }

    /**
     * @description Deletes a QC standard. A standard can only be deleted if no QC run is linked to it. Requires at least curator rights. Endpoint: DELETE '/api/standards/{standard_tag}'
     * @param {Object} props
     * @param {String} props.tag - The tag of the QC standard.
     * @returns {Boolean} True if the deletion was successful.
     */
    async function deleteQCStandard_API({ tag }) {
        const res = await client.delete(`/standards/${tag}`)
        return res.data
    }

    const useDeleteQCStandard = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => deleteQCStandard_API({ ...APIParams }),
            ...useMutationOptions
        });
    }

    return {
        useGetQCStandardTypes,
        useGetQCStandards,
        useGetQCStandardByTag,
        usePostQCStandard,
        useDeleteQCStandard
    };
}
