import { useQuery } from "@tanstack/react-query"

export function createQueryTraitsAPI(client) {

    /**
     * @description Returns the trait
     * @param {Object} props
     * @param {String} props.tag - The trait tag.
     * @returns {import("./types").Trait}  Trait
     */
    async function getTraitByTag_API({ tag }) {
        
        const res = await client.get(`/attributes/traits/${tag}`)
        return res.data 
    }

    const useGetTraitByTag = (APIParams = { tag }, useQueryOptions = { staleTime: Infinity }) => {
        return useQuery({
            queryKey: ["getTraitByTag", APIParams.tag],
            queryFn: () => getTraitByTag_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    /**
     * @description Returns the trait tags. 
     * @param {Object} props
     * @param {String} props.search_string - The search string to be used to find the trait. 
     * @param {String} props.attribute_tag - The attribute_tag to limit the search space. 
     * @param {Number} props.limit - Limit the number of returned traits. 
     * @returns {String[]} Matching trait tags. 
     */
    async function getTraitBySearchString_API({ search_string, attribute_tag, limit }) {
        const res = await client.get(`/attributes/traits/q`,
            {
                params: {
                    search_string,
                    attribute_tag,
                    limit
                }
            })
        return res.data 
    }

    const useGetTraitBySearchString = (APIParams = { search_string, attribute_tag, limit }, useQueryOptions = {staleTime : 30000}) => {
        return useQuery({
            queryKey: ["getTraitBySearch", APIParams.attribute_tag, APIParams.limit, APIParams.search_string],
            queryFn: () => getTraitBySearchString_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    /**
     * @description Fetches the trait tags associated with an attribute_tag (tag)
     * @param {Object} props 
     * @param {String} props.tag  The attribute tag
     * @returns {String[]} The tags for the traits matching the attribute
     */ 
    async function getTraitsByAttributeTag_API({ tag }) {
        const res = await client.get(`/attributes/${tag}/traits`,{params : {tag}})
        return res.data 
    }

    const useGetTraitsByAttributeTag = (APIParams = {tag }, useQueryOptions) => {
        return useQuery({
            queryKey: ["traitsByTag", APIParams.tag],
            queryFn: () => getTraitsByAttributeTag_API({...APIParams}),
            ...useQueryOptions
        })
    }

    /**
     * @description Returns the number of traits associated with an attribute_tag (tag)
     * @param {Object} props 
     * @param {String} props.tag  The attribute tag
     * @returns {Number} The number of traits matching the attribute
     */
    async function getTraitCountByAttributeTag_API({ tag }) {
        const res = await client.get(`/attributes/${tag}/traits/count`)
        return res.data
    }

    const useGetTraitCount = (APIParams = { tag }, useQueryOptions) => {
        return useQuery({
            queryKey: ["traitCountByAttributeTag", APIParams.tag],
            queryFn: () => getTraitCountByAttributeTag_API({ ...APIParams }),
            ...useQueryOptions
        })
    }


    /**
     * @description Returns the text representation of a trait defined by its tag.
     * @param {Object} props 
     * @param {String} props.tag  The trait tag
     * @returns {String} The trait text
     */
    async function getTraitText_API({ tag }) {
        const res = await client.get(`/attributes/traits/${tag}/text`)
        return res.data
    }

    const useGetTraitText = (APIParams = { tag }, useQueryOptions = {staleTime : 3000000}) => {
        return useQuery({
            queryKey: ["traitText", APIParams.tag],
            queryFn: () => getTraitText_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    /**
     * @description Returns the description of a trait defined by its tag.
     * @param {Object} props 
     * @param {String} props.tag  The trait tag
     * @returns {String} The trait description  
     */

    async function getTraitDescription_API({ tag }) {
        const res = await client.get(`/attributes/traits/${tag}/description`)
        return res.data
    }

    const useGetTraitDescription = (APIParams = { tag }, useQueryOptions = {staleTime : 3000000}) => {
        return useQuery({
            queryKey: ["traitDescription", APIParams.tag],
            queryFn: () => getTraitDescription_API({ ...APIParams }),
            ...useQueryOptions
        })
    }   


    /**
     * @description Return the priority of a trait defined by its tag. The priority is used to determine the order of the traits when displayed. The lower the priority, the higher the trait is displayed.
     * @param {Object} props 
     * @param {String} props.tag  The trait tag
     * @returns {Number} The trait priority  
     */

    async function getTraitPriority_API({ tag }) {
        const res = await client.get(`/attributes/traits/${tag}/priority`)
        return res.data
    }

    const useGetTraitPriority = (APIParams = { tag }, useQueryOptions = {staleTime : 3000000}) => {
        return useQuery({
            queryKey: ["traitPriority", APIParams.tag],
            queryFn: () => getTraitPriority_API({ ...APIParams }),
            ...useQueryOptions
        })
    }       



    /**
     * @description Returns the attribute's required traits. The default stale time is 300000 ms. If this trait has not yet been selected, the attribute should not appear.
     * @param {Object} props
     * @param {String} props.tag The attribute tag to be returned.
     * @returns {String[]} - The attribute tags of the attribute's required traits
     */
    async function getRequiredTraitsForAttribute_API({ tag }) {
        const res = await client.get(`/attributes/${tag}/required_traits`)
        return res.data 
    }

    const useGetRequiredTraits = (APIParams = { tag }, useQueryOptions = { staleTime: 300000 }) => {
        return useQuery({
            queryKey: ["getRequiredTraits", APIParams.tag],
            queryFn: () => getRequiredTraitsForAttribute_API({ ...APIParams }),
            ...useQueryOptions
        });
    }


    /**
     * @description Returns the current user's permissions for traits and attributes.
     * @returns {Object} { user_tag, role, insert, delete, edit }
     */
    async function getTraitPermissions_API() {
        const res = await client.get(`/attributes/traits/permissions`)
        return res.data
    }

    const useGetTraitPermissions = (useQueryOptions = { staleTime: 1000 * 60 * 5 }) => {
        return useQuery({
            queryKey: ["getTraitPermissions"],
            queryFn: () => getTraitPermissions_API(),
            ...useQueryOptions
        })
    }

return {
    useGetRequiredTraits,
    useGetTraitByTag,
    useGetTraitBySearchString,
    useGetTraitsByAttributeTag,
    useGetTraitCount,
    useGetTraitText,
    useGetTraitDescription,
    useGetTraitPriority,
    useGetTraitPermissions
}
}
