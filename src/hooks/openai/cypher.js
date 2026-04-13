// States and states changes of a submission 
import { useQuery } from "@tanstack/react-query"
import config from "../../../config"
import axios from "../axios-setup"

/**
 * @description Get cypher query results from the OpenAI service.
 * @returns {import("./types").OpenAIResponse} Cypher query response that interprets the data.
 */
export async function getCypherQuery_API({ prompt, session_id }) {
    const res = await axios.get(`${config.baseURL}/ai/openai/cypher`, {params: { prompt, session_id }})
    return res.data
}

export const useGetCypherQuery = (APIParams = { prompt, session_id }, useQueryOptions = { staleTime: 5000 }) => {
    return useQuery({
        queryKey: ["getCypherQuery", APIParams.prompt, APIParams.session_id],
        queryFn: () => getCypherQuery_API({ ...APIParams }),
        ...useQueryOptions
    })
}





/**
 * @description Get publication summary for a protein from PubMed using OpenAI.
 * @param {Object} props
 * @param {String} props.tag - The protein tag (e.g. Uniprot ID)
 * @param {Number} props.limit - The maximum number of publications to consider (default: 5)
 * @param {String} props.sort_by - The sorting criteria, either "relevance" or "pub_date"
 * @returns {import("./types").OpenAIResponse} Cypher query response that interprets the data.
 */
export async function getPubmedPublicationSummary_API({ tag, limit = 5, sort_by = "relevance" }) {
    const res = await axios.get(`${config.baseURL}/ai/openai/literature/feature/proteins/${tag}`, {params: { tag, limit, sort_by }})
    return res.data
}

export const useGetPublicationSummaryForProtein = (APIParams = { tag, limit, sort_by }, useQueryOptions = { staleTime: 5000 }) => {
    return useQuery({
        queryKey: ["getPublicationSummaryForProtein", APIParams.tag, APIParams.limit, APIParams.sort_by],
        queryFn: () => getPubmedPublicationSummary_API({ ...APIParams }),
        ...useQueryOptions
    })
}