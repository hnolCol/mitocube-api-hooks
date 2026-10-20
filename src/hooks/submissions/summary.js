import { useQuery } from "@tanstack/react-query";

export function createSubmissionSummaryAPI(client) {
    /**
     * @description Returns a summary string of a submission. It is meant to be copied into
     * Excel for a quick way to provide the metadata information.
     * @param {Object} props
     * @param {String} props.tag - The tag of the submission.
     * @returns {String} The summary string of the submission given by its tag.
     */
    async function getSubmissionSummary_API({ tag }) {
        const res = await client.get(`/submissions/${tag}/summary`)
        return res.data
    }

    const useGetSubmissionSummaryString = (APIParams = { tag }, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["submission_summary_string", APIParams.tag],
            queryFn: () => getSubmissionSummary_API({ ...APIParams }),
            ...useQueryOptions
        })
    }

    return {
        useGetSubmissionSummaryString
    };
}
