import {Container, Flex, Title} from "@mantine/core";
import {IStatistics} from "../models/entities.tsx";

const Statistics = () => {
    const statistics = mockStatistics

    return (
        <Container fluid>
            <Title order={1}>Статистика ресторана</Title>
            <Flex direction="column" gap="md" mt={50}>
                <p>Занятых столов сейчас: <b>{statistics.reserved}</b></p>
                <p>Свободных столов сейчас: <b>{statistics.free}</b></p>
                <p>Нерассмотренных заявок на бронирование: <b>{statistics.pendingRequests}</b></p>
            </Flex>
        </Container>
    );
};

export default Statistics;

const mockStatistics: IStatistics = {
    reserved: 5,
    free: 15,
    pendingRequests: 10
}
