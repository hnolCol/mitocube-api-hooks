import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import axios from "axios";
import config from "../../../config";

/**
 * Fetch annotation permissions for a given annotation tag
 * @param {Object} props
 * @param {String}
 */

async function getAnnotationPermissions_API({}) {
  const res = await axios.get(`${config.baseURL}/annotations/{tag}/permissions`);
  return res.data;
}

export const useGetAnnotationPermissions = (APIParams = { }, useQueryOptions = {}) => {
  return useQuery({
    queryKey: ["getAnnotationPermissions"],
    queryFn: () => getAnnotationPermissions_API({ ...APIParams }),
    ...useQueryOptions
  });
};
