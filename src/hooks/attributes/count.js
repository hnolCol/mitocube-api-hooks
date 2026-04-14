// import { useQuery } from "@tanstack/react-query"
// import axios from "axios"
// import config from "../../../config"

// /**
//  * @description Returns the attribute count in the database.
//  * @returns {Number} The total count in the database.
//  */
// async function getAttributeCount_API() {
//     const res = await axios.get(`${config.baseURL}/attributes/count`)
//     return res.data 
// }

// export const useGetAttributeCount = (useQueryOptions = { staleTime: 300000 }) => {
//     return useQuery({
//         queryKey: ["getAttributeCount"],
//         queryFn: getAttributeCount_API,
//         ...useQueryOptions
//     })
// }