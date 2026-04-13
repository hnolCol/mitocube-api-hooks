import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import axios from "../axios-setup";
import config from "../../../config";

/**
 * Fetch external service permissions for a given external service tag
 * @param {Object} props
 * @param {String} 
 */

async function getExternalServicePermissions_API({}) {
  const res = await axios.get(`${config.baseURL}/maintenance/permissions/externalservice`);
  return res.data;
}

export const useGetExternalServicePermissions = (APIParams = { }, useQueryOptions = {}) => {
  return useQuery({
    queryKey: ["getExternalServicePermissions"],
    queryFn: () => getExternalServicePermissions_API({ ...APIParams }),
    ...useQueryOptions
  });
};
