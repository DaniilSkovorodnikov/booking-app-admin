import React, {useEffect, useMemo} from 'react';
import {useUserInfoQuery} from "../store/api/userApi.ts";
import {Outlet, useNavigate} from "react-router-dom";
import {Roles} from "../utils/enums.ts";
import {Loader} from "@mantine/core";

const RoleRequired = ({roles}: {roles: Roles[]}) => {
    const navigate = useNavigate()
    const {data, isLoading} = useUserInfoQuery()
    const accessDenied = useMemo(
        () => !isLoading && !roles.includes(data.role),
        [data, isLoading, roles]
    )

    useEffect(() => {
        if(accessDenied && data.role === Roles.Admin){
            navigate('/')
        }
        if(accessDenied && data.role === Roles.SuperAdmin){
            navigate('/add-user')
        }
    }, [data, accessDenied, navigate])

    if(isLoading){
        return <Loader size='xl'/>
    }
    if(accessDenied){
        return <div>Denied access page</div>
    }
    return (
        <Outlet/>
    );
};

export default RoleRequired;
