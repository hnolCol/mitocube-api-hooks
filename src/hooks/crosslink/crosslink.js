import { useQuery } from "@tanstack/react-query";

export function createQueryCrosslinksAPI(client) {
  /**
   * @description Get crosslink by its tag.
   * @returns {Object} - CrosslinkModel
   */
  async function getCrosslinkByTag_API({ tag }) {
    const res = await client.get(`/crosslinks/${tag}`)
    return res.data
  }
  const useGetCrosslinkByTag = (APIParams = { tag: "" }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
      queryKey: ["getCrosslinkByTag", APIParams.tag],
      queryFn: () => getCrosslinkByTag_API({ ...APIParams }),
      ...useQueryOptions
    });
  }

  /**
   * @description Get crosslinks for a protein, optionally filtered by external resource.
   * @returns {Array} - Array of CrosslinkModel
   */
    async function getCrosslinksByProteinTag_API({ protein_tag, resource_tag, limit = undefined }) {
    const res = await client.get(`/crosslinks/protein/${protein_tag}`, { params: { resource_tag, limit } })
    return res.data
    }
    const useGetCrosslinksByProteinTag = (APIParams = { protein_tag: "", resource_tag: undefined, limit: undefined }, useQueryOptions = { stateTime: 200000 }) => {
        return useQuery({
            queryKey: ["getCrosslinksByProteinTag", APIParams.protein_tag, APIParams.resource_tag, APIParams.limit],
            queryFn: () => getCrosslinksByProteinTag_API({ ...APIParams }),
            ...useQueryOptions
        });
    }


  return {
    useGetCrosslinkByTag,
    useGetCrosslinksByProteinTag,
  };
}