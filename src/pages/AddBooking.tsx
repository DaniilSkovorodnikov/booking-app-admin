import {Button, Container, Flex, Input, Title} from "@mantine/core";
import "../styles/booking.scss"

const AddBooking = () => {
    return (
        <Container className="addBooking" fluid>
            <Title order={1}>Добавить бронирование</Title>
            <form>
                <Flex
                    direction="column"
                    gap="md"
                    mt="xl"
                >
                    <Input placeholder="Имя гостя"/>
                    <Input placeholder="Количество персон"/>
                    <Input placeholder="Дата и время"/>
                    <Input placeholder="Тип столика"/>
                    <Button className="addBooking-send" mt={80}>Подтвердить</Button>
                </Flex>
            </form>
        </Container>
    );
};

export default AddBooking;
