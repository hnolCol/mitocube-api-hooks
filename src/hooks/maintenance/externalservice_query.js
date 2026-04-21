import { useQuery } from "@tanstack/react-query";
import _ from "lodash";

export function createQueryExternalServiceAPI(client) {

  /**
   * @description Get external service by tag.
   * @returns {string[]} - The external service matching the tag. 
   */

  async function getExternalServiceByTag_API({tag}) {
    const res = await client.get(`/maintenance/externalservice/${tag}`)
    return res.data
  }

  const useGetExternalServiceByTag = (APIParams = {tag: ""}, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getExternalServiceByTag", APIParams.tag],
        queryFn: () => getExternalServiceByTag_API({...APIParams}),
        ...useQueryOptions
    });
  } 

  /**
  * @description
  * @returns {string[]} - The External Service matching the query.
  */

  async function getExternalServiceByQuery_API({search_string, limit}) {
    const res = await client.get(`/maintenance/externalservice/q`, { params: { search_string, limit } })
    return res.data 
  }

  const useGetExternalServiceByQuery = (APIParams = {search_string : "", limit : 10}, useQueryOptions = {stateTime : 200000, placeholderData: (prev) => prev}) => {
    return useQuery({
        queryKey: ["getExternalServiceBySearchString", APIParams.search_string, APIParams.limit],
        queryFn: () => getExternalServiceByQuery_API({...APIParams}),
        ...useQueryOptions
    });
  }


  /**
   * @description Returns the description of an external service.
   * @returns {String}
   */
  async function getExternalServiceDescription_API({ tag }) {
    const res = await client.get(`/maintenance/externalservice/${tag}/description`)
    return res.data
  }

  const useGetExternalServiceDescription = (APIParams = { tag }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getExternalServiceDescription", APIParams.tag],
        queryFn: () => getExternalServiceDescription_API({ ...APIParams }),
        ...useQueryOptions
    });
  }

  /**
  * @description Returns the name of the person 
  * @returns {String}
  */
  async function getExternalServiceName_API({ tag }) {
    const res = await client.get(`/maintenance/externalservice/${tag}/name`)
    return res.data
  }

  const useGetExternalServiceName = (APIParams = { tag }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getExternalServiceName", APIParams.tag],
        queryFn: () => getExternalServiceName_API({ ...APIParams }),
        ...useQueryOptions
    });
  }

  /**
  * @description Returns the name of the company 
  * @returns {String}
  */
  async function getExternalServiceCompany_API({ tag }) {
    const res = await client.get(`/maintenance/externalservice/${tag}/company`)
    return res.data
  }

  const useGetExternalServiceCompany = (APIParams = { tag }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getExternalServiceCompany", APIParams.tag],
        queryFn: () => getExternalServiceCompany_API({ ...APIParams }),
        ...useQueryOptions
    });
  }

  /**
  * @description Returns the email of the contact person
  * @returns {String}
  */
  async function getExternalServiceEmail_API({ tag }) {
    const res = await client.get(`/maintenance/externalservice/${tag}/email`)
    return res.data
  }

  const useGetExternalServiceEmail = (APIParams = { tag }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getExternalServiceEmail", APIParams.tag],
        queryFn: () => getExternalServiceEmail_API({ ...APIParams }),
        ...useQueryOptions
    });
  }

  /**
  * @description Returns the costs of the service
  * @returns {Float | int}
  */
  async function getExternalServiceCosts_API({ tag }) {
    const res = await client.get(`/maintenance/externalservice/${tag}/costs`)
    return res.data
  }

  const useGetExternalServiceCosts = (APIParams = { tag }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getExternalServiceCosts", APIParams.tag],
        queryFn: () => getExternalServiceCosts_API({ ...APIParams }),
        ...useQueryOptions
    });
  }

  /**
  * @description Returns the billing number of the service
  * @returns {String}
  */

  async function getExternalServiceBillingNumber_API({ tag }) {
    const res = await client.get(`/maintenance/externalservice/${tag}/billing_number`)
    return res.data
  }

  const useGetExternalServiceBillingNumber = (APIParams = { tag }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getExternalServiceBillingNumber", APIParams.tag],
        queryFn: () => getExternalServiceBillingNumber_API({ ...APIParams }),
        ...useQueryOptions
    });
  }

  /**
  * @description Returns the internal ID of the service
  * @returns {String}
  */

  async function getExternalServiceInternalID_API({ tag }) {
    const res = await client.get(`/maintenance/externalservice/${tag}/internal_id`)
    return res.data
  }

  const useGetExternalServiceInternalID = (APIParams = { tag }, useQueryOptions = { stateTime: 200000 }) => {
    return useQuery({
        queryKey: ["getExternalServiceInternalID", APIParams.tag],
        queryFn: () => getExternalServiceInternalID_API({ ...APIParams }),
        ...useQueryOptions
    });
  }

  /**
   * Fetch external service permissions for a given external service tag
   * @param {Object} props
   * @param {String} 
   */

  async function getExternalServicePermissions_API({}) {
    const res = await client.get(`/maintenance/permissions/externalservice`);
    return res.data;
  }

  const useGetExternalServicePermissions = (APIParams = { }, useQueryOptions = {}) => {
    return useQuery({
      queryKey: ["getExternalServicePermissions"],
      queryFn: () => getExternalServicePermissions_API({ ...APIParams }),
      ...useQueryOptions
    });
  };


  return {
    useGetExternalServiceByTag,
    useGetExternalServiceByQuery,
    useGetExternalServiceDescription,
    useGetExternalServiceName,
    useGetExternalServiceCompany,
    useGetExternalServiceEmail,
    useGetExternalServiceCosts,
    useGetExternalServiceBillingNumber,
    useGetExternalServiceInternalID,
    useGetExternalServicePermissions
  }

}