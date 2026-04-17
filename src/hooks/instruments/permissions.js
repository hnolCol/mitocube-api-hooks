import { useQuery } from "@tanstack/react-query";

export function createGetInstrumentPermissionsAPI(client) {

    /**
     * Fetch submission permissions from the API. For example, if user can create or download a submission or comment on submissions. 
     * @param {Object} props - The parameters for the API request.
     * @returns {import("../permissions/types").PermissionResponse} - The permissions for the submission.
     */
    async function getInstrumentPermissions_API({}) {
        const res = await client.get(`/instruments/permissions`)
        return res.data 
    }
    const useGetInstrumentPermissions = (APIParams = {}, useQueryOptions = {staleTime : 30000}) => {
        return useQuery({
            queryKey: ["permissionsForInstruments"],
            queryFn: () => getInstrumentPermissions_API({...APIParams}),
            ...useQueryOptions
        });
    }

    return {
        useGetInstrumentPermissions
    }

}