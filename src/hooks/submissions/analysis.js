// States and states changes of a submission 
import { useQuery } from "@tanstack/react-query"
import config from "../../../config"
import axios from "axios"

/**
 * @description Returns the condition applications defined for the submission
 * @param {Object} props 
 * @param {String} props.tag The submission tag.
 * @param {Boolean} props.filter_tag - The filter tag to filter the features before performing the PCA: only features associated with this tag will be used.
 * @returns {Object} The PCA data for the submission
 */
export async function getSubmissionPCA_API({ tag, annotation_tag }) {
    const res = await axios.get(`${config.baseURL}/submissions/analysis/${tag}/pca`, {
        params: { annotation_tag }
    })
    return res.data
}

export const useGetSubmissionPCA = (APIParams = {tag, annotation_tag}, useQueryOptions = { staleTime: 500}) => {
    return useQuery({
        queryKey: ["getSubmissionPCA", APIParams.tag, APIParams.annotation_tag],
        queryFn: () => getSubmissionPCA_API({ ...APIParams }),
        ...useQueryOptions
    })
}



/**
 * @description Returns the condition applications defined for the submission
 * @param {Object} props 
 * @param {String} props.tag The submission tag.
 * @param {String} props.ca_tag_left - The condition application tag for the left condition.
 * @param {String} props.ca_tag_right - The condition application tag for the right condition. Multiple ca_tags can be provided, separated by semicolons.
 * @param {String} props.annotation_tag - The annotation tag to use for the features.
 * @param {Boolean} props.impute - Whether to impute missing values.
 * @returns {Object} The PCA data for the submission
 */
export async function getSubmissionVolcano_API({ tag, ca_tag_left, ca_tag_right, annotation_tag,  impute, equal_variance }) {
    const res = await axios.get(`${config.baseURL}/submissions/analysis/${tag}/volcano`, {
        params: { ca_tag_left, ca_tag_right, annotation_tag, impute, equal_variance}
    })
    return res.data
}

export const useGetSubmissionVolcano = (APIParams = {tag, ca_tag_left, ca_tag_right, annotation_tag, impute : false, equal_variance : false}, useQueryOptions = { staleTime: 500}) => {
    return useQuery({
        queryKey: ["getSubmissionVolcano", APIParams.tag, APIParams.ca_tag_left, APIParams.ca_tag_right, APIParams.annotation_tag, APIParams.impute, APIParams.equal_variance],
        queryFn: () => getSubmissionVolcano_API({ ...APIParams }),
        ...useQueryOptions
    })
}





export async function getSubmissionAnnotationNetwork_API({ tag, annotation_group_tag }) {
    const res = await axios.get(`${config.baseURL}/submissions/analysis/${tag}/annotations/network`, {
        params: { annotation_group_tag }
    })
    return res.data
}


export const useGetSubmissionAnnotationNetwork = (APIParams = {tag, annotation_group_tag}, useQueryOptions = { staleTime: 500}) => {
    return useQuery({
        queryKey: ["getSubmissionAnnotationNetwork", APIParams.tag, APIParams.annotation_group_tag],
        queryFn: () => getSubmissionAnnotationNetwork_API({ ...APIParams }),
        ...useQueryOptions
    })
}




/**
 * @description Returns the heatmap data for the submission
 * @param {Object} props 
 * @param {String} props.tag The submission tag.
 * @param {String} props.annotation_tag - The annotation tag to use to filter features. Only features associated with this annotation tag will be included in the heatmap.
 * @returns {Object} The heatmap data for the submission
 */
export async function getSubmissionHeatmap_API({ tag, annotation_tag }) {
    const res = await axios.get(`${config.baseURL}/submissions/analysis/${tag}/heatmap`, {
        params: { annotation_tag }
    })
    return res.data
}


export const useGetSubmissionHeatmap = (APIParams = {tag, annotation_tag}, useQueryOptions = { staleTime: 50000}) => {
    return useQuery({
        queryKey: ["getSubmissionHeatmap", APIParams.tag, APIParams.annotation_tag],
        queryFn: () => getSubmissionHeatmap_API({ ...APIParams }),
        ...useQueryOptions
    })
}



