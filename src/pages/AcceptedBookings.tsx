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

const mockBookings: IBooking[] = []
