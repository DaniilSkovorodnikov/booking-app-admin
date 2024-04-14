import {useCallback, useEffect, useState} from 'react';
import {IRestaurant} from "../models/entities.tsx";
import {Button, Container, Flex, Group, Textarea, Title} from "@mantine/core";
import {isNotEmpty, useForm} from "@mantine/form";
import {TimeInput} from "@mantine/dates";
import Input from "../components/InputOverride.tsx";
import InputError from "../components/InputError.tsx";
import ImageInput from "../components/ImageInput.tsx";
import '../styles/restaurant.scss'
import SuggestAddress from "../components/SuggestAddress.tsx";
import {useChangeRestaurantInfoMutation, useGetRestaurantInfoQuery} from "../store/api/restaurantApi.ts";
import RestaurantSkeleton from "../components/skeletons/RestaurantSkeleton.tsx";
import {notifications} from "@mantine/notifications";

const RestaurantInfo = () => {
    const {data: restaurant, isSuccess, isError} = useGetRestaurantInfoQuery()
    const [changeRestaurantInfo] = useChangeRestaurantInfoMutation()

    const [isEditMode, setIsEditMode] = useState(false)
    const [images, setImages] = useState<string[]>([])

    const form = useForm({
        initialValues: restaurant,
        validate: {
            name: isNotEmpty('Поле обязательно к заполнению')
        }
    })

    const handleSubmit = (value: Partial<IRestaurant>) => {
        if (!isEditMode || form.validate().hasErrors) {
            return
        }
        const dirtyFields = Object
            .entries(value)
            .filter(([key]) => form.isDirty(key))
        const newInfo = Object.fromEntries(dirtyFields)
        changeRestaurantInfo(newInfo)
        setIsEditMode(false)
    }

    const handleAddImage = (event) => {
        if (event.target?.files?.length) {
            form.setFieldValue('images', [...form.values.images, event.target.files[0]])
            const fileReader = new FileReader()
            fileReader.onloadend = (event) => setImages(prevState => [...prevState, event.target.result as string])
            fileReader.readAsDataURL(event.target.files[0])
        }
    }

    const handleChangeAddress = useCallback((address: string) => {
        form.setFieldValue('address', address)
    }, [])

    useEffect(() => {
        if (isError) {
            notifications.show({
                title: 'Ошибка',
                message: 'Произошла неизвестная ошибка!',
                variant: 'error'
            })
        }
    }, [isError]);

    useEffect(() => {
        form.setInitialValues(restaurant)
        form.setValues(restaurant)
    }, [restaurant]);

    if (!isSuccess) {
        return <RestaurantSkeleton/>
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
                        <Input
                            disabled
                            placeholder='Время работы'
                            value={!restaurant.open_from || !restaurant.open_to ? undefined : `${restaurant.open_from} - ${restaurant.open_to}`}
                        />
                    }
                    <SuggestAddress
                        defaultValue={restaurant.address}
                        disabled={!isEditMode}
                        onInputChange={handleChangeAddress}
                        onChange={(address, {latitude, longitude}) => {
                            form.setFieldValue('address', address);
                            form.setFieldValue('latitude', latitude);
                            form.setFieldValue('longitude', longitude);
                        }}/>
                    <Input disabled={!isEditMode} placeholder="Вебсайт" {...form.getInputProps("site")}/>
                    <Container fluid p={0} m={0}>
                        <Title order={3} mb={8}>Фото ресторана</Title>
                        <Flex gap="md" align="center">
                            {images.map((src, i) => <img className='restaurant-photo' key={i} src={src}
                                                         style={{width: 120, height: 120}}/>)}
                            {isEditMode && images.length < 5 && <ImageInput onChange={handleAddImage}/>}
                        </Flex>
                    </Container>
                    <Container fluid p={0} m={0}>
                        <Title order={3} mb={8}>Характеристики</Title>
                        <Group>
                            {restaurant.tags.map((category, i) => <Button
                                key={i}
                                size="lg"
                                style={{cursor: isEditMode ? "pointer" : "default"}}
                                onClick={() => form.setFieldValue(
                                    'tags',
                                    prevValue => prevValue.filter(value => value !== category)
                                )}
                            >
                                {category}
                            </Button>)}
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
