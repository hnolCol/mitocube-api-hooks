import { useMutation, useQuery } from "@tanstack/react-query"

export function createModifyExternalResourcesAPI(client) {

    async function postExternalResource_API({ title, link, doi, type, author, publication_date, is_external, condition_applications }) {
        const res = await client.post(`/external-resources`, { title, link, doi, type, author, publication_date, is_external, condition_applications })
        return res.data
    }
    const usePostExternalResource = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postExternalResource_API({ ...APIParams }),
            ...useMutationOptions
        });
    }

    async function getExternalResourceConditionApplications_API({ tag }) {
        const res = await client.get(`/external-resources/${tag}/condition_applications`)
        return res.data
    }
    const useGetExternalResourceConditionApplications = (APIParams = { tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getExternalResourceConditionApplications", APIParams.tag],
            queryFn: () => getExternalResourceConditionApplications_API({ ...APIParams }),
            ...useQueryOptions
        });
    }

    async function postExternalResourceCrosslinks_API({ tag, crosslinks }) {
        const res = await client.post(`/external-resources/${tag}/crosslinks`, crosslinks)
        return res.data
    }
    const usePostExternalResourceCrosslinks = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postExternalResourceCrosslinks_API({ ...APIParams }),
            ...useMutationOptions
        });
    }

    return {
        usePostExternalResource,
        useGetExternalResourceConditionApplications,
        usePostExternalResourceCrosslinks
    }
}