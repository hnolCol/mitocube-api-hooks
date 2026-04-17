import { useMutation } from "@tanstack/react-query"

export function createEditUserAPI(client) {

    async function getUserAttributes_API({}) {
        const res = await client.get('/attributes/user')
        return res.data 
    }

    const useGetUserAttributes = (APIParams = {}, useQueryOptions = {}) => {
        return useQuery({
            queryKey: ["getUserAttributes"],
            queryFn: () => getUserAttributes_API({...APIParams}),
            ...useQueryOptions
        })
    }


    async function patchUser_API({ tokenString, userProps }) {
        const res = await client.patch('/users/user',
        userProps,
            {
                headers : {
                    "Authorization": `Bearer ${tokenString}`,
                    'Content-Type': 'application/json'
                }
            })
        return res.data
    }

    const usePatchUser = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => patchUser_API({...APIParams}),
            ...useMutationOptions
        })
    }

    async function postChangePasswordUser_API({ updated_pw }) {
        const res = await client.post('/users/pw', updated_pw)
        return res.data
    }

    const usePostPasswordChange = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postChangePasswordUser_API({...APIParams}),
            ...useMutationOptions
        })
    }

    return {
        useGetUserAttributes,
        usePatchUser,
        usePostPasswordChange
    }

}