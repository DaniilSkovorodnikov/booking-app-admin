import {AppShell, Container} from "@mantine/core";
import NavBar from "../components/NavBar.tsx";
import {Outlet} from "react-router-dom";

const Home = () => {
    return (
            <AppShell
                navbar={{width: {xl: 460, lg: 340, xs: 260}, breakpoint: 'xs'}}
                withBorder={false}
            >
                <AppShell.Navbar p={35}>
                    <NavBar/>
                </AppShell.Navbar>
                <AppShell.Main>
                    <Container fluid py={35} m={0}>
                        <Outlet/>
                    </Container>
                </AppShell.Main>
            </AppShell>
    );
};

export default Home;
