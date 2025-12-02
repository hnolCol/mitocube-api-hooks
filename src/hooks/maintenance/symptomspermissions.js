import { useQuery } from "react-query";
import _ from "lodash";
import axios from "axios";
import config from "../../../config";

/**
 * Fetch symptoms permissions for a given symptom tag
 * @param {Object} props
 * @param {String} props.genotype_tag - The symptom tag to fetch permissions for
 */

async function getSymptomsPermissions_API({ tag }) {
  const res = await axios.get(`${config.baseURL}/maintenance/symptomspermissions/${tag}/permissions`);
  return res.data;
}

export const useGetSymptomsPermissions = (APIParams = { tag }, useQueryOptions = {}) => {
  return useQuery(["getSymptomsPermissions", APIParams.tag],() => getSymptomsPermissions_API({ ...APIParams }), useQueryOptions);
};
