import {Button, Container, Flex, Title} from "@mantine/core";
import {hasLength, isEmail, isNotEmpty, useForm} from "@mantine/form";
import {AddRestaurantForm, UserAuthForm} from "../models/components.ts";
import InputError from "../components/InputError.tsx";
import {validateLogin} from "../utils/helpers.ts";
import Input from "../components/InputOverride.tsx";
import {useUserInfoQuery} from "../store/api/userApi.ts";
import {Roles} from "../utils/enums.ts";

const AddUser = () => {
    const {data} = useUserInfoQuery()

    const form = useForm<AddRestaurantForm>({
        initialValues: {
            name: '',
            email: ''
        },
        validate: {
            name: isNotEmpty('Поле обязательно к заполнению'),
            email: isEmail('Некорректный формат')
        }
    })

    const handleSubmit = (value: AddRestaurantForm) => {
        console.log(value)
    }

    return (
        <Container fluid>
            <Title order={1}>Добавить пользователя</Title>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Flex direction="column" gap="md" mt={24}>
                    <Flex direction="column">
                        <Input placeholder={data.role === Roles.Admin ? "Имя" : "Название ресторана"} required {...form.getInputProps('name')}/>
                        {form.errors?.name && <InputError errorMessage={form.errors.name as string}/>}
                    </Flex>
                    <Flex direction="column">
                        <Input placeholder="Электронная почта для получения пароля" required {...form.getInputProps('email')}/>
                        {form.errors?.email && <InputError errorMessage={form.errors.email as string}/>}
                    </Flex>
                    <Button type="submit">Добавить ресторан</Button>
                </Flex>
            </form>
        </Container>
    );
};

export default AddUser;
