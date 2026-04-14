
import {useQuery} from "@tanstack/react-query"
export function createAuthenticationAPI(client) {

    
    async function loginUser(userInput) {
    //user login attempt, returns a token. TO DO: Should useMutation be used? 
    var bodyFromData = new FormData()
    bodyFromData.append('username' , userInput.username)
    bodyFromData.append('password',  userInput.password)
    const res = await client.post('/auth/token',
        bodyFromData,
        {
        headers: { 'Content-Type': 'multipart/form-data' }
        })
    return res.data
    }

    const useLoginUser = (userInput = {}, queryOptions = {}) => {
    return useQuery({
        queryKey: ["loginUser", userInput],
        queryFn: () => loginUser(userInput),
        ...queryOptions
    })
    }

  return {
    useLoginUser
  };
}
