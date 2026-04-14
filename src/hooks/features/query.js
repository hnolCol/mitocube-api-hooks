
import axios from "axios"
import { useQuery } from "@tanstack/react-query"


/**
 * @description Find features (protein groups/ proteins, peptides) by a search string. Endpoint: /api/features/q
 * @param {Object} props
 * @param {String} props.search_string - The search string to look for (e.g. Uniprot ID)
 * @param {String} props.submission_tag - The submission tag to limit the search to a specific submission. If provided, the protein/group/peptide must have been quantified in the submission.
 * @param {String} props.include_types - The types of features to include in the search. One of "protein_groups", "proteins", "peptides". Separated by semicolon (;)
 * @param {String} props.exclude_types - The types of features to exclude from the search. One of "protein_groups", "proteins", "peptides". Separated by semicolon (;)
 * @param {Number} props.limit - The maximum number of results to return
 * @returns {} The feature search results.  
 */
async function featureInfoByTag_API({ search_string, submission_tag, include_types, exclude_types, limit }) {
    const res = await axios.get(`/api/features/q`, { params: { search_string, submission_tag, include_types, exclude_types, limit } })
    return res.data
}

export function useGetFeaturesByQuery(APIParams = {search_string, submission_tag, include_types, exclude_types, limit}, useQueryOptions = { }) {
    return useQuery({
        queryKey: ["infoFeature", APIParams.search_string, APIParams.submission_tag, APIParams.include_types, APIParams.exclude_types, APIParams.limit],
        queryFn: () => featureInfoByTag_API({ ...APIParams }),
        ...useQueryOptions
    }); 
}