import {AppShell, Container} from "@mantine/core";
import NavBar from "../components/NavBar.tsx";
import {Outlet, useNavigate} from "react-router-dom";
import {useUserInfoQuery} from "../store/api/userApi.ts";
import NavbarSkeleton from "../components/NavbarSkeleton.tsx";
import OutletSkeleton from "../components/OutletSkeleton.tsx";
import {useEffect} from "react";
import {notifications} from "@mantine/notifications";
import {DefaultError} from "../models/api.ts";
import {api} from "../store/api/api.ts";
import {useDispatch} from "react-redux";

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {data, isSuccess, error} = useUserInfoQuery(undefined, {
        skip: !localStorage.getItem('token')
    })

    useEffect(() => {
        if (error) {
            let messageText = "Упс! Произошла неизвестная ошибка."
            if ((error as DefaultError).status === 401) {
                localStorage.removeItem('token')
                dispatch(api.util.resetApiState())
                navigate('/login')
                messageText = 'Время сессии истекло. Авторизуйтесь заново!'
            }
            notifications.show({
                title: "Ошибка",
                message: messageText,
                variant: 'error',
            })
        }
    }, [error]);

    return (
        <AppShell
            navbar={{width: {xl: 460, lg: 340, xs: 260}, breakpoint: 'xs'}}
            withBorder={false}
        >
            <AppShell.Navbar p={35}>
                {isSuccess ? <NavBar role={data.role}/> : <NavbarSkeleton/>}
            </AppShell.Navbar>
            <AppShell.Main>
                <Container fluid py={35} m={0}>
                    {isSuccess ? <Outlet/> : <OutletSkeleton/>}
                </Container>
            </AppShell.Main>
        </AppShell>
    );
};

export default Home;
