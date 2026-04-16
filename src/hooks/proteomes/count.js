import { useQuery, useMutation } from "@tanstack/react-query"

export function createQueryProteomeCountsAPI(client) {

    /**
     *  Get the number of proteomes available
     * @param {Object} props 
     * @returns {}
     */
    async function getProteomeCount_API() {
        const res = await client.get(`/proteomes/count`)
        return res.data
    }

    const useGetProteomeCount = (APIParams = {}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getProteomeCount"],
            queryFn: () => getProteomeCount_API({...APIParams}),
            ...useQueryOptions
        })
    }




    /**
     *  Get the number of proteins in a proteome
     * @param {Object} props 
     * @param {String} props.tag The proteome tag
     * @returns {}
     */
    async function getProteomeProteinCount_API({tag}) {
        const res = await client.get(`/proteomes/${tag}/proteins/count`)
        return res.data
    }

    const useGetProteomeProteinCount = (APIParams = {tag}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getProteomeProteinCount", APIParams.tag],
            queryFn: () => getProteomeProteinCount_API({...APIParams}),
            ...useQueryOptions
        })
    }

    return {
        useGetProteomeCount,
        useGetProteomeProteinCount
    }

}
