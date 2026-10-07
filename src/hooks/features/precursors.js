import { useQuery, useMutation } from "@tanstack/react-query"

export function createPrecursorAPI(client) {
    /**
     * @description Finds precursors by their tag (sequence followed by charge state, e.g. PEPTIDEK.2). Endpoint: GET '/api/features/precursors/q'
     * @param {Object} props
     * @param {String} props.search_string - The search string to match against the precursor tags.
     * @param {Number} [props.limit=50] - The limit of precursors to return.
     * @param {String} [props.submission_tags] - Semicolon separated submission tags to filter the search.
     * @returns {String[]} Precursor tags
     */
    async function getPrecursorsByQuery_API({ search_string, limit, submission_tags }) {
        const res = await client.get(`/features/precursors/q`, {
            params: { search_string, limit, submission_tags }
        })
        return res.data
    }

    const useGetPrecursorsByQuery = (APIParams = { search_string, limit, submission_tags }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getPrecursorsByQuery", APIParams.search_string, APIParams.limit, APIParams.submission_tags],
            queryFn: () => getPrecursorsByQuery_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    /**
     * @description Counts the precursors. If a submission tag is given, only precursors quantified in that submission are counted. Endpoint: GET '/api/features/precursors/count'
     * @param {Object} props
     * @param {String} [props.submission_tag] - The tag of the submission to count precursors for.
     * @returns {Number} The number of precursors.
     */
    async function getPrecursorCount_API({ submission_tag }) {
        const res = await client.get(`/features/precursors/count`, {
            params: { submission_tag }
        })
        return res.data
    }

    const useGetPrecursorCount = (APIParams = { submission_tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getPrecursorCount", APIParams.submission_tag],
            queryFn: () => getPrecursorCount_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    /**
     * @description Retrieves a precursor by its tag. Endpoint: GET '/api/features/precursors/{precursor_tag}'
     * @param {Object} props
     * @param {String} props.tag - The tag of the precursor (sequence followed by the charge state, e.g. PEPTIDEK.2).
     * @returns {Object} The precursor data (tag, sequence, charge, mz, im, protein_group_tag, protein_group_tags, quantified).
     */
    async function getPrecursorByTag_API({ tag }) {
        const res = await client.get(`/features/precursors/${tag}`)
        return res.data
    }

    const useGetPrecursorByTag = (APIParams = { tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getPrecursorByTag", APIParams.tag],
            queryFn: () => getPrecursorByTag_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    /**
     * @description Retrieves the abundance of a precursor by its tag. Endpoint: GET '/api/features/precursors/{precursor_tag}/abundance'
     * @param {Object} props
     * @param {String} props.tag - The tag of the precursor.
     * @param {String} [props.submission_tags] - Semicolon separated submission tags to filter the abundance data (default: all submissions).
     * @returns {Object[]} The abundance data of the precursor.
     */
    async function getPrecursorAbundance_API({ tag, submission_tags }) {
        const res = await client.get(`/features/precursors/${tag}/abundance`, {
            params: { submission_tags }
        })
        return res.data
    }

    const useGetPrecursorAbundance = (APIParams = { tag, submission_tags }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getPrecursorAbundance", APIParams.tag, APIParams.submission_tags],
            queryFn: () => getPrecursorAbundance_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    /**
     * @description Checks if a precursor is quantified. Endpoint: GET '/api/features/precursors/{precursor_tag}/is_quantified'
     * @param {Object} props
     * @param {String} props.tag - The tag of the precursor.
     * @returns {Boolean} True if the precursor is quantified, false otherwise.
     */
    async function getPrecursorIsQuantified_API({ tag }) {
        const res = await client.get(`/features/precursors/${tag}/is_quantified`)
        return res.data
    }

    const useGetPrecursorIsQuantified = (APIParams = { tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getPrecursorIsQuantified", APIParams.tag],
            queryFn: () => getPrecursorIsQuantified_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    /**
     * @description Retrieves all precursors associated with a given protein group. If a submission tag is given, only precursors quantified in that submission are returned. Endpoint: GET '/api/features/precursors/protein_groups/{protein_group_tag}'
     * @param {Object} props
     * @param {String} props.protein_group_tag - The tag of the protein group.
     * @param {String} [props.submission_tag] - The tag of the submission to filter the precursors by.
     * @param {Number} [props.limit] - The maximum number of results to return.
     * @returns {Object[]} The precursor data.
     */
    async function getPrecursorsByProteinGroup_API({ protein_group_tag, submission_tag, limit }) {
        const res = await client.get(`/features/precursors/protein_groups/${protein_group_tag}`, {
            params: { submission_tag, limit }
        })
        return res.data
    }

    const useGetPrecursorsByProteinGroup = (APIParams = { protein_group_tag, submission_tag, limit }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getPrecursorsByProteinGroup", APIParams.protein_group_tag, APIParams.submission_tag, APIParams.limit],
            queryFn: () => getPrecursorsByProteinGroup_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    /**
     * @description Inserts a precursor into the database. The precursor tag is derived from the peptide sequence and the charge state (sequence.charge). Requires curator rights. Endpoint: POST '/api/features/precursors/insert'
     * @param {Object} props
     * @param {String} props.sequence - The peptide sequence of the precursor.
     * @param {Number} props.charge - The charge state of the precursor.
     * @param {String[]} props.protein_group_tags - The protein groups the precursor is connected to.
     * @param {Number} [props.mz] - The mass-to-charge ratio of the precursor.
     * @param {Number} [props.im] - The ion mobility value of the precursor.
     * @param {Number} [props.value] - The log2 intensity of the precursor quantification.
     * @param {Number} [props.score] - The identification score of the precursor.
     * @returns {Boolean} True if the insertion was successful.
     */
    async function postPrecursor_API({ sequence, charge, protein_group_tags, mz, im, value, score }) {
        const res = await client.post(`/features/precursors/insert`, {
            sequence, charge, protein_group_tags, mz, im, value, score
        })
        return res.data
    }

    const usePostPrecursor = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postPrecursor_API({ ...APIParams }),
            ...useMutationOptions
        });
    }

    /**
     * @description Bulk inserts a list of precursors into the database. Precursors that already exist are merged. Requires curator rights. Endpoint: POST '/api/features/precursors/insert/bulk'
     * @param {Object} props
     * @param {Object[]} props.precursors - The precursors to insert ({ sequence, charge, protein_group_tags, mz, im, value, score }).
     * @param {Number} [props.batch_size=1000] - The number of precursors sent to the database per query.
     * @param {Number} [props.transaction_batch_size=400] - The number of rows per internal transaction.
     * @returns {Number} The number of inserted precursors.
     */
    async function postPrecursorsBulk_API({ precursors, batch_size, transaction_batch_size }) {
        const res = await client.post(`/features/precursors/insert/bulk`, precursors, {
            params: { batch_size, transaction_batch_size }
        })
        return res.data
    }

    const usePostPrecursorsBulk = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postPrecursorsBulk_API({ ...APIParams }),
            ...useMutationOptions
        });
    }

    return {
        useGetPrecursorsByQuery,
        useGetPrecursorCount,
        useGetPrecursorByTag,
        useGetPrecursorAbundance,
        useGetPrecursorIsQuantified,
        useGetPrecursorsByProteinGroup,
        usePostPrecursor,
        usePostPrecursorsBulk
    };
}
