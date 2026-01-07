import { useQuery } from "react-query";
import axios from "axios";
import config from "../../../config";
/**
 * Fetch submission permissions from the API. For example, if user can create or download a submission or comment on submissions. 
 * @param {Object} props - The parameters for the API request.
 * @returns {import("../permissions/types").PermissionResponse} - The permissions for the submission.
 */
async function getInstrumentPermissions_API({}) {
    const res = await axios.get(`${config.baseURL}/instruments/permissions`)
    return res.data 
}
export const useGetInstrumentPermissions = (APIParams = {}, useQueryOptions = {staleTime : 30000}) => {
    return useQuery(["permissionsForInstruments"], () => getInstrumentPermissions_API({...APIParams}), useQueryOptions)
}

