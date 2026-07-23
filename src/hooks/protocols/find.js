import { useQuery  } from "@tanstack/react-query"

export function createQueryProtocolsAPI(client) {

    /**
     *  Get protocols by query
     * @param {Object} props 
     * @param {String} props.search_string The search string
     * @param {Array} props.submission_tags The submission tags
     * @param {Number} props.limit The limit
     * @returns {String[]} The protocol tags 
     */
    async function findProtocols_API({search_string, submission_tags, limit}) {
        const res = await client.get(`/protocols/q`, { params: { search_string, submission_tags, limit } })
        return res.data
    }

    const useGetProtocolsByQuery = (APIParams = {search_string, submission_tags, limit}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["findProtocols", APIParams.search_string, APIParams.submission_tags, APIParams.limit],
            queryFn: () => findProtocols_API({...APIParams}),
            ...useQueryOptions
        })
    }

    /**
     * 
     * @param {Object} param0
     * @param {String} param0.tag The protocol tag
     * @returns {Object} The protocol data
     */
    async function getProtocolByTag_API({tag}) {
        const res = await client.get(`/protocols/${tag}`)
        return res.data
    }


    const useGetProtocolByTag = (APIParams = { tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getProtocol", APIParams.tag],   
            queryFn: () => getProtocolByTag_API({...APIParams}),
            ...useQueryOptions
        })
    }

    /**
     * 
     * @param {Object} param0
     * @param {String} param0.tag The protocol tag
     * @returns {String[]} The submission tags
     */
    async function getSubmissionTagsByProtocolTag_API({tag}) {
        const res = await client.get(`/protocols/${tag}/submissions`)
        return res.data
    }

    const useGetSubmissionTagsByProtocolTag = (APIParams = { tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getSubmissionTagsByProtocolTag", APIParams.tag],
            queryFn: () => getSubmissionTagsByProtocolTag_API({ ...APIParams }),
            ...useQueryOptions
        })
    }
    
    return {
        useGetProtocolsByQuery,
        useGetProtocolByTag,
        useGetSubmissionTagsByProtocolTag
    }

}