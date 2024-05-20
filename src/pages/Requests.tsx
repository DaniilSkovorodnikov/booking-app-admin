import {Container, Flex, Loader, Title} from "@mantine/core";
import {IBooking} from "../models/entities.tsx";
import BookingCard from "../components/BookingCard.tsx";
import {useGetRequestsQuery} from "../store/api/restaurantApi.ts";

const Requests = () => {
    const {data: bookings, isLoading} = useGetRequestsQuery();

    if (isLoading){
        return <Loader size='xl'/>
    }
    return (
        <Container fluid>
            <Title order={1}>Заявки на бронирование</Title>
            <Flex direction="column" gap="sm" mt="xl">
                {bookings.map((booking, i) => <BookingCard key={i} booking={booking} isRequest/>)}
            </Flex>
        </Container>
    );
};

export default Requests;
