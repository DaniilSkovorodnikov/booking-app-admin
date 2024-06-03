import {Container, Flex, Loader, Title} from "@mantine/core";
import BookingCard from "../components/BookingCard.tsx";
import {useGetBookingsQuery} from "../store/api/restaurantApi.ts";

const Requests = () => {
    const {data: bookings, isLoading} = useGetBookingsQuery();

    if (isLoading){
        return <Loader size='xl'/>
    }
    return (
        <Container fluid>
            <Title order={1}>Заявки на бронирование</Title>
            <Flex direction="column" gap="sm" mt="xl">
                {bookings.filter(booking => booking.status === 'await_confirm').map((booking) => <BookingCard key={booking.id} booking={booking} isRequest/>)}
            </Flex>
        </Container>
    );
};

export default Requests;
