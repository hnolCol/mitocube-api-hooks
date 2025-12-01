import { useQuery } from "react-query";
import _ from "lodash";
import axios from "axios";
import config from "../../../config";

/**
 * Fetch sparepart permissions for a given genotype tag
 * @param {Object} props
 * @param {String} props.genotype_tag - The sparepart tag to fetch permissions for
 */

async function getSparepartPermissions_API({ tag }) {
  const res = await axios.get(`${config.baseURL}/maintenance/sparepartpermissions/${tag}/permissions`);
  return res.data;
}

export const useGetSparepartPermissions = (APIParams = { tag }, useQueryOptions = {}) => {
  return useQuery(["getSparepartPermissions", APIParams.tag],() => getSparepartPermissions_API({ ...APIParams }), useQueryOptions);
};
