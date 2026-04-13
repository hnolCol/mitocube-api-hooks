import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "axios"
import _ from "lodash"

/**
 * 
 * @param {Object} props
 * @param {String} props.proteome_tag - Restrict filters to the given proteome tag 
 * @param {String} props.feature_tag - Restrict filters to the given feature_tag (e.g. the filter must be part of the filter)
 * @param {String} props.submission_tag - Restrict the filter for the submission tag (e.g. which filter are available for the given submission.)
 * @returns {import("./types").Filter[]} - The filter found for the given proteome_tag 
 */
async function getFilters_API({proteome_tag, protein_tag, submission_tag}){
    const res = await axios.get("/api/filters/q", {params : {proteome_tag, protein_tag, submission_tag}} )
    return res.data
}

export function useGetFilters (APIParams = {proteome_tag, protein_tag, submission_tag}, useQueryOptions = {}) {
    return useQuery({
        queryKey: ["getFilters",
            APIParams.proteome_tag,
            APIParams.protein_tag,
            APIParams.submission_tag],
        queryFn: () => getFilters_API({ ...APIParams }),
        ...useQueryOptions
    });
}



/**
 * @description Adds a filter set to the database. Requires admin rights. 
 * @param {Object} props
 * @param {String} props.proteome_tag - The uniprot proteome tag 
 * @param {String[]} props.protein_tags - List of protein tags (Uniprot IDs)
 * @param {String} props.description - Description of the filter that is displayed to the user. 
 * @param {String} props.publication - A publication by which the filter is defined. 
 * @param {String} props.text - The actual name of the filter. This will also define the tag (lowercase, removed spaces to '_'). 
 * @returns 
 */
async function postFilter_API({proteome_tag, protein_tags, description, text, publication}){
    //fetch availabe features from the API. Reconsider /details 
    const res = await axios.post("/api/filters", {
        proteome_tag,
        text,
        description,
        protein_tags,
        publication,
        tag: text.replaceAll(" ", "_").toLowerCase() 
    })
    return res.data
}

export const usePostFilter = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => postFilter_API({ ...APIParams }),
        ...useMutationOptions
    });
}


/**
 * @description Deletes a filter by its tag. Requires admin rights. 
 * @param {Object} props
 * @param {String} props.tag - The filter tag
 * @returns 
 */
async function deleteFilter_API({ tag }) {
    const res = await axios.delete(`/api/filters/${tag}`)
    return res.data
}

export const useDeleteFilter = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams) => deleteFilter_API({ ...APIParams }),
        ...useMutationOptions
    });
}




