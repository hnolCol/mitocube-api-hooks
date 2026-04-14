



import { useQuery } from "@tanstack/react-query"

export function createConditionApplicationAPI(client) {

    /**
     * @description Return the condition application for the given tag. If it does not exist, an error is thrown.
     * @param {Object} props
     * @param {String} props.tag The condition application tag to be returned.
     * @returns {Object} - The condition application
     */
    async function getConditionApplicationByTag_API({ tag }) {
    const res = await client.get(`/condition_applications/${tag}`)
    return res.data
    }

    const useGetConditionApplication = (APIParams = { tag }, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getConditionApplication", APIParams.tag],
        queryFn: () => getConditionApplicationByTag_API({ ...APIParams }),
        staleTime: 300000,
        ...useQueryOptions
    })
    }


    /**
     * @description Return the condition application text
     * @param {Object} props
     * @param {String} props.tag The condition application tag to be returned.You may add multiple tags, separated by semicolons. 
     * @returns {Object} - The condition application text
     */
    async function getConditionApplicationTextByTag_API({ tag }) {
    const res = await client.get(`/condition_applications/${tag}/text`)
    return res.data
    }

    const useGetConditionApplicationText = (APIParams = { tag }, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getConditionApplicationText", APIParams.tag],
        queryFn: () => getConditionApplicationTextByTag_API({ ...APIParams }),
        staleTime: 300000,
        ...useQueryOptions
    })
    }


    /**
     * @description Return the condition application for the given tag. If it does not exist, an error is thrown.
     * @param {Object} props
     * @param {Boolean} props.samples_only - If true, only condition applications that are linked to samples are returned.
     * @param {String} props.submission_tag - If provided, only condition applications that are linked to the given submission are returned. If samples_only is also true, only condition applications that are linked to samples from the given submission are returned.
     * @param {String} props.attribute_tag - If provided, only condition applications that are linked to the given attribute are returned. This link may occur in any level of the condition application hierarchy.
     * @param {String} props.trait_tag - If provided, only condition applications that are linked to the given trait are returned. This link may occur in any level of the condition application hierarchy.
     *  * @returns {String[]} - The condition application tags that match the query
     */
    async function getConditionApplicationByQuery_API({ search_string, samples_only, submission_tag, attribute_tag, trait_tag, sort_by_frequency, limit }) {
    const res = await client.get(`/condition_applications/q`, {
        params: {
            search_string,
            samples_only,
            submission_tag,
            attribute_tag,
            trait_tag,
            sort_by_frequency,
            limit
        }
    })
    return res.data
    }

    const useGetConditionApplicationByQuery = (APIParams = {search_string: undefined, samples_only: true, submission_tag, attribute_tag, trait_tag, sort_by_frequency: true, limit}, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getConditionApplicationByQuery", APIParams.search_string, APIParams.submission_tag, APIParams.attribute_tag, APIParams.samples_only, APIParams.trait_tag, APIParams.sort_by_frequency, APIParams.limit],
        queryFn: () => getConditionApplicationByQuery_API({ ...APIParams }),
        staleTime: 300000,
        placeholderData: (prev) => prev,
        ...useQueryOptions
    })
    }


    const useGetCATreeForUI = (params, options = {}) => {
    return useQuery({
        queryKey: ["ca-tree-for-ui", params.tag],
        queryFn: () => client
            .get(`/condition_applications/${params.tag}/tree_for_ui`)
            .then((res) => res.data),
        ...options
    });
    };

    return {
        useGetConditionApplication,
        useGetConditionApplicationText,
        useGetConditionApplicationByQuery,
        useGetCATreeForUI,
        getConditionApplicationTextByTag_API
    }
}