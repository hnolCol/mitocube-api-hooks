
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import config from "../../../config"

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
    const res = await axios.get(`${config.baseURL}/attributes/q`, {params : {search_string, min_state, attribute_groups, include_traits, limit, group_by}})
    return res.data 
}

export const useGetAttributesByQuery = (APIParams = {
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

