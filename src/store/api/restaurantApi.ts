import {api} from "./api.ts";
import {AllRestaurantsResponseItem, UserResponse} from "../../models/api.ts";

export const restaurantApi = api.injectEndpoints({
    endpoints: build => ({
        allRestaurants: build.query<AllRestaurantsResponseItem[], void>({
            query: () => '/superadmin/restaurants'
        })
    }),
    overrideExisting: false
})

export const {useAllRestaurantsQuery} = restaurantApi
