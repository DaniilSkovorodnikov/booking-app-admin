import {Button, Container, Flex, Title} from "@mantine/core";
import {isEmail, isNotEmpty, useForm} from "@mantine/form";
import {AddRestaurantForm} from "../models/components.ts";
import InputError from "../components/InputError.tsx";
import Input from "../components/InputOverride.tsx";
import {useUserInfoQuery} from "../store/api/userApi.ts";
import {Roles} from "../utils/enums.ts";
import {useAddStaffMutation, useCreateRestaurantMutation} from "../store/api/restaurantApi.ts";
import {useEffect} from "react";
import {notifications} from "@mantine/notifications";
import {DefaultError} from "../models/api.ts";

const AddUser = () => {
    const {data} = useUserInfoQuery()
    const [createRestaurant, {isSuccess: isSuccessCreateRestaurant, error: errorCreate}] = useCreateRestaurantMutation()
    const [addStaff, {isSuccess: isSuccessAddStaff, error: errorAdd}] = useAddStaffMutation()

    const form = useForm<AddRestaurantForm>({
        initialValues: {
            name: '',
            admin_email: ''
        },
        validate: {
            name: isNotEmpty('Поле обязательно к заполнению'),
            admin_email: isEmail('Некорректный формат')
        }
    })

    const handleSubmit = async (value: AddRestaurantForm) => {
        if (data.role === Roles.SuperAdmin) {
            await createRestaurant(value)
        } else {
            await addStaff({
                name: value.name,
                email: value.admin_email
            })
        }
    }

    useEffect(() => {
        if (isSuccessCreateRestaurant || isSuccessAddStaff) {
            notifications.show({
                title: 'Успешно',
                message: isSuccessAddStaff ? 'Сотрудник успешно добавлен!' : 'Ресторан успешно создан!',
                variant: 'success',
            })
            form.reset()
        }
    }, [isSuccessCreateRestaurant, isSuccessAddStaff]);

    return (
        <Container fluid>
            <Title order={1}>Добавить пользователя</Title>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Flex direction="column" gap="md" mt={24}>
                    <Flex direction="column">
                        <Input placeholder={data.role === Roles.Admin ? "Имя" : "Название ресторана"}
                               required {...form.getInputProps('name')}/>
                        {form.errors?.name && <InputError errorMessage={form.errors.name as string}/>}
                    </Flex>
                    <Flex direction="column">
                        <Input placeholder="Электронная почта для получения пароля"
                               required {...form.getInputProps('admin_email')}/>
                        {form.errors?.admin_email && <InputError errorMessage={form.errors.admin_email as string}/>}
                        {((errorAdd as DefaultError)?.status === 409 || (errorCreate as DefaultError)?.status === 409) &&
                            <InputError errorMessage={'Такой e-mail уже зарегистрирован'}/>}
                    </Flex>
                    <Button type="submit">Добавить ресторан</Button>
                </Flex>
            </form>
        </Container>
    );
};

export default AddUser;
