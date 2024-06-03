import {BookingCardProps} from "../models/props.ts";
import {useDisclosure} from "@mantine/hooks";
import {ActionIcon, Badge, Button, Collapse, Container, Flex, Image} from "@mantine/core";
import collapseIcon from "../assets/img/collapse-icon.svg"
import "../styles/card.scss"
import {getBookingPeriod, getPersonsCountString} from "../utils/helpers.ts";
import {useChangeBookingStatusMutation} from "../store/api/restaurantApi.ts";
import {useEffect} from "react";
import {notifications} from "@mantine/notifications";

const BookingCard = ({booking, isRequest}: BookingCardProps) => {
    const [changeStatus, {data}] = useChangeBookingStatusMutation()
    const [collapsed, { toggle }] = useDisclosure(false);

    const changeStatusClick = (status: 'confirmed' | 'rejected' | 'completed') => {
        changeStatus({status, id: booking.id})
    }

    useEffect(() => {
        if(data?.id){
            notifications.show({
                message: `Бронь ${data.status === 'confirmed' ? 'подтверждена' : data.status === 'completed' ? 'завершена' : 'отклонена'}!`
            })
        }
    }, [data]);

    return (
        <Container fluid className="card" pl={66} pr={18} py={12}>
            <div className="card-collapse">
                <ActionIcon color="#F2F3F8" onClick={toggle} w={40} h={40}>
                    <Image src={collapseIcon} w={15} h={7.5}/>
                </ActionIcon>
            </div>
            <Flex align="start">
                <Flex
                    flex="1 1 0"
                    direction="column"
                    justify="space-between"
                >
                    <p>{getBookingPeriod(booking.time_from, booking.time_to)}</p>
                    <p>Стол №{booking.table_id + 1}</p>
                </Flex>
                <Badge>{getPersonsCountString(booking.people_count)}</Badge>
            </Flex>
            <Collapse in={collapsed}>
                <Container p={0} m={0} mt={16}>
                    <p>Имя: {booking.user.name}</p>
                    <p>Номер телефона: {booking.user.phone_number || 'Не указано'}</p>
                    <Flex gap="xl" mt={16}>
                        <Button size="sm" onClick={() => changeStatusClick(isRequest ? 'confirmed' : 'completed')}>{isRequest ? 'Подтвердить бронирование' : 'Завершить посещение'}</Button>
                        <Button variant="gray" size="sm" onClick={() => changeStatusClick('rejected')}>Отменить бронирование</Button>
                    </Flex>
                </Container>
            </Collapse>
        </Container>
    );
};

export default BookingCard;
