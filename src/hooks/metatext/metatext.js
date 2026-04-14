
import { useQuery, useMutation } from "@tanstack/react-query"


export function createMetatextAPI(client) {

    async function getMetatextByTag_API({ tag }) {
        const res = await client.get(`/metatexts/${tag}`)
        return res.data 
    }
    const useGetMetatext = (APIParams = {tag}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["metatextByTag", APIParams.tag],
            queryFn: () => getMetatextByTag_API({...APIParams}),
            ...useQueryOptions
        })
    }

    /**
     * @description Patch a metatext.
     * @param {Object} props
     * @param {String} props.tag The tag of the metatext to edit
     * @param {String} props.title The new title of the metatext
     * @param {String} props.text The new text of the metatext
     * @returns 
     */
    async function patchMetatext_API({tag, title, text}){
        const res = await client.patch(`/metatexts/${tag}`, { title, text })
        return res.data
    }

    const usePatchMetatext = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => patchMetatext_API({...APIParams}),
            ...useMutationOptions
        })
    }



    /**
     * @description Deletes a metatext defined by its tag from the database. 
     * Returns an error if the tag is not found. 
     * @param {Object} props
    * @param {String} props.tag The tag of the metatext to delete
    * @returns 
    */
    async function deleteMetatext_API({tag}){
        const res = await client.delete(`/metatexts/${tag}`)
        return res.data
    }

    const useDeleteMetatext = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => deleteMetatext_API({...APIParams}),
            ...useMutationOptions
        })
    }

  return {
    useGetMetatext,
    usePatchMetatext,
    useDeleteMetatext
  };
}
