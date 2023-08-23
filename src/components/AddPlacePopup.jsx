import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import ProfileFormInput from './ProfileFormInput';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen])

    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name, link
        });
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            name={"add"}
            onClose={onClose}
            title={"Новое место"}
            textOnButton={"Создать"}
            onSubmit={handleSubmit}
        >
            <ProfileFormInput
                value={name || ""}
                onChange={handleChangeName}
                type={"text"}
                name={"name"}
                idName={"placeName"}
                placeholder={"Название"}
            />
            <ProfileFormInput
                value={link || ""}
                onChange={handleChangeLink}
                type={"url"}
                name={"link"}
                idName={"placeLink"}
                placeholder={"Ссылка на картинку"}
            />
        </PopupWithForm>
    )
}

export default AddPlacePopup;