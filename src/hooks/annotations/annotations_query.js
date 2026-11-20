import { useQuery } from "@tanstack/react-query";
import _ from "lodash";

export function createQueryAnnotationsAPI(client) {
    
  /**
   * @description Get annotation by the tag.
   * @returns {Object} - The annotation matching the tag.
   */

  async function getAnnotationsByTag_API({ tag }) {
    const res = await client.get(`/annotations/${tag}`)
    return res.data
  }

  const useGetAnnotationsByTag = (APIParams = { tag: "" }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getAnnotationsByTag", APIParams.tag],
        queryFn: () => getAnnotationsByTag_API({ ...APIParams }),
        ...useQueryOptions
    });
  }


  /**
  * @description Get annotation by search string.
  * @return {Object} - The annotation matching thhe search string. 
  */

  async function getAnnotationsBySearchString_API({ search_string, group_tags, protein_tags, limit, group_by_group, submission_tags }) {
    const res = await client.get(`/annotations/q`, { params: { search_string, group_tags, protein_tags, limit, group_by_group, submission_tags }})
    return res.data
  }

  const useGetAnnotationsBySearchString = (APIParams = { search_string, limit: 10, group_by_group, group_tags, protein_tags, submission_tags }, useQueryOptions = {stateTime: 200000}) => {
    return useQuery({
        queryKey: ["getAnnotationsBySearchString",
            APIParams.search_string,
            APIParams.group_by_group,
            APIParams.limit,
            APIParams.group_tags,
            APIParams.protein_tags,
            APIParams.submission_tags,
            ],
        queryFn: () => getAnnotationsBySearchString_API({ ...APIParams }),
        ...useQueryOptions
    });
  } 

  /**
  * @description Get annotation by protein tag. 
  * @returns {Object} - The annotation matching hhe protein tag.
  */

  async function getAnnotationsByProteinTag_API ({ protein_tag }) {
    const res = await client.get(`/annotations/proteins/${protein_tag}`)
    return res.data
  }

  const useGetAnnotationsByProteinTag = (APIParams = { protein_tag: "" }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getAnnotationsByProteinTag", APIParams.protein_tag],
        queryFn: () => getAnnotationsByProteinTag_API({ ...APIParams }),
        ...useQueryOptions
    });
  }

  /**
  * @description Get annotation by group tag.
  * @returns {Object} - The annotation matching the group tag.   
  */

  async function getAnnotationsByGroupTag_API ({ tag, limit = 20 }) {
    const res = await client.get(`/annotations/groups/${tag}/annotations`, {
        params: { limit }
    })
    return res.data
  }

  const useGetAnnotationsByGroupTag = (APIParams = { tag: "", limit: 20 }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getAnnotationsByGroupTag", APIParams.tag, APIParams.limit],
        queryFn: () => getAnnotationsByGroupTag_API({ ...APIParams }),
        ...useQueryOptions
    });
  }


  /**
   * @description Get annotation protein count.
   * @returns
   */

  async function getAnnotationProteinCount_API({ tag }) {
    const res = await client.get(`/annotations/${tag}/proteins/count`)
    return res.data
  }       

  const useGetAnnotationProteinCount = (APIParams = { tag: "" }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getAnnotationProteinCount", APIParams.tag],
        queryFn: () => getAnnotationProteinCount_API({ ...APIParams }),
        ...useQueryOptions
    });
  }


  /**
  * @description Get annotation group by its tag.
  * @returns 
  */

  async function getAnnotationGroupByTag_API({ tag }) {
    const res = await client.get(`/annotations/groups/${tag}`)
    return res.data
  }

  const useGetAnnotationGroupByTag = (APIParams = { tag: "" }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getAnnotationGroupByTag", APIParams.tag],
        queryFn: () => getAnnotationGroupByTag_API({ ...APIParams }),
        ...useQueryOptions
    });
  }

  /**
  * @description Get annotation group by query.
  * @returns 
  */

  async function getAnnotationGroupByQuery_API({ search_string, limit }) {
    const res = await client.get(`/annotations/groups/q`, { params: { search_string, limit}})
    return res.data
  }

  const useGetAnnotationGroupByQuery = (APIParams = { search_string: "", limit: 10}, useQueryOptions = {stateTime: 200000}) => {
    return useQuery({
        queryKey: ["getAnnotationGroupByQuery", APIParams.search_string],
        queryFn: () => getAnnotationGroupByQuery_API({ ...APIParams }),
        ...useQueryOptions
    });
  }


  /**
   * @description Get annotation counnt in a group.
   * @returns
   */

  async function getAnnotationGroupCount_API({ tag }) {
    const res = await client.get(`/annotations/groups/${tag}/annotations/count`)
    return res.data
  }       

  const useGetAnnotationGroupCount = (APIParams = { tag: "" }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getAnnotationGroupCount", APIParams.tag],
        queryFn: () => getAnnotationGroupCount_API({ ...APIParams }),
        ...useQueryOptions
    });
  }


  /**
   * @description Get bool if protein is in annotation 
   * @returns
   */

  async function getIsProteinInAnnotation_API({ tag, protein_tag }) {
    const res = await client.get(`/annotations/${tag}/annotates/${protein_tag}`)
    return res.data
  }       

  const useGetIsProteinInAnnotation = (APIParams = { tag, protein_tag }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getIsProteinInAnnotation", APIParams.tag, APIParams.protein_tag],
        queryFn: () => getIsProteinInAnnotation_API({ ...APIParams }),
        ...useQueryOptions
    });
  }   

  /**
   * @description Get proteins for annotation tag
   * @returns {Array} - Array of protein tags
   */
  async function getProteinsByAnnotation_API({ tag, submission_tag }) {
    const params = {};
    if (submission_tag) params.submission_tag = submission_tag;
    
    const res = await client.get(`/annotations/${tag}/proteins`, { params })
    return res.data
  }

  const useGetProteinsByAnnotation = (APIParams = { tag: "", submission_tag: "" }, useQueryOptions = { staleTime: 6000 }) => {
    return useQuery({
        queryKey: ["getProteinsByAnnotation", APIParams.tag, APIParams.submission_tag],
        queryFn: () => getProteinsByAnnotation_API({ ...APIParams }),
        ...useQueryOptions
    });
  }


  /**
   * Fetch annotation permissions for a given annotation tag
   * @param {Object} props
   * @param {String}
   */

  async function getAnnotationPermissions_API({}) {
    const res = await client.get(`/annotations/{tag}/permissions`);
    return res.data;
  }

  const useGetAnnotationPermissions = (APIParams = { }, useQueryOptions = {}) => {
    return useQuery({
      queryKey: ["getAnnotationPermissions"],
      queryFn: () => getAnnotationPermissions_API({ ...APIParams }),
      ...useQueryOptions
    });
  };

  /**
   * @description Enrichment analysis of annotations for a defined target protein list.
   * One-sided Fisher exact test (greater) per annotation against a background universe,
   * Benjamini-Hochberg FDR corrected. The universe is either the union of the proteins
   * quantified in the given submissions (submission-wide) or all proteins of a proteome
   * (cross-submission comparison of the same proteome).
   * Endpoint: GET '/api/annotations/analysis/enrichment'
   * @param {Object} props
   * @param {String} props.target_proteins Semicolon-separated target protein tags.
   * @param {String} [props.submission_tags] Semicolon-separated submission tags defining the universe.
   * @param {String} [props.proteome_tag] Proteome tag defining the universe (alternative to submission_tags).
   * @param {String} [props.group_tag] Restrict tested annotations to this annotation group.
   * @param {String} [props.search_string] Only test annotations whose text/tag contains this string.
   * @param {Number} [props.min_overlap=1] Minimum overlap of the annotation with the target list.
   * @param {Number} [props.limit] Maximum number of results.
   * @returns {Array} Records with annotation_tag, text, target_with_annotation, target_total,
   * universe_with_annotation, universe_total, odds_ratio, p_value, fdr - sorted by p_value.
   */
  async function getAnnotationEnrichment_API({ target_proteins, submission_tags, proteome_tag, group_tag, search_string, min_overlap, limit }) {
    const res = await client.get(`/annotations/analysis/enrichment`, {
      params: { target_proteins, submission_tags, proteome_tag, group_tag, search_string, min_overlap, limit }
    })
    return res.data
  }

  const useGetAnnotationEnrichment = (APIParams = { target_proteins: "", submission_tags: undefined, proteome_tag: undefined, group_tag: undefined, search_string: undefined, min_overlap: 1, limit: undefined }, useQueryOptions = { staleTime: 60000 }) => {
    return useQuery({
      queryKey: ["getAnnotationEnrichment", APIParams.target_proteins, APIParams.submission_tags, APIParams.proteome_tag, APIParams.group_tag, APIParams.search_string, APIParams.min_overlap, APIParams.limit],
      queryFn: () => getAnnotationEnrichment_API({ ...APIParams }),
      ...useQueryOptions
    });
  }

  return {
        useGetAnnotationsByTag,
        useGetAnnotationsBySearchString,
        useGetAnnotationsByProteinTag,
        useGetAnnotationsByGroupTag,
        useGetAnnotationProteinCount,
        useGetAnnotationGroupByTag,
        useGetAnnotationGroupByQuery,
        useGetAnnotationGroupCount,
        useGetIsProteinInAnnotation,
        useGetProteinsByAnnotation,
        useGetAnnotationPermissions,
        useGetAnnotationEnrichment
   };
}