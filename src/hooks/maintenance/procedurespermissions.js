import { useQuery } from "react-query";
import _ from "lodash";
import axios from "axios";
import config from "../../../config";

/**
 * Fetch procedure permissions for a given genotype tag
 * @param {Object} props
 * @param {String} props.genotype_tag - The procedure tag to fetch permissions for
 */

async function getProcedurePermissions_API({ procedure_tag }) {
  const res = await axios.get(`${config.baseURL}/maintenance/procedurepermissions/${procedure_tag}/permissions`);
  return res.data;
}

export const useGetProcedurePermissions = (APIParams = { procedure_tag }, useQueryOptions = {}) => {
  return useQuery(["getProcedurePermissions", APIParams.procedure_tag],() => getProcedurePermissions_API({ ...APIParams }), useQueryOptions);
};
