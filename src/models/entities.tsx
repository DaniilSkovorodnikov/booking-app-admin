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
    latitude: number,
    longitude: number,
    open_from: string,
    open_to: string,
    tags: string[],
    site: string,
    images: File[],
    address: string,
    phone_number: string,
    id: number,
    active: boolean
}

export interface ISuggestedAddress{
    address: {formatted_address: string, },
    distance: {value: number, text: string},
    tags: string[],
    title: {text: string}
}

export interface IGeocodeResult{
    response: {
        GeoObjectCollection: {
            featureMember: Array<{
                GeoObject: {
                    Point: {pos: string},
                    description: string,
                    name: string,
                    uri: string
                }
            }>,
            metaDataProperty: {
                GeocoderResponseMetaData: {
                    found: string,
                }
            }
        }
    }
}

export interface IStatistics {
    reserved: number,
    free: number,
    pendingRequests: number
}
