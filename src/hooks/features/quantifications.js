
import axios from "axios"
import { useQuery } from "react-query"
import config from "../../../config"


/**
 * @description Returns all the abundance data available for a given feature across samples.
 * @param {Object} props
 * @param {String} props.tag - The feature tag (e.g. Uniprot ID)
 * @returns {Object[]} - value, sample_index, submission_tag 
 */
async function getSampleAbundance_API({ tag }) {
    const res = await axios.get(`${config.baseURL}/features/${tag}/abundance/samples`, {params : {  }})
    return res.data
}
export function useGetSampleAbundance(APIParams = {tag}, useQueryOptions = {}) {
    return useQuery(["quant_feature_per_sample",
        APIParams.tag],
        () => getSampleAbundance_API({ ...APIParams }), useQueryOptions)
}

