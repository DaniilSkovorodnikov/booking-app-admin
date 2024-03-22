import {ChangeEventHandler} from "react";

export type NavLink = {
    title: string,
    path: string
}

export type UserRegistrationForm = {
    login: string,
    password: string,
    passwordConfirm: string
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
