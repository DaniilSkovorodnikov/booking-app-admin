export interface IBooking {
    table: ITable;
    table_id: number;
    people_count: number;
    time_from: string;
    time_to: string;
    user: IUser;
    comment?: string;
    id: number;
    status: 'await_confirm' | 'confirmed' | 'rejected' | 'completed'
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
    active: boolean,
    tables: ITable[]
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

export interface ITable{
    people_count: number,
    tags: string[],
    id: number
}
