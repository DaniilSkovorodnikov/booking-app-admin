import {Button, Flex} from "@mantine/core";
import '../styles/navbar.scss'
import {navLinks} from "../utils/constants.ts";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {api} from "../store/api/api.ts";

const NavBar = ({role} : {role: string}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const onExit = () => {
        dispatch(api.util.resetApiState())
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <Flex
            className="navbar"
            direction='column'
            p="lg"
            gap='sm'
        >
            {navLinks
                .filter(link => link.show(role))
                .map((link, i) => <NavLink
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
                onClick={onExit}
            >Выйти из учётной записи</Button>
        </Flex>
    );
};

export default NavBar;
