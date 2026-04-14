import { useQuery } from "@tanstack/react-query"



export function createAuthenticationTokenAPI(client) {

  /**
 * @description Verifies the token. Returns an object. TO DO: useMutation instead of useQuery.
 * @param {Object} props
 * @param {string} props.tokenString - The token string to be verified. 
 * @param {string} props.verificationCode - The code that was sent via email and is used by the user to validate the token. 
 * @returns {import("../../types/authentication").TokenResponse} - The response if the token was successfully verified. 
 */
async function verifyToken({tokenString, verificationCode}) {
  //verify token with a one time password.
  const res = await client.post(`/auth/token/verify`,
    { verification_code: verificationCode, token: tokenString }, {
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenString}` }
    })
  return res.data
}

const useVerifyToken = (APIParams = {}, queryOptions = {}) => {
  return useQuery({
    queryKey: ["verifyToken", APIParams.tokenString, APIParams.verificationCode],
    queryFn: () => verifyToken({...APIParams}),
    ...queryOptions
  })
}

/**
 * @description Checks if the token is valid. The token is taken from the local storage within the client
 * @param {Object} props
 * @returns {import("../../types/authentication").TokenVaidResponse} - The resonse of the API if the token is valid. 
 */
async function checkToken_API({  }) {
  const res = await client.get(`/auth/token/valid`)  
  return res.data
}

const useGetTokenValid = (APIParams = { tokenString }, queryOptions = {}) => {
  return useQuery({
    queryKey: ["isTokenValid", APIParams.tokenString],
    queryFn: () => checkToken_API({ ...APIParams }),
    enabled : APIParams.tokenString !== undefined,
    ...queryOptions
  })
}
  
  

  return {
    useVerifyToken,
    useGetTokenValid
  };
}