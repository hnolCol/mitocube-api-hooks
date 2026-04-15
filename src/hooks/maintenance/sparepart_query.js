import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { use } from "react";

export function createQuerySparePartsAPI(client) {

  /**
   * @description Finds a sparepart by its search string.
   * @returns {String[]} - The tags matching the search string. 
   */
  async function getSparePartByQuery_API({search_string, limit}) {
    const res = await client.get(`/maintenance/spareparts/q`, { params: { search_string, limit } })
    return res.data 
  }

  const useGetSparePartByQuery = (APIParams = {search_string : "", limit : 10 }, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getSparePartBySearchString", APIParams.search_string, APIParams.limit],
        queryFn: () => getSparePartByQuery_API({...APIParams}),
        ...useQueryOptions
    });
  }


  /**
  * @description  Returns a sparepart by its tag. 
  * @returns {String[]} - The tags matching the search string. 
  */
  async function getSparePartByTag_API({tag}) {
    const res = await client.get(`/maintenance/spareparts/${tag}`)
    return res.data 
  }

  const useGetSparePartByTag = (APIParams = { tag: "" }, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getSparePartByTag", APIParams.tag],
        queryFn: () => getSparePartByTag_API({...APIParams}),
        ...useQueryOptions
    });
  }

  /**
  * @description Returns the text of a sparepart.
  * @returns {String}
  */
  async function getSparePartText_API({ tag }) {
    const res = await client.get(`/maintenance/spareparts/${tag}/text`)
    return res.data
  }

  const useGetSparePartText = (APIParams = { tag }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getSparePartText", APIParams.tag],
        queryFn: () => getSparePartText_API({ ...APIParams }),
        ...useQueryOptions
    });
  }

  /**
  * @description Returns the description of a sparepart.
  * @returns {String}
  */
  async function getSparePartDescription_API({ tag }) {
    const res = await client.get(`/maintenance/spareparts/${tag}/description`)
    return res.data
  }

  const useGetSparePartDescription = (APIParams = { tag }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getSparePartDescription", APIParams.tag],
        queryFn: () => getSparePartDescription_API({ ...APIParams }),
        ...useQueryOptions
    });
  }

  /**
  * @description Returns the company of a sparepart.
  * @returns {String}
  */
  async function getSparePartCompany_API({ tag }) {
    const res = await client.get(`/maintenance/spareparts/${tag}/company`)
    return res.data
  }

  const useGetSparePartCompany = (APIParams = { tag }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getSparePartCompany", APIParams.tag],
        queryFn: () => getSparePartCompany_API({ ...APIParams }),
        ...useQueryOptions
    });
  }

  /**
  * @description Returns the product ID of a sparepart.
  * @returns {String}
  */
  async function getSparePartProductID_API({ tag }) {
    const res = await client.get(`/maintenance/spareparts/${tag}/product_id`)
    return res.data
  }

  const useGetSparePartProductID = (APIParams = { tag }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getSparePartProductID", APIParams.tag],
        queryFn: () => getSparePartProductID_API({ ...APIParams }),
        ...useQueryOptions
    });
  }

  /**
  * @description Returns the price of a sparepart.
  * @returns {Number}
  */
  async function getSparePartPrice_API({ tag }) {
    const res = await client.get(`/maintenance/spareparts/${tag}/price`)
    return res.data
  }

  const useGetSparePartPrice = (APIParams = { tag }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getSparePartPrice", APIParams.tag],
        queryFn: () => getSparePartPrice_API({ ...APIParams }),
        ...useQueryOptions
    });
  }

  /**
  * @description Returns the  link of a sparepart.
  * @returns {String}
  */
  async function getSparePartLink_API({ tag }) {
    const res = await client.get(`/maintenance/spareparts/${tag}/link`)
    return res.data
  }

  const useGetSparePartLink = (APIParams = { tag }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getSparePartLink", APIParams.tag],
        queryFn: () => getSparePartLink_API({ ...APIParams }),
        ...useQueryOptions
    });
  }


  /**
   * Fetch sparepart permissions for a given sparepart tag
   * @param {Object} props
   * @param {String} 
   */

  async function getSparepartPermissions_API({}) {
    const res = await client.get(`/maintenance/permissions/spareparts`);
    return res.data;
  }

  const useGetSparepartPermissions = (APIParams = { }, useQueryOptions = {}) => {
    return useQuery({
      queryKey: ["getSparepartPermissions"],
      queryFn: () => getSparepartPermissions_API({ ...APIParams }),
      ...useQueryOptions
    });
  };


  return {
    useGetSparePartByQuery,
    useGetSparePartByTag,
    useGetSparePartText,
    useGetSparePartDescription,
    useGetSparePartCompany,
    useGetSparePartProductID,
    useGetSparePartPrice,
    useGetSparePartLink,  
    useGetSparepartPermissions
  }

}