import {Button, Flex} from "@mantine/core";
import '../styles/navbar.scss'
import {navLinks} from "../utils/constants.ts";
import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <Flex
            className="navbar"
            direction='column'
            p="lg"
            gap='sm'
        >
            {navLinks.map((link, i) => <NavLink
                className={({isActive}) => isActive ? 'active' : ''}
                to={link.path}
                key={i}
            >{link.title}</NavLink>)}
            <Button
                classNames={{root: "navbar-exit", inner: "navbar-exit"}}
                variant="transparent"
                size="compact-md"
                display="flex"
                justify="start"
                fz={16}
                fw={400}
                p={0}
            >Выйти из учётной записи</Button>
        </Flex>
    );
};

export default NavBar;
