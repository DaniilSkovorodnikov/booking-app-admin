export interface IBooking {
    table: number;
    persons_count: number;
    datetime_from: string;
    datetime_to: string;
    user: IUser
}

export interface IUser {
    name: string;
    phone_number: string;
    email: string;
}

export interface IRestaurant {
    name: string,
    description: string | null,
    main_image: string | null,
    latitude: number,
    longitude: number,
    open_from: string,
    open_to: string,
    categories: string[],
    site: string,
    images: File[]
}

export interface IStatistics {
    reserved: number,
    free: number,
    pendingRequests: number
}
