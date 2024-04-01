import {api} from "./api.ts";
import {UserResponse} from "../../models/api.ts";

export const userApi = api.injectEndpoints({
    endpoints: build => ({
        userInfo: build.query<UserResponse, void>({
            query: () => '/client/user'
        })
    }),
    overrideExisting: false
})

export const {useUserInfoQuery} = userApi
