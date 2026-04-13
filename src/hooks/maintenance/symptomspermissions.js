import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import axios from "axios";
import config from "../../../config";

/**
 * Fetch symptoms permissions for a given symptom tag
 * @param {Object} props
 * @param {String} 
 */

async function getSymptomsPermissions_API({  }) {
  const res = await axios.get(`${config.baseURL}/maintenance/permissions/symptoms`);
  return res.data;
}

export const useGetSymptomsPermissions = (APIParams = {  }, useQueryOptions = {}) => {
  return useQuery({
    queryKey: ["getSymptomsPermissions"],
    queryFn: () => getSymptomsPermissions_API({ ...APIParams }),
    ...useQueryOptions
  });
};
