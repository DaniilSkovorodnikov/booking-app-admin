import {AuthProps} from "../models/props.ts";
import {Box, Button, Center, Container, Flex, Input} from "@mantine/core";
import "../styles/auth.scss"
import {Link} from "react-router-dom";
import {hasLength, useForm} from "@mantine/form";
import {validateLogin} from "../utils/helpers.ts";
import {UserRegistrationForm} from "../models/components.ts";
import InputError from "../components/InputError.tsx";

const Auth = ({isRegistration}: AuthProps) => {
    const form = useForm<UserRegistrationForm | Omit<UserRegistrationForm, 'passwordConfirm'>>(!isRegistration ? {
        initialValues: {
            login: '',
            password: '',
        }
    } : {
        initialValues: {
            login: '',
            password: '',
            passwordConfirm: ''
        },
        validate: {
            login: (value) => validateLogin(value),
            password: hasLength({min: 6}, "Минимальная длина 6 символов"),
            passwordConfirm: (value, values) => values.password !== value ?
                "Пароли не совпадают" :
                null
        }
    })

    const handleSubmit = (value: UserRegistrationForm | Omit<UserRegistrationForm, 'passwordConfirm'>) => {
        console.log(value)
    }

    return (
        <Container className="auth" fluid>
            <Center>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Flex
                        className="auth-container"
                        pt={{lg: 200, base: 100}}
                        pb={{lg: 300, base: 170}}
                        direction='column'
                        justify="space-between"
                    >
                        <Box w={{xl: 500, lg: 400}}>

                            <Flex
                                direction='column'
                                gap='md'
                            >
                                <Flex direction="column">
                                    <Input placeholder="Логин" {...form.getInputProps('login')}/>
                                    {form.errors?.login && <InputError errorMessage={form.errors?.login as string}/>}
                                </Flex>
                                <Flex direction="column">
                                    <Input type="password" placeholder="Пароль" {...form.getInputProps('password')}/>
                                    {form.errors?.password && <InputError errorMessage={form.errors?.password as string}/>}
                                </Flex>
                                {isRegistration && <Flex direction="column">
                                    <Input type="password" placeholder="Пароль ещё раз" {...form.getInputProps('passwordConfirm')}/>
                                    {form.errors?.passwordConfirm && <InputError errorMessage={form.errors?.passwordConfirm as string}/>}
                                </Flex>}
                                <Center>
                                    <Link
                                        className="active"
                                        to={isRegistration ? "/login" : "/registration"}
                                        onClick={form.reset}
                                    >
                                        {isRegistration ?
                                            'Войти в учетную запись' :
                                            'Зарегистрировать учетную запись'}
                                    </Link>
                                </Center>
                            </Flex>
                        </Box>
                        <Center>
                            <Box w={{xl: 380, lg: 280}} mt={50}>
                                <Button type="submit" fullWidth>{isRegistration ? 'Зарегистрировать ресторан' : 'Войти'}</Button>
                            </Box>
                        </Center>
                    </Flex>
                </form>
            </Center>
        </Container>
    );
};

export default Auth;
