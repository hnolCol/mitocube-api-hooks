import axios from "axios"
import config from "../../../../config"
import { useQuery } from "react-query"


/**
 * @description Checks if the token is valid. 
 * @param {Object} props
 * @param {string} props.tokenString - The token string to check if it is still valid. 
 * @returns {import("../../types/authentication").TokenVaidResponse} - The resonse of the API if the token is valid. 
 */
async function checkToken_API({ }) {
  const res = await axios.get(`${config.baseURL}/auth/token/valid`,
    {
      headers: {
        "Content-Type": "application/json"
      }
    })
  
  return res.data
}

export const useGetTokenValid = (APIParams = {}, queryOptions = {}) => {
  return useQuery(["isTokenValid"], () => checkToken_API({...APIParams}), queryOptions)
}


