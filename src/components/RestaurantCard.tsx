import React from 'react';
import {AllRestaurantsResponseItem} from "../models/api.ts";
import {ActionIcon, Badge, Container, Flex, Image, Title} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import '../styles/card.scss'
import collapseIcon from "../assets/img/collapse-icon.svg";

const RestaurantCard = ({restaurant}: {restaurant: AllRestaurantsResponseItem}) => {
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
                <Badge>1 точка</Badge>
            </Flex>
        </Container>
    );
};

export default RestaurantCard;
