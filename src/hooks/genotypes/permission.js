import { useQuery } from "react-query";
import _ from "lodash";
import axios from "axios";
import config from "../../../config";

/**
 * Fetch genotype permissions for a given genotype tag
 * @param {Object} props
 * @param {String} props.genotype_tag - The genotype tag to fetch permissions for
 * @returns {Object} React Query object
 */

async function getGenotypePermissions_API({ genotype_tag }) {
  const res = await axios.get(`${config.baseURL}/genotypes/${genotype_tag}/permissions`);
  return res.data;
}

export const useGetGenotypePermissions = (APIParams = { genotype_tag: "" }, useQueryOptions = {}) => {
  return useQuery(["getGenotypePermissions", APIParams.genotype_tag],() => getGenotypePermissions_API({ ...APIParams }). useQueryOptions);
};
