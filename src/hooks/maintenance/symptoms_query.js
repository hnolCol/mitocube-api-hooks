import { useQuery } from "@tanstack/react-query";
import _ from "lodash";


export function createQuerySymptomsAPI(client) {

  /**
   * @description Finds a symtom by its search string.
   * @returns {String[]} - The tags matching the search string. 
   */
  async function getSymptomByQuery_API({search_string, limit}) {
    const res = await client.get(`/maintenance/symptoms/q`, { params: { search_string, limit } })
    return res.data 
  }

  const useGetSymptomByQuery = (APIParams = {search_string : "", limit : 10}, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getSymptomBySearchString", APIParams.search_string, APIParams.limit],
        queryFn: () => getSymptomByQuery_API({...APIParams}),
        ...useQueryOptions
    })
  }

  /**
  * @description  Returns a symptom by its tag. 
  * @returns {String[]} - The tags matching the search string. 
  */
  async function getSymptomByTag_API({tag}) {
    const res = await client.get(`/maintenance/symptoms/${tag}`)
    return res.data 
  }

  const useGetSymptomByTag = (APIParams = { tag: "" }, useQueryOptions = {staleTime : 200000}) => {
    return useQuery({
        queryKey: ["getSymptomByTag", APIParams.tag],
        queryFn: () => getSymptomByTag_API({...APIParams}),
        ...useQueryOptions
    })
  }

  /**
  * @description Checks if the symptom exists.
  * @returns {Boolean} - If the symptom exists. 
  */
  async function checkSymptomExists_API({ tag }) {
    const res = await client.get(`/maintenance/symptoms/${tag}/exists`)
    return res.data 
  }

  const useCheckSymptomExists = (APIParams = { tag }, useQueryOptions = {staleTime : 200000}) => {
    return useQuery({
        queryKey: ["checkSymptomExists", APIParams.tag],
        queryFn: () => checkSymptomExists_API({...APIParams}),
        ...useQueryOptions
    })
  }

  /** 
  * @description Returns all symptoms.
  * @returns  - The list of symptoms. 
  */

  async function getSymptoms_API() {
    const res = await client.get(`/maintenance/symptoms`);
    return res.data;
  }
  const useGetSymptoms = (useQueryOptions = { staleTime: 30000 }) => {
    return useQuery({
        queryKey: ["getSymptoms"],
        queryFn: () => getSymptoms_API(),
        ...useQueryOptions
    });
  }


  /**
  * @description Returns the symptom text .
  * @returns  - The symptom texts.
  */

  async function getSymptomText_API({ tag }) {
    const res = await client.get(`/maintenance/symptoms/${tag}/text`); 
    return res.data;
  }
  const useGetSymptomText = (APIParams={tag},useQueryOptions = { staleTime: 30000 }) => {
    return useQuery({
        queryKey: ["getSymptomText", APIParams.tag],
        queryFn: () => getSymptomText_API({...APIParams}),
        ...useQueryOptions
    });
  }

  /**
  * @description Returns the symptom descriptions for all symptoms.
  * @returns  - The symptom descriptions.        
  */
  async function getSymptomDescription_API({ tag }) {
    const res = await client.get(`/maintenance/symptoms/${tag}/description`); 
    return res.data;
  }
  const useGetSymptomDescription = (APIParams= {tag}, useQueryOptions = { staleTime: 30000 }) => {
    return useQuery({
        queryKey: ["getSymptomDescription", APIParams.tag],
        queryFn: () => getSymptomDescription_API({...APIParams}),
        ...useQueryOptions
    });        
  }

  /**
  * @description Returns the symptom priorities for all symptoms.
  * @returns  - The symptom priorities.              
  */
  async function getSymptomPriority_API({ tag }) {
    const res = await client.get(`/maintenance/symptoms/${tag}/priority`); 
    return res.data;
  }
  const useGetSymptomPriority = (APIParams= {tag},useQueryOptions = { staleTime: 30000 }) => {
    return useQuery({
        queryKey: ["getSymptomPriority", APIParams.tag],
        queryFn: () => getSymptomPriority_API({...APIParams}),
        ...useQueryOptions
    });        
  }


  /**
   * Fetch symptoms permissions for a given symptom tag
   * @param {Object} props
   * @param {String} 
   */

  async function getSymptomsPermissions_API({  }) {
    const res = await client.get(`/maintenance/permissions/symptoms`);
    return res.data;
  }

  const useGetSymptomsPermissions = (APIParams = {  }, useQueryOptions = {}) => {
    return useQuery({
      queryKey: ["getSymptomsPermissions"],
      queryFn: () => getSymptomsPermissions_API({ ...APIParams }),
      ...useQueryOptions
    });
  };

  return {
    useGetSymptomByQuery,
    useGetSymptomByTag,
    useCheckSymptomExists,
    useGetSymptoms,
    useGetSymptomText,
    useGetSymptomDescription,
    useGetSymptomPriority,
    useGetSymptomsPermissions
  }

}