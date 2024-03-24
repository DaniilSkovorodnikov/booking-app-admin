import {useState} from 'react';
import {IRestaurant} from "../models/entities.tsx";
import {Button, Container, Flex, Group, Textarea, Title} from "@mantine/core";
import {isNotEmpty, useForm} from "@mantine/form";
import {TimeInput} from "@mantine/dates";
import Input from "../components/InputOverride.tsx";
import InputError from "../components/InputError.tsx";
import ImageInput from "../components/ImageInput.tsx";
import '../styles/restaurant.scss'
import SuggestAddress from "../components/SuggestAddress.tsx";

const RestaurantInfo = () => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [restaurant, setRestaurant] = useState(mockRestaurant)
    const [images, setImages] = useState<string[]>([])

    const form = useForm({
        initialValues: {...restaurant},
        validate: {
            name: isNotEmpty('Поле обязательно к заполнению')
        }
    })
    const {categories} = form.values


    const handleSubmit = (value: IRestaurant) => {
        if(!isEditMode || form.validate().hasErrors){
            return
        }
        console.log(value)
        setIsEditMode(false)
    }

    const handleAddImage = (event) => {
        if(event.target?.files?.length){
            form.setFieldValue('images', [...form.values.images, event.target.files[0]])
            const fileReader = new FileReader()
            fileReader.onloadend = (event) => setImages(prevState => [...prevState, event.target.result as string])
            fileReader.readAsDataURL(event.target.files[0])}
    }

    return (
        <Container className="restaurant" fluid>
            <Title order={1}>Информация о ресторане</Title>
            <form>
                <Flex direction="column" gap="md" mt="xl">
                    <Flex direction="column">
                        <Input
                            disabled={!isEditMode}
                            placeholder="Название"
                            required
                            {...form.getInputProps('name')}
                        />
                        {form.errors?.name && <InputError errorMessage={form.errors.name as string}/>}
                    </Flex>
                    <Textarea disabled={!isEditMode} placeholder="Описание" {...form.getInputProps('description')}/>
                    {isEditMode ?
                        <Flex gap="md">
                            <TimeInput size="lg" label="Начало" {...form.getInputProps("open_from")}/>
                            <TimeInput size="lg" label="Конец" {...form.getInputProps("open_to")}/>
                        </Flex> :
                        <Input disabled value={`${restaurant.open_from} - ${restaurant.open_to}`}/>
                    }
                    <SuggestAddress disabled={!isEditMode} onChange={({latitude, longitude}) => {
                        form.setFieldValue('latitude', latitude);
                        form.setFieldValue('longitude', longitude);
                    }}/>
                    <Input disabled={!isEditMode} placeholder="Вебсайт" {...form.getInputProps("site")}/>
                    <Container fluid p={0} m={0}>
                        <Title order={3} mb={8}>Фото ресторана</Title>
                        <Flex gap="md" align="center">
                            {images.map((src, i) => <img className='restaurant-photo' key={i} src={src} style={{width: 120, height: 120}}/>)}
                            {isEditMode && images.length < 5 && <ImageInput onChange={handleAddImage}/>}
                        </Flex>
                    </Container>
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
    site: 'http://localhost:5173/info',
    images: []
}

const restaurantCategories = ["Бургеры", "Выпечка", "Италия", "Завтрак", "Кавказ", "Ланч", "Морепродукты", "Мясо"]
