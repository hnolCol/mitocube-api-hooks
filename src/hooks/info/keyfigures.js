import { useQuery } from "@tanstack/react-query";

export function createKeyFiguresAPI(client) {
    /**
     * @description Fetches key figures from the API. Endpoint: GET '/api/info/keyfigures'
     * @returns {Object[]} The key figures.
     */
    async function getKeyFigures_API() {
        const res = await client.get('/info/keyfigures')
        return res.data
    }

    const useGetKeyFigures = (APIParams = {}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getKeyFigures"],
            queryFn: () => getKeyFigures_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    return {
        useGetKeyFigures
    };
}
