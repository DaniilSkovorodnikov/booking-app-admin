import React from 'react';
import {Container, Flex, Skeleton, Title} from "@mantine/core";
import {useAllRestaurantsQuery} from "../store/api/restaurantApi.ts";
import RestaurantCard from "../components/RestaurantCard.tsx";

const Restaurants = () => {
    const {data, isLoading} = useAllRestaurantsQuery(undefined)

    if(isLoading){
        return <Flex direction='column' gap='md'>
            <Skeleton h={100}/>
            <Skeleton h={100}/>
            <Skeleton h={100}/>
        </Flex>
    }
    return (
        <Container>
            <Title order={1}>Все рестораны</Title>
            <Flex direction="column" gap='md' mt={16}>
                {data.map(restaurant => <RestaurantCard key={restaurant.id} restaurant={restaurant}/>)}
            </Flex>
        </Container>
    );
};

export default Restaurants;
