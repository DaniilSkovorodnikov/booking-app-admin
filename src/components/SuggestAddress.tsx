import React, {useEffect, useState} from 'react';
import Input from "./InputOverride.tsx";
import {useClickOutside, useDebouncedValue, useDisclosure} from "@mantine/hooks";
import {IGeocodeResult, ISuggestedAddress} from "../models/entities.tsx";
import {Popover} from "@mantine/core";
import '../styles/suggested.scss'
import {SuggestedInputProps} from "../models/props.ts";

const SuggestAddress = ({onChange, disabled, defaultValue, onInputChange}: SuggestedInputProps) => {
    const [inputAddress, setInputAddress] = useState<string>(defaultValue || '')
    const [suggestedItems, setSuggestedItems] = useState<ISuggestedAddress[]>([])
    const [item, setItem] = useState<ISuggestedAddress | undefined>()
    const [openedPopover, {open: openPopover, close: closePopover}] = useDisclosure()

    const [debouncedInputAddress] = useDebouncedValue(inputAddress, 500);
    const dropdownRef = useClickOutside(() => closePopover())

    useEffect(() => {
        if (debouncedInputAddress.length > 10 && debouncedInputAddress !== defaultValue) {
            fetch(`https://suggest-maps.yandex.ru/v1/suggest?apikey=a37b957c-e965-430b-bd89-0dccdc3360fa&text=${inputAddress}&print_address=1`)
                .then(res => res.json())
                .then(value => {
                    setSuggestedItems(value.results as ISuggestedAddress[])
                    openPopover()
                })
        }
    }, [debouncedInputAddress, defaultValue]);

    useEffect(() => {
        if (item) {
            fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=f9bd22e1-c45b-44a1-ac59-145f58772e90&geocode=${item.address.formatted_address}&format=json`)
                .then(res => res.json())
                .then((value: IGeocodeResult) => {
                    if (+value.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.found > 0) {
                        const coords = value.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')
                        onChange(item.address.formatted_address, {latitude: +coords[0], longitude: +coords[1]})
                    }
                })
        }
    }, [item]);

    useEffect(() => {
        onInputChange(debouncedInputAddress)
    }, [debouncedInputAddress, onInputChange]);

    return (
        <div ref={dropdownRef}>
            <Popover opened={openedPopover} width="target" position="bottom">
                <Popover.Target>
                    <div>
                        <Input
                            disabled={disabled}
                            placeholder="Выберите адрес"
                            value={inputAddress}
                            onChange={(event) => setInputAddress(event.target.value)}
                            onFocus={() => {
                                if(suggestedItems.length > 0){ openPopover() }
                            }}
                        />
                    </div>
                </Popover.Target>
                <Popover.Dropdown p={0}>
                    {suggestedItems.map((item, i) => <div
                        className="suggested"
                        key={i}
                        onClick={() => {
                            setItem(item)
                            setInputAddress(item.address.formatted_address)
                            closePopover()
                        }}
                    >
                        {item.address.formatted_address}
                    </div>)}
                </Popover.Dropdown>
            </Popover>
        </div>
    );
};

export default SuggestAddress;
