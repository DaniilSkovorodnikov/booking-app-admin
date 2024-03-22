import {IBooking} from "./entities.tsx";
import {InputProps} from "@mantine/core";
import {HTMLInputTypeAttribute, ReactNode} from "react";

export interface AuthProps {
    isRegistration?: boolean
}

export type BookingCardProps = {
    booking: IBooking,
    isRequest?: boolean
}

export type InputErrorProps = {
    errorMessage: string
}

export interface InputOverrideProps extends InputProps{
    placeholder?: string,
    type?: HTMLInputTypeAttribute,
    value?: any
}
