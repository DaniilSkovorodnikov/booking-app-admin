import React from 'react';
import {ActionIcon, Badge, Collapse, Container, Flex, Image, Title} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import '../styles/card.scss'
import collapseIcon from "../assets/img/collapse-icon.svg";
import {IRestaurant} from "../models/entities.tsx";

const undefinedField = 'Не указано'
const RestaurantCard = ({restaurant}: {restaurant: IRestaurant}) => {
    const [collapsed, {toggle}] = useDisclosure()

    return (
        <Container className='card' fluid pl={72} pr={18} py={12}>
            <div className="card-collapse">
                <ActionIcon color="#F2F3F8" onClick={toggle} w={40} h={40}>
                    <Image src={collapseIcon} w={15} h={7.5}/>
                </ActionIcon>
            </div>
            <Flex align='start'>
                <Flex
                    flex='1 1 0'
                    direction='column'
                    justify="space-between"
                    gap='md'
                >
                    <Title order={3}>{restaurant.name}</Title>
                    <Badge>Пользователь:</Badge>
                </Flex>
                <Badge variant={restaurant.active ? 'success' : 'danger'}>
                    {restaurant.active ? 'Активен' : 'Не активен'}
                </Badge>
            </Flex>
            <Collapse in={collapsed}>
                <Container p={0} m={0} mt={16}>
                    <p>Номер телефона: {restaurant.phone_number || undefinedField}</p>
                    <p>Веб сайт: {restaurant.site || undefinedField}</p>
                    <p>Адрес: {restaurant.address || undefinedField}</p>
                </Container>
            </Collapse>
        </Container>
    );
};

export default RestaurantCard;
