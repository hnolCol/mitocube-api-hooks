import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import axios from "axios";
import config from "../../../config";

/**
 * Fetch genotype permissions for a given genotype tag
 * @param {Object} props
 * @param {String} props.genotype_tag - The genotype tag to fetch permissions for
 * @returns {Object} React Query object
 */

async function getGenotypePermissions_API({ }) {
  const res = await axios.get(`${config.baseURL}/genotypes/permissions`);
  return res.data;
}

export const useGetGenotypePermissions = (APIParams = {  }, useQueryOptions = {}) => {
  return useQuery({
    queryKey: ["getGenotypePermissions"],
    queryFn: () => getGenotypePermissions_API({ ...APIParams }),
    ...useQueryOptions
  });
};
