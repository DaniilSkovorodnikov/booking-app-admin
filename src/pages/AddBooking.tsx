import {Button, Container, Flex, Title} from "@mantine/core";
import "../styles/booking.scss"
import Input from "../components/InputOverride.tsx";
import {DateTimePicker} from "@mantine/dates";
import 'dayjs/locale/ru.js';
import React from "react";
import {isInRange, isNotEmpty, useForm} from "@mantine/form";
import {AddBookingForm} from "../models/components.ts";
import InputError from "../components/InputError.tsx";

const AddBooking = () => {
    const form = useForm<AddBookingForm>({
        initialValues: {
            name: '',
            persons_count: '',
            dateTime: '',
            tableType: ''
        },
        validate: {
            name: isNotEmpty('Поле обязательно к заполнению'),
            dateTime: isNotEmpty('Поле обязательно к заполнению'),
            persons_count: isInRange({min: 1, max: 12}, 'Введите число от 1 до 12')
        }
    })

    const handleSubmit = (value: AddBookingForm) => {
        console.log(value)
    }

    return (
        <Container className="addBooking" fluid>
            <Title order={1}>Добавить бронирование</Title>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Flex
                    direction="column"
                    gap="md"
                    mt="xl"
                >
                    <Flex direction="column">
                        <Input placeholder="Имя гостя" required {...form.getInputProps('name')}/>
                        {form.errors?.name && <InputError errorMessage={form.errors.name as string}/>}
                    </Flex>
                    <Flex direction="column">
                        <Input
                            type="number"
                            placeholder="Количество персон"
                            {...form.getInputProps('persons_count')}
                        />
                        {form.errors?.persons_count && <InputError errorMessage={form.errors.persons_count as string}/>}
                    </Flex>

                    <Flex direction="column">
                        <DateTimePicker
                            level='month'
                            locale='ru'
                            placeholder="Дата и время"
                            rightSection={<span
                                style={{fontSize: 37, color: "crimson"}}
                            >&#9913;</span>}
                            valueFormat="DD.MM.YYYY - hh:mm"
                            {...form.getInputProps('dateTime')}
                        />
                    </Flex>

                    <Input placeholder="Тип столика" {...form.getInputProps('tableType')}/>
                    <Button type='submit' className="addBooking-send" mt={80}>Подтвердить</Button>
                </Flex>
            </form>
        </Container>
    );
};

export default AddBooking;
