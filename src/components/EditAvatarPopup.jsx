import React, { useEffect, useRef, forwardRef } from "react";
import PopupWithForm from "./PopupWithForm";
import ProfileFormInput from "./ProfileFormInput";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
    const avatarRef = useRef();

    // нельзя использовать атрибут ref с функциональными компонентами, поэтому используем forwardRef
    const ProfileFormInput = forwardRef((props, ref) => {   
        return (
        <label className="popup__field">
            <input
            ref={ref}
            {...props}
            />
        </label>
        );
    });

    function handleSubmit(e) {
        e.preventDefault();

        // добавляем значение инпута, полученное с помощью рефа
        onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    useEffect(() => {
        // если попап открыт, очищаем поле инпута
        if(isOpen) {
            avatarRef.current.value = '';
        }
    }, [isOpen]);

    return (
        <>
        <PopupWithForm
            isOpen={isOpen}
            name={"update"}
            onClose={onClose}
            title={"Обновить аватар"}
            textOnButton={"Сохранить"}
            onSubmit={handleSubmit}
        >
            <ProfileFormInput
                ref={avatarRef}
                type={"url"}
                name={"link"}
                id={"avatarUpdate-input"}
                placeholder={"Ссылка на картинку"}
                className={"popup__input popup__input_type_update"}
            />
        </PopupWithForm>
        </>
    )
}

export default EditAvatarPopup;