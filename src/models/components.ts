import {ChangeEventHandler} from "react";

export type NavLink = {
    title: string,
    path: string,
    show?: (role: string) => boolean
}

export type UserAuthForm = {
    email: string,
    password: string,
}

export type AddRestaurantForm = {
    name: string,
    admin_email: string
}

export type AddUserForm = {
    name: string,
    email: string
}

export type AddBookingForm = {
    name: string,
    persons_count: string,
    dateTime: string,
    tableType: string
}

export type ImageInputProps = {
    onChange: ChangeEventHandler<HTMLInputElement>
}
