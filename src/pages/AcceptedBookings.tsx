import {Container, Flex, Title} from "@mantine/core";
import {IBooking} from "../models/entities.tsx";
import BookingCard from "../components/BookingCard.tsx";

const AcceptedBookings = () => {
    const bookings = mockBookings;

    return (
        <Container fluid>
            <Title order={1}>Подтверждённые бронирования</Title>
            <Flex direction="column" gap="sm" mt="xl">
                {bookings.map((booking, i) => <BookingCard key={i} booking={booking}/>)}
            </Flex>
        </Container>
    );
};

export default AcceptedBookings;

const mockBookings: IBooking[] = [
    {
        time_to: "2024-03-20T13:37:38.439Z",
        time_from: "2024-03-20T15:37:38.439Z",
        people_count: 2,
        table: 13,
        user: {
            name: "Сковородников Даниил",
            phone_number: "+7 909 606-82-33",
            email: ""
        }
    },
    {
        time_to: "2024-03-20T13:37:38.439Z",
        time_from: "2024-03-20T15:37:38.439Z",
        people_count: 2,
        table: 13,
        user: {
            name: "Сковородников Даниил",
            phone_number: "+7 909 606-82-33",
            email: ""
        }
    },
    {
        time_to: "2024-03-20T13:37:38.439Z",
        time_from: "2024-03-20T15:37:38.439Z",
        people_count: 2,
        table: 13,
        user: {
            name: "Сковородников Даниил",
            phone_number: "+7 909 606-82-33",
            email: ""
        }
    }
]
