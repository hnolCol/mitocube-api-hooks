import { useQuery  } from "@tanstack/react-query"

export function createQueryProteomeAPI(client) {

    /**
     *  Get a proteome by its tag
     * @param {Object} props 
     * @param {Number} props.tag The proteome tag
     * @returns {}
     */
    async function getProteomeBySearchString_API({search_string, limit}) {
        const res = await client.get(`/proteomes/q`, { params: { search_string, limit } })
        return res.data
    }

    const useGetProteomeBySearchString = (APIParams = {search_string, limit}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getProteome", APIParams.search_string, APIParams.limit],
            queryFn: () => getProteomeBySearchString_API({...APIParams}),
            ...useQueryOptions
        })
    }

    /**
     *  Get a proteome by its tag
     * @param {Object} props 
     * @param {Number} props.tag The proteome tag
     * @returns {}
     */
    async function getProteome_API({tag}) {
        const res = await client.get(`/proteomes/${tag}`)
        return res.data
    }

    const useGetProteome = (APIParams = {tag}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getProteome", APIParams.tag],
            queryFn: () => getProteome_API({...APIParams}),
            ...useQueryOptions
        })
    }


    /**
     *  Get a proteome by its tag
     * @param {Object} props 
     * @param {Number} props.tag The proteome tag
     * @returns {}
     */
    async function getProteomeText_API({tag}) {
        const res = await client.get(`/proteomes/${tag}/text`)
        return res.data
    }

    const useGetProteomeText = (APIParams = {tag}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getProteomeText", APIParams.tag],
            queryFn: () => getProteomeText_API({...APIParams}),
            ...useQueryOptions
        })
    }



    /**
     *  Get a proteome by its tag
     * @param {Object} props 
     * @param {Number} props.tag The proteome tag
     * @returns {}
     */
    async function getProteomeCreatedAt_API({tag}) {
        const res = await client.get(`/proteomes/${tag}/created_at`)
        return res.data
    }

    const useGetProteomeCreatedAt = (APIParams = {tag}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getProteomeCreatedAt", APIParams.tag],
            queryFn: () => getProteomeCreatedAt_API({...APIParams}),
            ...useQueryOptions
        })
    }



    /**
     *  Get if a proteome is currently updating
     * @param {Object} props 
     * @param {Number} props.tag The proteome tag
     * @returns {}
     */
    async function getProteomeIsUpdating_API({tag}) {
        const res = await client.get(`/proteomes/${tag}/is_updating`)
        return res.data
    }

    const useGetProteomeIsUpdating = (APIParams = {tag}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getProteomeIsUpdating", APIParams.tag],
            queryFn: () => getProteomeIsUpdating_API({...APIParams}),
            ...useQueryOptions
        })
    }

    /**
     *  Get a proteome by its tag
     * @param {Object} props 
     * @param {Number} props.tag The proteome tag
     * @returns {import("../permissions/types").PermissionResponse}
     */
    async function getProteomePermissions_API({}) {
        const res = await client.get(`/proteomes/permissions`)
        return res.data
    }

    const useGetProteomePermissions = (APIParams = {}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getProteomePermissions"],
            queryFn: () => getProteomePermissions_API({...APIParams}),
            ...useQueryOptions
        })
    }



    return {
        useGetProteomeBySearchString,
        useGetProteome,
        useGetProteomeText,
        useGetProteomeCreatedAt,
        useGetProteomeIsUpdating,
        useGetProteomePermissions

    }

}