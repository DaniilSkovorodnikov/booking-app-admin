import {IBooking} from "./entities.tsx";
import {InputProps} from "@mantine/core";
import {
    ChangeEventHandler,
    FocusEventHandler,
    HTMLInputTypeAttribute,
    MouseEventHandler,
    ReactNode,
    RefObject
} from "react";

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
    value?: any,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    onClick?: MouseEventHandler<HTMLInputElement>,
    onFocus?: FocusEventHandler<HTMLInputElement>
}

export interface SuggestedInputProps {
    defaultValue?: string,
    disabled?: boolean,
    onChange: (address: string, coords: {latitude: number, longitude: number}) => void,
    onInputChange?: (address: string) => void
}
