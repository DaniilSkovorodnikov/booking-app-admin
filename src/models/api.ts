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

export type AllRestaurantsResponseItem = {
    id: number,
    name: string,
    account_id: number
}

export type DefaultError = {
    status: number,
    data: {
        detail: string
    }
}
