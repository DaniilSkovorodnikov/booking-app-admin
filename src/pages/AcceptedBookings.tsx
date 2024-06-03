import {Container, Flex, Loader, Title} from "@mantine/core";
import {IBooking} from "../models/entities.tsx";
import BookingCard from "../components/BookingCard.tsx";
import {useGetBookingsQuery} from "../store/api/restaurantApi.ts";

const AcceptedBookings = () => {
    const {data: bookings, isLoading} = useGetBookingsQuery();

    if (isLoading){
        return <Loader size='xl'/>
    }
    return (
        <Container fluid>
            <Title order={1}>Подтверждённые бронирования</Title>
            <Flex direction="column" gap="sm" mt="xl">
                {bookings.filter(booking => booking.status === 'confirmed').map((booking) => <BookingCard key={booking.id} booking={booking}/>)}
            </Flex>
        </Container>
    );
};

export default AcceptedBookings;

