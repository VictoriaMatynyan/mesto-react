import React, { useState, useEffect, useContext } from "react"; 
import PopupWithForm from "./PopupWithForm";
import ProfileFormInput from "./ProfileFormInput";
import CurrentUserContext from "../contexts/CurrentUserContext";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const currentUser = useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]); // если isOpen = true, то useEffect запустится 1 раз и name и description 
    // будут обновлены на текущие currentUser.name и currentUser.about

    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit (e) {
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <> 
    <PopupWithForm
        isOpen={isOpen}
        name={"edit"}
        onClose={onClose}
        title={"Редактировать профиль"}
        textOnButton={"Сохранить"}  
        onSubmit={handleSubmit}
    >
    <ProfileFormInput
        value={name || ""}
        onChange={handleChangeName}
        type={"text"}
        idName={"name"}
        placeholder={"Ваше имя"}
        className={"popup__input popup__input_type_name"}
        minLength={2}
        maxLength={40}
    />
    <ProfileFormInput
        value={description || ""}
        onChange={handleChangeDescription}
        type={"text"}
        name={"about"}
        idName={"description"}
        placeholder={"О себе"}
        className={"popup__input popup__input_type_description"}
        minLength={2}
        maxLength={200}
    />
    </PopupWithForm>
        </> 
    )
}

// указание value как {name || ""} предотвращает "Warning: A component is changing a 
// controlled input to be uncontrolled"

export default EditProfilePopup;