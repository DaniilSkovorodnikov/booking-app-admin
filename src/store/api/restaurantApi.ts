import {api} from "./api.ts";
import {AddRestaurantResponse, AddUserResponse} from "../../models/api.ts";
import {AddRestaurantForm, AddUserForm} from "../../models/components.ts";
import {IBooking, IRestaurant} from "../../models/entities.tsx";

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
        }),
        getRestaurantTags: build.query<string[], void>({
            query: () => '/admin/tags/'
        }),
        postImages: build.mutation({
            query: (data) => ({
                body: data.files,
                url: `/admin/restaurants/${data.id}/images`,
                method: 'POST'
            })
        }),
        getImages: build.query<string[], number>({
            query: id => `/restaurants/${id}/images`
        }),
        postTablesCount: build.mutation<any, any>({
            query: body => ({
                body,
                url: '/admin/restaurants/tables',
                method: 'POST'
            }),
            invalidatesTags: ['RESTAURANT_INFO']
        }),
        deleteTable: build.mutation<any, number>({
            query: id => ({
                url: `/admin/restaurants/tables/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['RESTAURANT_INFO']
        }),
        getRequests: build.query<IBooking[], void>({
            query: () => '/admin/restaurants/bookings',
        })
    }),
    overrideExisting: false
})

export const {
    useAllRestaurantsQuery,
    useCreateRestaurantMutation,
    useGetRestaurantInfoQuery,
    useChangeRestaurantInfoMutation,
    useAddStaffMutation,
    useGetRestaurantTagsQuery,
    usePostImagesMutation,
    useGetImagesQuery,
    usePostTablesCountMutation,
    useDeleteTableMutation,
    useGetRequestsQuery,
} = restaurantApi
