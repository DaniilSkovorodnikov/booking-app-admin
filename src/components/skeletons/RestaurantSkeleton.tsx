import React from 'react';
import {Container, Flex, Skeleton} from "@mantine/core";

const RestaurantSkeleton = () => {
    return (
        <Container fluid>
            <Flex direction="column" gap="md">
                <Skeleton h={70}/>
                <Skeleton h={150}/>
                <Skeleton h={70}/>
                <Skeleton h={70}/>
                <Flex gap="md">
                    <Skeleton h={100} w={100}/>
                    <Skeleton h={100} w={100}/>
                    <Skeleton h={100} w={100}/>
                    <Skeleton h={100} w={100}/>
                </Flex>
                <Skeleton h={70}/>
            </Flex>
        </Container>
    );
};

export default RestaurantSkeleton;
