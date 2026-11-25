import { useQuery, useMutation } from "@tanstack/react-query";
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

  /**
   * @description 1D shift analysis ("systematic shifted annotations"): two-sided Mann-Whitney U
   * test per annotation comparing the 1D values (e.g. log2FC of a volcano plot) of the
   * annotation's member proteins against all other proteins of the background universe,
   * Benjamini-Hochberg FDR corrected. POST because the per-protein values payload can be large.
   * Endpoint: POST '/api/annotations/analysis/shift'
   * @param {Object} props
   * @param {Object} props.protein_values Map of protein tag -> 1D value (e.g. log2FC).
   * @param {String[]} [props.submission_tags] Submissions defining the universe (alternative to proteome_tag).
   * @param {String} [props.proteome_tag] Proteome defining the universe.
   * @param {String} [props.group_tag] Restrict tested annotations to this annotation group.
   * @param {String} [props.search_string] Only test annotations whose text/tag contains this string.
   * @param {Number} [props.min_size=3] Minimum member/non-member count per annotation.
   * @param {Number} [props.limit] Maximum number of results.
   * @returns {Array} Records with annotation_tag, text, n_in, n_out, mean_in, mean_out, shift,
   * direction ("up"/"down"), u_statistic, p_value, fdr - sorted by p_value.
   */
  async function postAnnotationShift_API({ protein_values, submission_tags, proteome_tag, group_tag, search_string, min_size, limit }) {
    const res = await client.post(`/annotations/analysis/shift`, {
      protein_values, submission_tags, proteome_tag, group_tag, search_string, min_size, limit
    })
    return res.data
  }

  const usePostAnnotationShift = (useMutationOptions = {}) => {
    return useMutation({
      mutationFn: (APIParams) => postAnnotationShift_API({ ...APIParams }),
      ...useMutationOptions
    });
  }

  /**
   * @description Gene set enrichment (GSEA) style analysis of annotations for the ranked list of a
   * pairwise condition application comparison. The ranked list is computed server side from the
   * submission's quantifications (log2FC of ca_tag_left vs ca_tag_right), so only the ca tags and
   * the annotation group are sent. Per annotation: weighted Kolmogorov-Smirnov running-sum
   * enrichment score, Monte Carlo nominal p-value, NES and Benjamini-Hochberg FDR.
   * Endpoint: GET '/api/annotations/analysis/gsea'
   * @param {Object} props
   * @param {String} props.submission_tag Submission tag of the pairwise comparison.
   * @param {String} props.ca_tag_left Condition application tag of the left (up-regulated) group.
   * @param {String} props.ca_tag_right Condition application tag of the right group.
   * @param {String} [props.within_attribute_tags] Optional within attribute tags (as in the volcano plot).
   * @param {String} [props.within_ca_tags] Optional within condition application tags (as in the volcano plot).
   * @param {String} [props.annotation_tag] Optional proteome annotation tag context (as in the volcano plot).
   * @param {String} [props.equal_variance=true] Use equal variance for the pairwise t-test.
   * @param {String} props.group_tag Annotation group whose annotations are tested.
   * @param {Number} [props.min_size=5] Minimum number of ranked proteins per annotation.
   * @param {Number} [props.max_size] Maximum number of ranked proteins per annotation.
   * @param {Number} [props.n_permutations=1000] Monte Carlo permutations for the null distribution.
   * @param {Number} [props.weight_p=1] GSEA weight exponent p (0 = unweighted, 1 = classic).
   * @param {Number} [props.limit] Maximum number of results.
   * @returns {Array} Records with annotation_tag, text, size, es, nes, p_value, fdr - sorted by p_value.
   */
  async function getAnnotationGSEA_API({ submission_tag, ca_tag_left, ca_tag_right, within_attribute_tags, within_ca_tags, annotation_tag, equal_variance, group_tag, min_size, max_size, n_permutations, weight_p, limit }) {
    const res = await client.get(`/annotations/analysis/gsea`, {
      params: { submission_tag, ca_tag_left, ca_tag_right, within_attribute_tags, within_ca_tags, annotation_tag, equal_variance, group_tag, min_size, max_size, n_permutations, weight_p, limit }
    })
    return res.data
  }

  const useGetAnnotationGSEA = (APIParams = { submission_tag, ca_tag_left: "", ca_tag_right: "", within_attribute_tags: undefined, within_ca_tags: undefined, annotation_tag: undefined, equal_variance: true, group_tag: "", min_size: 5, max_size: undefined, n_permutations: 1000, weight_p: 1, limit: undefined }, useQueryOptions = { staleTime: 60000 }) => {
    return useQuery({
      queryKey: ["getAnnotationGSEA", APIParams.submission_tag, APIParams.ca_tag_left, APIParams.ca_tag_right, APIParams.within_attribute_tags, APIParams.within_ca_tags, APIParams.annotation_tag, APIParams.equal_variance, APIParams.group_tag, APIParams.min_size, APIParams.max_size, APIParams.n_permutations, APIParams.weight_p, APIParams.limit],
      queryFn: () => getAnnotationGSEA_API({ ...APIParams }),
      enabled: _.isObject(APIParams) && _.isString(APIParams.ca_tag_left) && APIParams.ca_tag_left.length > 0 && _.isString(APIParams.ca_tag_right) && APIParams.ca_tag_right.length > 0 && _.isString(APIParams.group_tag) && APIParams.group_tag.length > 0,
      ...useQueryOptions
    });
  }

  /**
   * @description Running-sum series of a single annotation for the GSEA plot. Same comparison and
   * parameters as useGetAnnotationGSEA, but returns the full running-sum series, hit ranks and
   * leading edge of the annotation given by plot_annotation_tag.
   * Endpoint: GET '/api/annotations/analysis/gsea/series'
   * @param {Object} props Same as useGetAnnotationGSEA, plus:
   * @param {String} props.plot_annotation_tag Tag of the annotation to plot.
   * @returns {Object|null} Record with annotation_tag, text, size, leading_edge_size, es, nes,
   * p_value, es_rank, running_sum (one value per rank), hit_ranks, leading_edge_ranks - or null.
   */
  async function getAnnotationGSEASeries_API({ submission_tag, ca_tag_left, ca_tag_right, within_attribute_tags, within_ca_tags, annotation_tag, equal_variance, group_tag, plot_annotation_tag, min_size, n_permutations, weight_p }) {
    const res = await client.get(`/annotations/analysis/gsea/series`, {
      params: { submission_tag, ca_tag_left, ca_tag_right, within_attribute_tags, within_ca_tags, annotation_tag, equal_variance, group_tag, plot_annotation_tag, min_size, n_permutations, weight_p }
    })
    return res.data
  }

  const useGetAnnotationGSEASeries = (APIParams = { submission_tag, ca_tag_left: "", ca_tag_right: "", within_attribute_tags: undefined, within_ca_tags: undefined, annotation_tag: undefined, equal_variance: true, group_tag: "", plot_annotation_tag: "", min_size: 1, n_permutations: 1000, weight_p: 1 }, useQueryOptions = { staleTime: 60000 }) => {
    return useQuery({
      queryKey: ["getAnnotationGSEASeries", APIParams.submission_tag, APIParams.ca_tag_left, APIParams.ca_tag_right, APIParams.within_attribute_tags, APIParams.within_ca_tags, APIParams.annotation_tag, APIParams.equal_variance, APIParams.group_tag, APIParams.plot_annotation_tag, APIParams.min_size, APIParams.n_permutations, APIParams.weight_p],
      queryFn: () => getAnnotationGSEASeries_API({ ...APIParams }),
      enabled: _.isObject(APIParams) && _.isString(APIParams.plot_annotation_tag) && APIParams.plot_annotation_tag.length > 0 && _.isString(APIParams.ca_tag_left) && APIParams.ca_tag_left.length > 0 && _.isString(APIParams.ca_tag_right) && APIParams.ca_tag_right.length > 0 && _.isString(APIParams.group_tag) && APIParams.group_tag.length > 0,
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
        useGetAnnotationEnrichment,
        usePostAnnotationShift,
        useGetAnnotationGSEA,
        useGetAnnotationGSEASeries
   };
}