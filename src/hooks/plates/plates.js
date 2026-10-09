import { useQuery, useMutation } from "@tanstack/react-query"

export function createPlatesAPI(client) {

    /**
     * @description Returns all plates.
     */
    async function getPlates_API() {
        const res = await client.get(`/plates`)
        return res.data
    }
    const useGetPlates = (useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["plates"],
            queryFn: () => getPlates_API(),
            ...useQueryOptions
        })
    }

    /**
     * @description Suggests the next free plate name for a format.
     * @param {Object} props
     * @param {Number} props.rows - Number of rows
     * @param {Number} props.columns - Number of columns
     */
    async function getNextPlateName_API({ rows, columns }) {
        const res = await client.get(`/plates/next-name`, { params: { rows, columns } })
        return res.data.name
    }
    const useGetNextPlateName = (APIParams = {}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["plateNextName", APIParams.rows, APIParams.columns],
            queryFn: () => getNextPlateName_API({ ...APIParams }),
            enabled: !!APIParams.rows && !!APIParams.columns,
            ...useQueryOptions
        })
    }

    /**
     * @description Creates a new plate.
     * @param {Object} props
     * @param {Object} props.plate - {name, rows, columns, plate_type, vendor, location, description}
     */
    async function postPlate_API({ plate }) {
        const res = await client.post(`/plates`, plate)
        return res.data
    }
    const usePostPlate = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postPlate_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

    /**
     * @description Deletes a plate.
     * @param {Object} props
     * @param {String} props.tag - The plate tag
     */
    async function deletePlate_API({ tag }) {
        const res = await client.delete(`/plates/${tag}`)
        return res.data
    }
    const useDeletePlate = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => deletePlate_API({ ...APIParams }),
            ...useMutationOptions
        })
    }

        /**
     * @description Returns the occupied wells of a plate.
     * @param {Object} props
     * @param {String} props.tag - The plate tag
     */
        async function getPlateOccupied_API({ tag }) {
            const res = await client.get(`/plates/${tag}/occupied`)
            return res.data
        }
        const useGetPlateOccupied = (APIParams = {}, useQueryOptions = {}) => {
            return useQuery({
                queryKey: ["plateOccupied", APIParams.tag],
                queryFn: () => getPlateOccupied_API({ ...APIParams }),
                enabled: !!APIParams.tag,
                ...useQueryOptions
            })
        }

        /**
     * @description Returns the selectable formats, cold storages, plate types and vendors.
     */
        async function getPlateOptions_API() {
            const res = await client.get(`/plates/options`)
            return res.data
        }
        const useGetPlateOptions = (useQueryOptions = {}) => {
            return useQuery({
                queryKey: ["plateOptions"],
                queryFn: () => getPlateOptions_API(),
                ...useQueryOptions
            })
        }

    return {
        useGetPlates,
        useGetNextPlateName,
        usePostPlate,
        useDeletePlate,
        useGetPlateOccupied,
        useGetPlateOptions
    };

}