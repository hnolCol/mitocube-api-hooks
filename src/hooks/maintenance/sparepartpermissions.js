import { useQuery } from "react-query";
import _ from "lodash";
import axios from "axios";
import config from "../../../config";

/**
 * Fetch sparepart permissions for a given sparepart tag
 * @param {Object} props
 * @param {String} 
 */

async function getSparepartPermissions_API({}) {
  const res = await axios.get(`${config.baseURL}/maintenance/maintenancepermissions/spareparts`);
  return res.data;
}

export const useGetSparepartPermissions = (APIParams = { }, useQueryOptions = {}) => {
  return useQuery(["getSparepartPermissions"],() => getSparepartPermissions_API({ ...APIParams }), useQueryOptions);
};
