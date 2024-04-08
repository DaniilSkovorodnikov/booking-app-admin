import {api} from "./api.ts";
import {AddRestaurantResponse, AddUserResponse} from "../../models/api.ts";
import {AddRestaurantForm, AddUserForm} from "../../models/components.ts";
import {IRestaurant} from "../../models/entities.tsx";

export const restaurantApi = api.injectEndpoints({
    endpoints: build => ({
        allRestaurants: build.query<IRestaurant[], void>({
            query: () => '/superadmin/restaurants'
        }),
        createRestaurant: build.mutation<AddRestaurantResponse ,AddRestaurantForm>({
            query: (newRestaurant) => ({
                url: '/superadmin/restaurants',
                body: newRestaurant,
                method: 'POST'
            })
        }),
        getRestaurantInfo: build.query<IRestaurant, void>({
            query: () => '/admin/restaurants',
            providesTags: ["RESTAURANT_INFO"],
            transformResponse: (value: IRestaurant) => {
                Object.keys(value).map(key => {
                    if(value[key] === null){
                        value[key] = undefined
                    }
                })
                return value
            }
        }),
        changeRestaurantInfo: build.mutation<IRestaurant, Partial<IRestaurant>>({
            query: body => ({
                body,
                url: '/admin/restaurants',
                method: 'PATCH',
            }),
            invalidatesTags: ["RESTAURANT_INFO"]
        }),
        addStaff: build.mutation<AddUserResponse, AddUserForm>({
            query: body => ({
                body,
                url: '/admin/staff',
                method: 'POST'
            })
        })
    }),
    overrideExisting: false
})

export const {
    useAllRestaurantsQuery,
    useCreateRestaurantMutation,
    useGetRestaurantInfoQuery,
    useChangeRestaurantInfoMutation,
    useAddStaffMutation
} = restaurantApi
