import axios from "axios"
import config from "../../../../config"
import { useQuery } from "@tanstack/react-query"

/**
 * @description Verifies the token. Returns an object. TO DO: useMutation instead of useQuery.
 * @param {Object} props
 * @param {string} props.tokenString - The token string to be verified. 
 * @param {string} props.verificationCode - The code that was sent via email and is used by the user to validate the token. 
 * @returns {import("../../types/authentication").TokenResponse} - The response if the token was successfully verified. 
 */
async function verifyToken({tokenString, verificationCode}) {
  //verify token with a one time password.
  const res = await axios.post(`${config.baseURL}/auth/token/verify`,
    { verification_code: verificationCode },
    {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${tokenString}`
    }
  })
  return res.data
}

export const useVerifyToken = (APIParams = {}, queryOptions = {}) => {
  return useQuery({
    queryKey: ["verifyToken", APIParams.tokenString, APIParams.verificationCode],
    queryFn: () => verifyToken({...APIParams}),
    ...queryOptions
  })
}
