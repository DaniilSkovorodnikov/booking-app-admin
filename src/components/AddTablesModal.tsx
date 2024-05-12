import React, {useEffect, useState} from 'react';
import {Badge, Button, Flex, Modal, NumberInput, TextInput, Title} from "@mantine/core";
import {AddTablesProps} from "../models/props.ts";
import '../styles/add-tables.scss'
import {usePostTablesCountMutation} from "../store/api/restaurantApi.ts";

const AddTablesModal = ({opened, onClose}: AddTablesProps) => {
    const [postTables, {isSuccess, error}] = usePostTablesCountMutation()

    const [tags, setTags] = useState<string[]>([])
    const [newTag, setNewTag] = useState<string>('')
    const [tagInputShow, setTagInputShow] = useState<boolean>(false)
    const [tablesCount, setTablesCount] = useState(0)
    const [peopleCount, setPeopleCount] = useState(0)

    const handleSave = async () => {
        await postTables({
            tags,
            tables_count: tablesCount,
            people_count: peopleCount
        })
    }

    useEffect(() => {
        if(isSuccess){
            onClose()
            setTags([])
            setTablesCount(0)
            setPeopleCount(0)
        }
    }, [isSuccess]);

    return (
        <Modal title='Добавить столики' opened={opened} onClose={onClose} size='lg' centered>
            <Flex gap='md' align='center'>
                {tags.map((type, i) =>
                    <div className='deletable-badge' key={i}>
                        <button
                            onClick={() => setTags(prevState => prevState.filter((_, index) => index !== i))}
                        >&#10006;</button>
                        <Badge>
                            {type}
                        </Badge>
                    </div>)}
                {tagInputShow && <div className='input-with-right'>
                    <TextInput
                        onChange={event => setNewTag(event.target.value)}
                        value={newTag}
                    />
                    <Flex gap='xs'>
                        <button
                            className='input-right-btn'
                            onClick={
                                () => {
                                    setTags(prevState => [...prevState, newTag])
                                    setNewTag('')
                                    setTagInputShow(false)
                                }
                            }>&#10004;</button>
                        <button
                            className='input-right-btn'
                            onClick={() => {
                                setTagInputShow(false)
                                setNewTag('')
                            }}>&#10006;</button>
                    </Flex>
                </div>}
                <Button size='sm' onClick={() => setTagInputShow(true)}>+ Добавить тип стола</Button>
            </Flex>
            <Flex gap='md'>
                <Flex direction='column' mt='md' gap='xs'>
                    <Title order={3}>Количество столиков</Title>
                    <NumberInput
                        className='number-input'
                        value={tablesCount}
                        onChange={value => setTablesCount(+value)}
                    />
                </Flex>
                <Flex direction='column' mt='md' gap='xs'>
                    <Title order={3}>Макс. кол-во человек за столом</Title>
                    <NumberInput
                        className='number-input'
                        value={peopleCount}
                        onChange={value => setPeopleCount(+value)}
                    />
                </Flex>
            </Flex>
            <Flex justify='center' align='center' gap='md' mt='md'>
                <Button variant='outline' color='gray' size='md' onClick={onClose}>Отменить</Button>
                <Button variant='outline' size='md' onClick={handleSave}>Сохранить</Button>
            </Flex>
        </Modal>
    );
};

export default AddTablesModal;
