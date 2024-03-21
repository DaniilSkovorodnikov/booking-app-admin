import {Button, Container, Flex, Input, Title} from "@mantine/core";
import {hasLength, useForm} from "@mantine/form";
import {UserRegistrationForm} from "../models/components.ts";
import InputError from "../components/InputError.tsx";
import {validateLogin} from "../utils/helpers.ts";

const AddUser = () => {
    const form = useForm<UserRegistrationForm>({
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

    const handleSubmit = (value: UserRegistrationForm) => {
        console.log(value)
    }

    return (
        <Container fluid>
            <Title order={1}>Добавить пользователя</Title>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Flex direction="column" gap="md" mt={24}>
                    <Flex direction="column">
                        <Input placeholder="Логин" {...form.getInputProps('login')}/>
                        {form.errors?.login && <InputError errorMessage={form.errors.login as string}/>}
                    </Flex>
                    <Flex direction="column">
                        <Input placeholder="Пароль" {...form.getInputProps('password')}/>
                        {form.errors?.password && <InputError errorMessage={form.errors.password as string}/>}
                    </Flex>
                    <Flex direction="column">
                        <Input placeholder="Пароль ещё раз" {...form.getInputProps('passwordConfirm')}/>
                        {form.errors?.passwordRepeat && <InputError errorMessage={form.errors.passwordRepeat as string}/>}
                    </Flex>
                    <Button type="submit">Подтвердить</Button>
                </Flex>
            </form>
        </Container>
    );
};

export default AddUser;
