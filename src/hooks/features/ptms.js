import { useQuery, useMutation } from "@tanstack/react-query"

export function createPTMSitesAPI(client) {
    /**
     * @description Finds PTM sites by their tag (derived from the protein/protein group tag, the position and the modification, e.g. P12345_S473_PHOSPHO). Endpoint: GET '/api/features/ptms/q'
     * @param {Object} props
     * @param {String} props.search_string - The search string to match against the PTM site tags.
     * @param {Number} [props.limit=50] - The limit of PTM sites to return.
     * @param {String} [props.submission_tags] - Semicolon separated submission tags to filter the search.
     * @returns {String[]} PTM site tags
     */
    async function getPTMSitesByQuery_API({ search_string, limit, submission_tags }) {
        const res = await client.get(`/features/ptms/q`, {
            params: { search_string, limit, submission_tags }
        })
        return res.data
    }

    const useGetPTMSitesByQuery = (APIParams = { search_string, limit, submission_tags }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getPTMSitesByQuery", APIParams.search_string, APIParams.limit, APIParams.submission_tags],
            queryFn: () => getPTMSitesByQuery_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    /**
     * @description Counts the PTM sites, optionally within a submission. Endpoint: GET '/api/features/ptms/count'
     * @param {Object} props
     * @param {String} [props.submission_tag] - The tag of the submission to count the PTM sites for.
     * @returns {Number} The number of PTM sites.
     */
    async function getPTMSiteCount_API({ submission_tag }) {
        const res = await client.get(`/features/ptms/count`, {
            params: { submission_tag }
        })
        return res.data
    }

    const useGetPTMSiteCount = (APIParams = { submission_tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getPTMSiteCount", APIParams.submission_tag],
            queryFn: () => getPTMSiteCount_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    /**
     * @description Retrieves a PTM site by its tag. Endpoint: GET '/api/features/ptms/{ptm_site_tag}'
     * @param {Object} props
     * @param {String} props.tag - The tag of the PTM site (e.g. P12345_S473_PHOSPHO).
     * @returns {Object} The PTM site data (tag, protein_group_tag, protein_tag, position, modification, residue, sequence_window, precursor_tags, quantified).
     */
    async function getPTMSiteByTag_API({ tag }) {
        const res = await client.get(`/features/ptms/${tag}`)
        return res.data
    }

    const useGetPTMSiteByTag = (APIParams = { tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getPTMSiteByTag", APIParams.tag],
            queryFn: () => getPTMSiteByTag_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    /**
     * @description Retrieves the abundance of a PTM site by its tag. Endpoint: GET '/api/features/ptms/{ptm_site_tag}/abundance'
     * @param {Object} props
     * @param {String} props.tag - The tag of the PTM site.
     * @param {String} [props.submission_tags] - Semicolon separated submission tags to filter the abundance data (default: all submissions).
     * @returns {Object[]} The abundance data of the PTM site.
     */
    async function getPTMSiteAbundance_API({ tag, submission_tags }) {
        const res = await client.get(`/features/ptms/${tag}/abundance`, {
            params: { submission_tags }
        })
        return res.data
    }

    const useGetPTMSiteAbundance = (APIParams = { tag, submission_tags }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getPTMSiteAbundance", APIParams.tag, APIParams.submission_tags],
            queryFn: () => getPTMSiteAbundance_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    /**
     * @description Checks if a PTM site is quantified. Endpoint: GET '/api/features/ptms/{ptm_site_tag}/is_quantified'
     * @param {Object} props
     * @param {String} props.tag - The tag of the PTM site.
     * @returns {Boolean} True if the PTM site is quantified, false otherwise.
     */
    async function getPTMSiteIsQuantified_API({ tag }) {
        const res = await client.get(`/features/ptms/${tag}/is_quantified`)
        return res.data
    }

    const useGetPTMSiteIsQuantified = (APIParams = { tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getPTMSiteIsQuantified", APIParams.tag],
            queryFn: () => getPTMSiteIsQuantified_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    /**
     * @description Inserts a PTM site into the database. The tag is derived and validated from the protein tag (or the protein group tag if no protein tag is given), the position and the modification. Requires at least curator rights. Endpoint: POST '/api/features/ptms/insert'
     * @param {Object} props
     * @param {String} props.protein_group_tag - The tag of the protein group the site belongs to.
     * @param {Number} props.position - The position of the modification.
     * @param {String} props.modification - The modification (e.g. PHOSPHO).
     * @param {String} [props.protein_tag] - The protein tag, if the site is localized to a single protein.
     * @param {String} [props.residue] - The modified residue.
     * @param {String} [props.sequence_window] - The sequence window around the modification.
     * @param {String[]} [props.precursor_tags] - The supporting (modified) precursors of the site.
     * @param {Number} [props.value] - The log2 intensity of the site quantification.
     * @param {Number} [props.score] - The identification score of the site.
     * @param {Number} [props.site_localization] - The localization probability of the modification.
     * @returns {Boolean} True if the insertion was successful.
     */
    async function postPTMSite_API({ protein_group_tag, protein_tag, position, modification, residue, sequence_window, precursor_tags, value, score, site_localization }) {
        const res = await client.post(`/features/ptms/insert`, {
            protein_group_tag, protein_tag, position, modification, residue, sequence_window, precursor_tags, value, score, site_localization
        })
        return res.data
    }

    const usePostPTMSite = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postPTMSite_API({ ...APIParams }),
            ...useMutationOptions
        });
    }

    /**
     * @description Bulk inserts PTM sites into the database. Existing tags are merged. Requires at least curator rights. Endpoint: POST '/api/features/ptms/insert/bulk'
     * @param {Object} props
     * @param {Object[]} props.ptm_sites - The PTM sites to insert.
     * @param {Number} [props.batch_size=1000] - The number of PTM sites sent to the database per query.
     * @param {Number} [props.transaction_batch_size=400] - The number of rows per internal transaction.
     * @returns {Object} The bulk insert report.
     */
    async function postPTMSitesBulk_API({ ptm_sites, batch_size, transaction_batch_size }) {
        const res = await client.post(`/features/ptms/insert/bulk`, ptm_sites, {
            params: { batch_size, transaction_batch_size }
        })
        return res.data
    }

    const usePostPTMSitesBulk = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postPTMSitesBulk_API({ ...APIParams }),
            ...useMutationOptions
        });
    }

    return {
        useGetPTMSitesByQuery,
        useGetPTMSiteCount,
        useGetPTMSiteByTag,
        useGetPTMSiteAbundance,
        useGetPTMSiteIsQuantified,
        usePostPTMSite,
        usePostPTMSitesBulk
    };
}
