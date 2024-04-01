import React from 'react';
import {Flex, Skeleton} from "@mantine/core";

const OutletSkeleton = () => {
    return (
        <Flex direction="column">
            <Skeleton h={56} width="50%" animate/>
            <Skeleton h={400} mt={32} animate/>
        </Flex>
    );
};

export default OutletSkeleton;
