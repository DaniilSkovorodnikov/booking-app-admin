import React from 'react';
import {Flex, Skeleton} from "@mantine/core";
import '../styles/navbar.scss'

const NavbarSkeleton = () => {
    return (
        <Flex
            className="navbar"
            direction='column'
            p="lg"
            gap='sm'
        >
            <Skeleton height={32} radius="lg" />
            <Skeleton height={32} mt={6} radius="lg" />
            <Skeleton height={32} mt={6} radius="lg" />
        </Flex>
    );
};

export default NavbarSkeleton;
