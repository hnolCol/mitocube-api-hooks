


// import { useMutation, useQuery } from "@tanstack/react-query"
// import axios from "axios"
// import config from "../../../config"


// /**
//  * @description Returns the attribute by group. The are attribute groups for example: mandatory, sample, qc, dataset etc.
//  * @param {Object} props
//  * @param {String} props.tag The attribute group.  
//  * @param {Number} props.min_state The minimal submission state that is required for the attributes.
//  * @returns {String[]} Returns the attribute tags that are part of the attribute group
//  */
// async function getAttributeByGroup_API({ tag, min_state }) {
//     const res = await axios.get(`${config.baseURL}/attributes/groups/${tag}`, {params : {min_state}})
//     return res.data 
// }

// export const useGetAttributeByGroup = (APIParams = { tag, min_state }, useQueryOptions = {staleTime : 30000}) => {
//     return useQuery({
//         queryKey: ["getAttributeGroup", APIParams.tag, APIParams.min_state],
//         queryFn: () => getAttributeByGroup_API({ ...APIParams }),
//         ...useQueryOptions
//     });
// }


// /**
//  * @description Returns the attribute by group. The are attribute groups for example: mandatory, sample, qc, dataset etc.
//  * @param {Object} props
//  * @param {String} props.tag The attribute group.  
//  * @param {Number} props.min_state The minimal submission state that is required for the attributes.
//  * @returns {String[]} Returns the attribute tags that are part of the attribute group
//  */
// async function getAttributeGroups_API({ limit }) {
//     const res = await axios.get(`${config.baseURL}/attributes/groups`, {params : {limit}})
//     return res.data 
// }

// export const useGetAttributeGroups = (APIParams = { limit }, useQueryOptions = { staleTime: 30000 }) => {
//     return useQuery({
//         queryKey: ["getAttributeGroups", APIParams.limit],
//         queryFn: () => getAttributeGroups_API({ ...APIParams }),
//         ...useQueryOptions
//     });
// }