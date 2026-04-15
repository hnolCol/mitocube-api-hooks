import { useQuery, useQueries } from "@tanstack/react-query"

export function createQueryAttributesAPI(client) {

    /**
     * @description Returns the attribute. The default stale time is 30000 ms.
     * @param {Object} props
     * @param {String} props.tag The attribute tag to be returned.  
     * @returns {import("./types").Attribute}
     */
    async function getAttributeByTag_API({ tag }) {
        const res = await client.get(`/attributes/${tag}`)
        return res.data 
    }

    const useGetAttribute = (APIParams = { tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getAttribute", APIParams.tag],
            queryFn: () => getAttributeByTag_API({ ...APIParams }),
            staleTime: Infinity,
            ...useQueryOptions
        })
    }

    /**
     * @description Returns the attribute count in the database.
     * @returns {Number} The total count in the database.
     */
    async function getAttributeCount_API() {
        const res = await client.get(`/attributes/count`)
        return res.data 
    }

    const useGetAttributeCount = (useQueryOptions = { staleTime: 300000 }) => {
        return useQuery({
            queryKey: ["getAttributeCount"],
            queryFn: getAttributeCount_API,
            ...useQueryOptions
        })
    }

    /**
     * @description Returns the attribute's children. The default stale time is 300000 ms.
     * @param {Object} props
     * @param {String} props.tag The attribute tag to be returned.  
     * @returns {String[]} - The attribute tags of the attribute's children
     */
    async function getAttributeChildrenByTag_API({ tag }) {
        const res = await client.get(`/attributes/${tag}/children`)
        return res.data 
    }

    const useGetAttributeChildren = (APIParams = { tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getAttributeChildren", APIParams.tag],
            queryFn: () => getAttributeChildrenByTag_API({ ...APIParams }),
            staleTime: 300000,
            ...useQueryOptions
        })
    }


    /**
     * @description Returns the attribute by group. The are attribute groups for example: mandatory, sample, qc, dataset etc.
     * @param {Object} props
     * @param {String} props.tag The attribute group.  
     * @param {Number} props.min_state The minimal submission state that is required for the attributes.
     * @returns {String[]} Returns the attribute tags that are part of the attribute group
     */
    async function getAttributeByGroup_API({ tag, min_state }) {
        const res = await client.get(`/attributes/groups/${tag}`, {params : {min_state}})
        return res.data 
    }

    const useGetAttributeByGroup = (APIParams = { tag, min_state }, useQueryOptions = {staleTime : 30000}) => {
        return useQuery({
            queryKey: ["getAttributeGroup", APIParams.tag, APIParams.min_state],
            queryFn: () => getAttributeByGroup_API({ ...APIParams }),
            ...useQueryOptions
        });
    }


    /**
     * @description Returns the attribute by group. The are attribute groups for example: mandatory, sample, qc, dataset etc.
     * @param {Object} props
     * @param {String} props.tag The attribute group.  
     * @param {Number} props.min_state The minimal submission state that is required for the attributes.
     * @returns {String[]} Returns the attribute tags that are part of the attribute group
     */
    async function getAttributeGroups_API({ limit }) {
        const res = await client.get(`/attributes/groups`, {params : {limit}})
        return res.data 
    }

    const useGetAttributeGroups = (APIParams = { limit }, useQueryOptions = { staleTime: 30000 }) => {
        return useQuery({
            queryKey: ["getAttributeGroups", APIParams.limit],
            queryFn: () => getAttributeGroups_API({ ...APIParams }),
            ...useQueryOptions
        });
    }
    /**
     * @description Returns the attributes and traits by a search string. Allows to subset the attributes by defining 
     * a minimum state (e.g. attributes have a minimum submission state requirement) and a boolean param (please see Attribute type). This 
     * request allows to filter attributes and traits by a search string and hence is meant to be used when querying throught the complete list. 
     * @param {Object} props 
     * @param {String} props.search_string - The search string (e.g. query)
     * @param {Number} props.min_state - Enumerate state integer 0-5. This gives the minimum state and restricts the attribute by the submission state that can be found.
     * @param {String} props.attribute_group - The attribute group tag. For multiple groups, use a semicolon separated string, for example "dataset;qc" 
     * @param {String} props.param_name - The name of an attribute param (boolean) that needs to be true. Example : allow_for_dataset, allow_for_qc,...
     * @param {Boolean} props.include_traits - If the traits should be returned along with the attribute that matches the given query. Note that this results in a different return type.
     * @param {Number} props.limit The limit applies to the number of attributes, not the number traits returned (if include_traits is enabled.)
     * @returns {import("./types").AttributeTraitQuery[]} - The traits and attributes tags ordered by priority 
     */
    async function getAttributesAndValuesByQuery_API({search_string, min_state, attribute_groups, include_traits, limit, group_by}) {
        const res = await client.get(`/attributes/q`, {params : {search_string, min_state, attribute_groups, include_traits, limit, group_by}})
        return res.data 
    }

    const useGetAttributesByQuery = (APIParams = {
        search_string,
        min_state,
        attribute_groups,
        limit,
        group_by,
        include_traits: true
    }, useQueryOptions = { staleTime: 300000, placeholderData: (prev) => prev }) => {
        return useQuery({
            queryKey: [
                "attributes_traits_by_query",
                APIParams.search_string,
                APIParams.min_state,
                APIParams.attribute_groups,
                APIParams.include_traits,
                APIParams.limit,
                APIParams.group_by,
            ],
            queryFn: () => getAttributesAndValuesByQuery_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    /**
     * @description Returns the attribute by minimal state. This means that the attribute can only be assigned to a submission if the submission matches the minimal state.
     * @param {Object} props
     * @param {String} props.tag The attribute group.  
     * @returns {String[]} Returns the attribute tags that are part of the attribute group
     */
    async function getAttributeMinState_API({ tag }) {
        const res = await client.get(`/attributes/${tag}/min_state`)
        return res.data
    }

    const useGetAttributeMinState = (APIParams = { tag }, useQueryOptions = { staleTime: 300000 }) => {
        return useQuery({
            queryKey: ["getAttributeMinState", APIParams.tag],
            queryFn: () => getAttributeMinState_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    const useGetAttributes = (APIParams = {tags : []}, useQueryOptions = {}) => {
        return useQueries(
            {queries: APIParams.tags.map((tag) => ({
                queryKey: ["getAttribute", tag],
                queryFn: () => getAttributeByTag_API({ tag }),
                staleTime: 300000,
                ...useQueryOptions
            }))}
        )
    }

return {
    useGetAttribute,
    useGetAttributes,
    useGetAttributeCount,
    useGetAttributeChildren,
    useGetAttributeByGroup,
    useGetAttributeGroups,
    useGetAttributesByQuery,
    useGetAttributeMinState,
  };
}