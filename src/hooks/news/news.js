import { useQuery, useMutation } from "@tanstack/react-query"

export function createNewsAPI(client) {
    /**
     * 
     * @param {Object} props 
     * @param {Number} props.limit - The maximum number of news to be returned 
     * @param {String} props.order - The order of the news, either 'asc' or 'desc'. Default is 'desc'.
     * @returns {import("../../types/news").News[]}
     */
    async function findNews_API({limit, order = 'desc'}) {
        const res = await client.get(`/news`,{params : {limit, order}})
        return res.data 
    }

    const useFindNews = (APIParams = {limit, order: 'desc'}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getNews"],
            queryFn: () => findNews_API({...APIParams}),
            ...useQueryOptions
        })
    }


    /**
     * Returns a specifc news item by its tag.
     * @param {Object} props 
     * @param {String} props.tag - The news tag
     * @returns {import("../../types/news").News}
     */
    async function getNewsByTag_API({tag}) {
        const res = await client.get(`/news/${tag}`)
        return res.data 
    }

    const useGetNewsByTag = (APIParams = {tag}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getNewsByTag", APIParams.tag],
            queryFn: () => getNewsByTag_API({...APIParams}),
            ...useQueryOptions
        })
    }


    /**
     * @description Endpoint: POST '/api/news'
     * @param {Object} props 
     * @param {String} props.title - The news title
     * @param {String} props.content - The news content in markdown format
     * @param {String[]} props.submission_tags - Tags of submissions associated with the news. For example, if the news is about a new submission, the submission tag should be included here. 
     * @param {String[]} props.feature_tags - Features (peptides, proteins, genes etc) associated with the news.
     * @returns {Boolean} If insertion was successful
     */
    async function postNews_API({ title, content, submission_tags, feature_tags }) {
        const res = await client.post(`/news`,
            {
                title,
                content,
                submission_tags,
                feature_tags
        }
        )
        return res.data 
    }

    const usePostNews = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postNews_API({...APIParams}),
            ...useMutationOptions
        })
    }

    /**
     * @description Endpoint: DELETE '/api/news'
     * @param {Object} props 
     * @param {String} props.tag - The news tag to delete
     * @returns {Boolean} If deletion was successful
     */
    async function deleteNews_API({ tag }) {
        const res = await client.delete(`/news/${tag}`)
        return res.data
    }

    const useDeleteNews = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => deleteNews_API({...APIParams}),
            ...useMutationOptions
        })
    }

    /**
     * 
     * @param {Object} props 
     * @returns {import("../permissions/types").PermissionResponse} - The permissions for news.
     */
    async function getNewsPermission_API({}) {
        const res = await axios.get(`/news/permissions`)
        return res.data
    }

    const useGetNewsPermissions = (APIParams = {}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getNewsPermissions"],
            queryFn: () => getNewsPermission_API({...APIParams}),
            ...useQueryOptions
        })
    }

  return {
      useFindNews, 
      useGetNewsByTag,
      usePostNews,
      useDeleteNews,
      useGetNewsPermissions

  };
}






