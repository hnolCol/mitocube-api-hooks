import { useQuery } from "react-query";
import _ from "lodash";
import axios from "axios";
import config from "../../../config";

/**
 * Fetch procedure permissions for a given genotype tag
 * @param {Object} props
 * @param {String} 
 */

async function getProcedurePermissions_API({ }) {
  const res = await axios.get(`${config.baseURL}/maintenance/maintenancepermissions/procedures`);
  return res.data;
}

export const useGetProcedurePermissions = (APIParams = { }, useQueryOptions = {}) => {
  return useQuery(["getProcedurePermissions"],() => getProcedurePermissions_API({ ...APIParams }), useQueryOptions);
};
