import {useCallback, useEffect, useState} from 'react';
import {IRestaurant} from "../models/entities.tsx";
import {Badge, Button, Container, Flex, Group, ScrollArea, Table, Textarea, Title} from "@mantine/core";
import {isNotEmpty, useForm} from "@mantine/form";
import {TimeInput} from "@mantine/dates";
import Input from "../components/InputOverride.tsx";
import InputError from "../components/InputError.tsx";
import ImageInput from "../components/ImageInput.tsx";
import '../styles/restaurant.scss'
import SuggestAddress from "../components/SuggestAddress.tsx";
import {
    useChangeRestaurantInfoMutation, useDeleteTableMutation, useGetImagesQuery,
    useGetRestaurantInfoQuery,
    useGetRestaurantTagsQuery, usePostImagesMutation
} from "../store/api/restaurantApi.ts";
import RestaurantSkeleton from "../components/skeletons/RestaurantSkeleton.tsx";
import {notifications} from "@mantine/notifications";
import {useDisclosure} from "@mantine/hooks";
import AddTablesModal from "../components/AddTablesModal.tsx";

const RestaurantInfo = () => {
    const {data: restaurant, isSuccess, isError} = useGetRestaurantInfoQuery();
    const {data: restaurantImages} = useGetImagesQuery(restaurant?.id, {
        skip: !restaurant?.id
    })
    const {data: tags} = useGetRestaurantTagsQuery();
    const [changeRestaurantInfo] = useChangeRestaurantInfoMutation();
    const [postImages] = usePostImagesMutation();
    const [deleteTable] = useDeleteTableMutation()

    const [isEditMode, setIsEditMode] = useState(false)
    const [images, setImages] = useState<string[]>([])
    const [opened, {open, close}] = useDisclosure(false)

    const form = useForm({
        initialValues: {...restaurant, images: []},
        validate: {
            name: isNotEmpty('Поле обязательно к заполнению'),
                phone_number: (value) => value && !(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/.test(value)) ? 'Некорректный формат номера телефона' : null,
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
        handlePostImages(newInfo.images as File[])
        changeRestaurantInfo(newInfo)
        setIsEditMode(false)
    }

    const handlePostImages = (images: File[]) => {
        const formData = new FormData();
        images.forEach(image => formData.append('files', image));
        postImages({files: formData, id: restaurant.id})
    }

    const handleAddImage = (event) => {
        if (event.target?.files?.length) {
            form.setFieldValue('images', [...form.values.images, event.target.files[0]])
            const fileReader = new FileReader()
            fileReader.onloadend = (event) => setImages(prevState => [...prevState, event.target.result as string])
            fileReader.readAsDataURL(event.target.files[0])
        }
    }

    const handleDeleteTable = async (id: number) => {
        await deleteTable(id)
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

    useEffect(() => {
        if(restaurantImages){
            setImages(prevState => [...prevState, ...restaurantImages])
        }
    }, [restaurantImages]);

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
                    <Flex direction='column'>
                        <Input disabled={!isEditMode} placeholder="Номер телефона" {...form.getInputProps("phone_number")}/>
                        {form.errors?.phone_number && <InputError errorMessage={form.errors.phone_number as string}/>}
                    </Flex>
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
                            {(isEditMode ? form.values : restaurant).tags.map((category, i) => <Button
                                key={i}
                                size="sm"
                                style={{cursor: isEditMode ? "pointer" : "default"}}
                                onClick={() => form.setFieldValue(
                                    'tags',
                                    prevValue => prevValue.filter(value => value !== category)
                                )}
                            >
                                {category}
                            </Button>)}
                            {isEditMode && tags.filter(tag => !(form.values.tags || []).includes(tag)).map((tag, i) => <Button
                                key={i}
                                size='sm'
                                variant='outline'
                                onClick={() => form.setFieldValue(
                                    'tags',
                                    prevValue => [...prevValue, tag]
                                )}
                            >
                                {tag}
                            </Button>)}
                        </Group>
                    </Container>
                    <Container fluid p={0} m={0}>
                        <ScrollArea h={320}>
                            <Table mb='md' mt='md'>
                                <Table.Tr>
                                    <Table.Th>№ столика</Table.Th>
                                    <Table.Th>Вместимость</Table.Th>
                                    <Table.Th>Характеристики</Table.Th>
                                    <Table.Th></Table.Th>
                                </Table.Tr>
                                {restaurant.tables.map((table, i) => <Table.Tr key={table.id}>
                                    <Table.Td>№ {i + 1}</Table.Td>
                                    <Table.Td>{table.people_count || 0}</Table.Td>
                                    <Table.Td>
                                        <Flex gap='xs' wrap='wrap'>
                                            {table.tags.map(tag => <Badge>{tag}</Badge>)}
                                        </Flex>
                                    </Table.Td>
                                    {isEditMode && <Table.Td
                                        onClick={() => handleDeleteTable(table.id)}
                                        style={{cursor: 'pointer'}}
                                    >&#10006;</Table.Td>}
                                </Table.Tr>)}
                            </Table>
                        </ScrollArea>
                        {isEditMode && <Button variant='outline' color='gray' size='lg' onClick={open}>
                            Добавить столики
                        </Button>}
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
            <AddTablesModal opened={opened} onClose={close}/>
        </Container>
    );
};

export default RestaurantInfo;
