import {IBooking} from "./entities.tsx";

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
