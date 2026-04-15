// import { useQuery } from "@tanstack/react-query"
// import _ from "lodash"
// import axios from "axios"
// import config from "../../../config"; 


// /**
//  * Count how many samples are using the genotyple (number of relationships)
//  * @param {Object} props
//  * @param {String} props.genotype_tag 
//  * @returns {Object} - The number of samples 
//  */


// async function getGenotypeSampleCount_API({ genotype_tag }) {
//   const res = await axios.get(`${config.baseURL}/genotypes/${genotype_tag}/relationships/count`);
//     return res.data
// }


// export const useGetGenotypeSampleCount = (APIParams = { genotype_tag: "" },useQueryOptions = {}) => {
//   return useQuery({
//     queryKey: ["getGenotypeSampleCount", APIParams.genotype_tag],
//     queryFn: () => getGenotypeSampleCount_API(APIParams),
//     ...useQueryOptions
//   });
// };


