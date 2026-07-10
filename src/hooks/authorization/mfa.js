import { useQuery, useMutation } from "@tanstack/react-query"



export function createAuthenticationMFAAPI(client) {

  /**
 * @description Verifies the token. Returns an object. TO DO: useMutation instead of useQuery.
 * @param {Object} props
 * @param {string} props.tokenString - The token string to be verified. 
 * @param {string} props.verificationCode - The code that was sent via email and is used by the user to validate the token. 
 * @returns {import("../../types/authentication").TokenResponse} - The response if the token was successfully verified. 
 */
async function setupMFA_API({verifiedMFAToken}) {
    //verify token with a one time password.
    console.log("verifiedMFAToken", verifiedMFAToken)
  const res = await client.post(`/auth/mfa/setup`,
    { token: verifiedMFAToken }, {
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${verifiedMFAToken}` }
    })
  return res.data
}

const useSetupMFA = (queryOptions = {}) => {
  return useMutation({
      mutationFn: setupMFA_API,
        ...queryOptions
  })
}
    
    
async function enableMFA_API({verifiedMFAToken, code}) {
    //verify token with a one time password.
  const res = await client.post(`/auth/mfa/enable`,
    { code },
    {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${verifiedMFAToken}` }
        })
    return res.data
    }

    const useEnableMFA = () => {
        return useMutation({
            mutationFn: enableMFA_API,
        })
        }
    
    

  

  return {
      useSetupMFA,
      useEnableMFA
  };
}   