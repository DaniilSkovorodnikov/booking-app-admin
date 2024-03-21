import {Container, Flex, Title} from "@mantine/core";
import {IBooking} from "../models/entities.tsx";
import BookingCard from "../components/BookingCard.tsx";

const Requests = () => {
    const bookings = mockBookings;

    return (
        <Container fluid>
            <Title order={1}>Заявки на бронирование</Title>
            <Flex direction="column" gap="sm" mt="xl">
                {bookings.map(booking => <BookingCard booking={booking} isRequest/>)}
            </Flex>
        </Container>
    );
};

export default Requests;

const mockBookings: IBooking[] = [
    {
        datetime_to: "2024-03-20T13:37:38.439Z",
        datetime_from: "2024-03-20T15:37:38.439Z",
        persons_count: 2,
        table: 13,
        user: {
            name: "Сковородников Даниил",
            phone_number: "+7 909 606-82-33",
            email: ""
        }
    },
    {
        datetime_to: "2024-03-20T13:37:38.439Z",
        datetime_from: "2024-03-20T15:37:38.439Z",
        persons_count: 2,
        table: 13,
        user: {
            name: "Сковородников Даниил",
            phone_number: "+7 909 606-82-33",
            email: ""
        }
    },
    {
        datetime_to: "2024-03-20T13:37:38.439Z",
        datetime_from: "2024-03-20T15:37:38.439Z",
        persons_count: 2,
        table: 13,
        user: {
            name: "Сковородников Даниил",
            phone_number: "+7 909 606-82-33",
            email: ""
        }
    }
]
