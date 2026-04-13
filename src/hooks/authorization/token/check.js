import axios from "../../axios-setup"
import config from "../../../../config"
import { useQuery } from "@tanstack/react-query"


/**
 * @description Checks if the token is valid. 
 * @param {Object} props
 * @param {string} props.tokenString - The token string to check if it is still valid. 
 * @returns {import("../../types/authentication").TokenVaidResponse} - The resonse of the API if the token is valid. 
 */
async function checkToken_API({ tokenString }) {
  const res = await axios.get(`${config.baseURL}/auth/token/valid`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${tokenString}`
      }
    })
  
  return res.data
}

export const useGetTokenValid = (APIParams = { tokenString }, queryOptions = {}) => {
  return useQuery({
    queryKey: ["isTokenValid", APIParams.tokenString],
    queryFn: () => checkToken_API({...APIParams}),
    ...queryOptions
  })
}
