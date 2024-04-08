import {Roles} from "../utils/enums.ts";

export type LoginResponse = {
    email: string,
    id: number,
    token: string
}

export type UserResponse = {
    email: string,
    role: Roles,
    id: number
}

export type AddRestaurantResponse = {
    name: string,
    admin_password: string,
    id: number,
}

export type AddUserResponse = {
    id: number,
    email: string,
    role: string,
    password: string,
}

export type DefaultError = {
    status: number,
    data: {
        detail: string
    }
}
