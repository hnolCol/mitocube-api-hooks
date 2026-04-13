import { useQuery } from "@tanstack/react-query";
import axios from "../axios-setup";
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
    return useQuery({
        queryKey: ["permissionsForInstruments"],
        queryFn: () => getInstrumentPermissions_API({...APIParams}),
        ...useQueryOptions
    });
}

