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

  async function getAnnotationsBySearchString_API({ search_string, group_tags, protein_tags,limit, group_by_group }) {
    const res = await client.get(`/annotations/q`, { params: { search_string, group_tags, protein_tags, limit, group_by_group}})
    return res.data
  }

  const useGetAnnotationsBySearchString = (APIParams = { search_string, limit: 10, group_by_group, group_tags, protein_tags}, useQueryOptions = {stateTime: 200000}) => {
    return useQuery({
        queryKey: ["getAnnotationsBySearchString",
            APIParams.search_string,
            APIParams.group_by_group,
            APIParams.limit,
            APIParams.protein_tags],
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
        useGetAnnotationPermissions
   };
}