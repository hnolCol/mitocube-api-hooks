import { useQuery } from "@tanstack/react-query";
import _ from "lodash";

export function createQueryMaintenanceProceduresAPI(client) {

  /**
   * Fetch procedure permissions for a given genotype tag
   * @param {Object} props
   * @param {String} 
   */

  async function getProcedurePermissions_API({ }) {
    const res = await client.get(`/maintenance/permissions/procedures`);
    return res.data;
  }

  const useGetProcedurePermissions = (APIParams = { }, useQueryOptions = {}) => {
    return useQuery({
      queryKey: ["getProcedurePermissions"],
      queryFn: () => getProcedurePermissions_API({ ...APIParams }),
      ...useQueryOptions
    });
  };



  /**
   * @description Finds a procedure by its search string.
   * @returns {String[]} - The tags matching the search string. 
   */
  async function getMaintenanceProcedureByQuery_API({search_string, limit}) {
    const res = await client.get(`/maintenance/procedures/q`, { params: { search_string, limit } })
    return res.data 
  }

  const useGetMaintenanceProcedureByQuery = (APIParams = {search_string : "", limit : 10}, useQueryOptions = {stateTime : 200000, placeholderData: (prev) => prev}) => {
    return useQuery({
        queryKey: ["getProcedureBySearchString", APIParams.search_string],
        queryFn: () => getMaintenanceProcedureByQuery_API({...APIParams}),
        ...useQueryOptions
    });
  }


  /**
  * @description  Returns a procedure by its tag. 
  * @returns {Object} - The tags matching the search string. 
  */
  async function getSProcedureByTag_API({procedure_tag}) {
    const res = await client.get(`/maintenance/procedures/${procedure_tag}`)
    return res.data 
  }

  const useGetMaintenanceProcedureByTag = (APIParams = { procedure_tag }, useQueryOptions = {stateTime : 200000}) => {
    return useQuery({
        queryKey: ["getProcedureByTag", APIParams.procedure_tag],
        queryFn: () => getSProcedureByTag_API({...APIParams}),
        ...useQueryOptions
    });
  }

  /**
  * @description Checks if theProcedure exists.
  * @returns {Boolean} - If theProcedure exists. 
  */
  async function checkMaintenanceProcedureExists_API({ procedure_tag }) {
    const res = await client.get(`/maintenance/procedures/${procedure_tag}/exists`)
    return res.data 
  }

  const useCheckMaintenanceProcedureExists = (APIParams = { procedure_tag }, useQueryOptions = {stateTime : 200000}) => {
    return useQuery({
        queryKey: ["checkMaintenanceProcedureExists", APIParams.procedure_tag],
        queryFn: () => checkMaintenanceProcedureExists_API({...APIParams}),
        ...useQueryOptions
    });
  }

  /** 
  * @description Returns all MaintenanceProcedures.
  * @returns  - The list of MaintenanceProcedures. 
  */

  async function getMaintenanceProcedures_API() {
    const res = await client.get(`/maintenance/procedures`);
    return res.data;
  }
  const useGetMaintenanceProcedures = (useQueryOptions = { staleTime: 30000 }) => {
    return useQuery({
        queryKey: ["getMaintenanceProcedures"],
        queryFn: () => getMaintenanceProcedures_API(),
        ...useQueryOptions
    });
  }


  /**
  * @description Returns the MaintenanceProcedure text .
  * @returns  - The MaintenanceProcedure texts.
  */

  async function getMaintenanceProcedureText_API({ procedure_tag }) {
    const res = await client.get(`/maintenance/procedures/${procedure_tag}/text`); 
    return res.data;
  }
  const useGetMaintenanceProcedureText = (APIParams={procedure_tag},useQueryOptions = { staleTime: 30000 }) => {
    return useQuery({
        queryKey: ["getMaintenanceProcedureText", APIParams.procedure_tag],
        queryFn: () => getMaintenanceProcedureText_API({...APIParams}),
        ...useQueryOptions
    });
  }

  /**
  * @description Returns the MaintenanceProcedure descriptions for all MaintenanceProcedures.
  * @returns  - The MaintenanceProcedure descriptions.        
  */
  async function getMaintenanceProcedureDescription_API({ procedure_tag }) {
    const res = await client.get(`/maintenance/procedures/${procedure_tag}/description`); 
    return res.data;
  }
  const useGetMaintenanceProcedureDescription = (APIParams= {procedure_tag}, useQueryOptions = { staleTime: 30000 }) => {
    return useQuery({
        queryKey: ["getMaintenanceProcedureDescription", APIParams.procedure_tag],
        queryFn: () => getMaintenanceProcedureDescription_API({...APIParams}),
        ...useQueryOptions
    });        
  }

  /**
  * @description Returns the MaintenanceProcedure priorities for all MaintenanceProcedures.
  * @returns  - The MaintenanceProcedure priorities.              
  */
  async function getMaintenanceProcedurePriority_API({ procedure_tag }) {
    const res = await client.get(`/maintenance/procedures/${procedure_tag}/priority`); 
    return res.data;
  }
  const useGetMaintenanceProcedurePriority = (APIParams= {procedure_tag},useQueryOptions = { staleTime: 30000 }) => {
    return useQuery({
        queryKey: ["getMaintenanceProcedurePriority", APIParams.procedure_tag],
        queryFn: () => getMaintenanceProcedurePriority_API({...APIParams}),
        ...useQueryOptions
    });        
  }

  return {
    useGetProcedurePermissions,
    useGetMaintenanceProcedureByQuery,
    useGetMaintenanceProcedureByTag,
    useCheckMaintenanceProcedureExists,
    useGetMaintenanceProcedures,
    useGetMaintenanceProcedureText,
    useGetMaintenanceProcedureDescription,
    useGetMaintenanceProcedurePriority
  }

}