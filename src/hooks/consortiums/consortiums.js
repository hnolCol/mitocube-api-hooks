import { useQuery, useMutation } from "@tanstack/react-query"


export function createConsortiumsAPI(client) {

    /**
     * @description The list of consortium tags.
     * @param {Object} props
     * @param {Number} props.limit
     * @param {String} props.search_string
     * @returns {String[]} Returns the list of consortium tags.
     */
    async function getConsortiums_API({ limit, search_string }) {
    const res = await client.get('/consortiums/q', { params: { limit, search_string } })
    return res.data
    }

    const useGetConsortiums = (APIParams = {}, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getConsortiums", APIParams.limit, APIParams.search_string],
        queryFn: () => getConsortiums_API({ ...APIParams }),
        ...useQueryOptions
    })
    }


    /**
     * @description The list of consortium tags the current user can share into.
     * @returns {String[]} Returns the list of consortium tags of the user.
     */
    async function getUserConsortiums_API() {
    const res = await client.get('/consortiums/user', {})
    return res.data
    }

    const useGetUserConsortiums = (APIParams = {}, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getUserConsortiums"],
        queryFn: () => getUserConsortiums_API({ ...APIParams }),
        ...useQueryOptions
    })
    }


    /**
     * @description Returns the consortium item.
     * @param {Object} props
     * @param {String} props.tag The consortium tag to return
     * @returns {import("./types").Consortium} The consortium item.
     */
    async function getConsortiumByTag_API({ tag }) {
    const res = await client.get(`/consortiums/${tag}`, {})
    return res.data
    }

    const useGetConsortiumByTag = (APIParams = { tag }, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getConsortiumByTag", APIParams.tag],
        queryFn: () => getConsortiumByTag_API({ ...APIParams }),
        ...useQueryOptions
    })
    }


    /**
     * @description The list of submission tags shared with the consortium.
     * @param {Object} props
     * @param {String} props.tag Consortium tag
     * @returns {String[]} Returns the list of submission tags shared with the consortium.
     */
    async function getConsortiumSubmissions_API({ tag }) {
    const res = await client.get(`/consortiums/${tag}/submissions`, {})
    return res.data
    }

    const useGetConsortiumSubmissions = (APIParams = { tag }, useQueryOptions = {}) => {
    return useQuery({
        queryKey: ["getConsortiumSubmissions", APIParams.tag],
        queryFn: () => getConsortiumSubmissions_API({ ...APIParams }),
        ...useQueryOptions
    })
    }


    /**
     * @description Shares a submission with a consortium.
     * @param {Object} props
     * @param {String} props.consortium_tag
     * @param {String} props.submission_tag
     */
    async function shareSubmissionWithConsortium_API({ consortium_tag, submission_tag }) {
    const res = await client.post(`/consortiums/${consortium_tag}/submissions/${submission_tag}`, {})
    return res.data
    }

    const useShareSubmissionWithConsortium = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams = { consortium_tag, submission_tag }) => shareSubmissionWithConsortium_API({ ...APIParams }),
        ...useMutationOptions
    })
    }


    /**
     * @description Removes a submission share from a consortium.
     * @param {Object} props
     * @param {String} props.consortium_tag
     * @param {String} props.submission_tag
     */
    async function unshareSubmissionFromConsortium_API({ consortium_tag, submission_tag }) {
    const res = await client.delete(`/consortiums/${consortium_tag}/submissions/${submission_tag}`)
    return res.data
    }

    const useUnshareSubmissionFromConsortium = (useMutationOptions = {}) => {
    return useMutation({
        mutationFn: (APIParams = { consortium_tag, submission_tag }) => unshareSubmissionFromConsortium_API({ ...APIParams }),
        ...useMutationOptions
    })
    }


  return {
    useGetConsortiums,
    useGetUserConsortiums,
    useGetConsortiumByTag,
    useGetConsortiumSubmissions,
    useShareSubmissionWithConsortium,
    useUnshareSubmissionFromConsortium
  };
}
