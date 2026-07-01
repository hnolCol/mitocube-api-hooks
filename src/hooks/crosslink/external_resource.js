import { useQuery } from "@tanstack/react-query";

export function createQueryExternalResourcesAPI(client) {
  /**
   * @description Get external resource by its tag.
   * @returns {Object} - The external resource matching the tag.
   */
  async function getExternalResourceByTag_API({ tag }) {
    const res = await client.get(`/external-resources/${tag}`)
    return res.data
  }
  const useGetExternalResourceByTag = (APIParams = { tag: "" }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
      queryKey: ["getExternalResourceByTag", APIParams.tag],
      queryFn: () => getExternalResourceByTag_API({ ...APIParams }),
      ...useQueryOptions
    });
  }

  /**
   * @description Get tags of all external resources.
   * @returns {Array} - Array of external resource tags.
   */
  async function getExternalResources_API({ limit }) {
    const res = await client.get(`/external-resources`, { params: { limit } })
    return res.data
  }
  const useGetExternalResources = (APIParams = { limit: undefined }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
      queryKey: ["getExternalResources", APIParams.limit],
      queryFn: () => getExternalResources_API({ ...APIParams }),
      ...useQueryOptions
    });
  }

  /**
   * @description Get crosslinks linked to the given external resource.
   * @returns {Array} - Array of CrosslinkModel
   */
  async function getCrosslinksByResource_API({ tag, limit = 100 }) {
    const res = await client.get(`/external-resources/${tag}/crosslinks`, { params: { limit } })
    return res.data
  }
  const useGetCrosslinksByResource = (APIParams = { tag: "", limit: 100 }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
      queryKey: ["getCrosslinksByResource", APIParams.tag, APIParams.limit],
      queryFn: () => getCrosslinksByResource_API({ ...APIParams }),
      ...useQueryOptions
    });
  }

  /**
   * @description Get external resources that have crosslink annotations involving the given protein,
   * with the crosslink count per resource.
   * @returns {Array} - Array of { tag, title, link, doi, type, crosslink_count }
   */
  async function getExternalResourcesByProteinTag_API({ protein_tag }) {
    const res = await client.get(`/external-resources/protein/${protein_tag}`)
    return res.data
  }
  const useGetExternalResourcesByProteinTag = (APIParams = { protein_tag: "" }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
      queryKey: ["getExternalResourcesByProteinTag", APIParams.protein_tag],
      queryFn: () => getExternalResourcesByProteinTag_API({ ...APIParams }),
      ...useQueryOptions
    });
  }

  return {
    useGetExternalResourceByTag,
    useGetExternalResources,
    useGetCrosslinksByResource,
    useGetExternalResourcesByProteinTag
  };
}