import {FormEvent, useState} from 'react';
import {IRestaurant} from "../models/entities.tsx";
import {Button, Container, Flex, Group, Input, Textarea, Title} from "@mantine/core";
import {useForm} from "@mantine/form";
import {TimeInput} from "@mantine/dates";

const RestaurantInfo = () => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [restaurant, setRestaurant] = useState(mockRestaurant)

    const form = useForm({
        initialValues: {...restaurant},
    })
    const {categories} = form.values

    const handleSubmit = (value: IRestaurant) => {
        if(!isEditMode){
            return
        }
        console.log(value)
        setIsEditMode(false)
    }

    return (
        <Container className="restaurant" fluid>
            <Title order={1}>Информация о ресторане</Title>
            <form>
                <Flex direction="column" gap="md" mt="xl">
                    <Input disabled={!isEditMode} placeholder="Название" {...form.getInputProps('name')}/>
                    <Textarea disabled={!isEditMode} placeholder="Описание" {...form.getInputProps('description')}/>
                    {isEditMode ?
                        <Flex gap="md">
                            <TimeInput label="Начало" {...form.getInputProps("open_from")}/>
                            <TimeInput label="Конец" {...form.getInputProps("open_to")}/>
                        </Flex> :
                        <Input disabled value={`${restaurant.open_from} - ${restaurant.open_to}`}/>
                    }
                    <Input disabled={!isEditMode} placeholder="Вебсайт" {...form.getInputProps("site")}/>
                    <Container fluid p={0} m={0}>
                        <Title order={3} mb={8}>Характеристики</Title>
                        <Group>
                            {categories.map((category, i) => <Button
                                key={i}
                                size="lg"
                                style={{cursor: isEditMode ? "pointer" : "default"}}
                                onClick={() => form.setFieldValue(
                                    'categories',
                                    prevValue => prevValue.filter(value => value !== category)
                                )}
                            >
                                {category}
                            </Button>)}
                            {isEditMode && restaurantCategories
                                .filter(category => !categories.includes(category))
                                .map((category, i) => <Button
                                    key={i}
                                    variant="gray"
                                    size="lg"
                                    onClick={() => form.setFieldValue(
                                        'categories',
                                        prevValue => [...prevValue, category]
                                    )}
                                >
                                    {category}
                                </Button>)
                            }
                        </Group>
                    </Container>
                </Flex>
                <Button
                    className="restaurant-send"
                    ml={0}
                    mt={40}
                    onClick={() => isEditMode ?
                        handleSubmit(form.values) :
                        setIsEditMode(prevState => !prevState)
                    }
                >
                    {isEditMode ? "Сохранить изменения" : "Редактировать"}
                </Button>
            </form>
        </Container>
    );
};

export default RestaurantInfo;

const mockRestaurant: IRestaurant = {
    name: 'Гастроли',
    description: 'Дважды лучший ресторан Урала по версии самой престижной ресторанной премии WHERE TO EAT 2020 и 2021.',
    longitude: 127.901,
    latitude: 127.901,
    open_from: "09:30",
    open_to: "00:00",
    main_image: null,
    categories: ["Бургеры", "Выпечка", "Италия", "Завтрак"],
    site: 'http://localhost:5173/info'
}

const restaurantCategories = ["Бургеры", "Выпечка", "Италия", "Завтрак", "Кавказ", "Ланч", "Морепродукты", "Мясо"]
