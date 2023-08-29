import React from "react";
import PopupWithForm from "./PopupWithForm.jsx";

const PopupWithConfirmation = ({ isOpen, onClose, onSubmit, textOnButton, cardItem }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(cardItem); // сам метод onSubmit описан в App.js - handleCardDelete; везде аргумент - карточка для удаления
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            name={"confirmation"}
            onClose={onClose}
            title={"Вы уверены?"}
            textOnButton={textOnButton}
            onSubmit={handleSubmit}
        />
    )
}

export default PopupWithConfirmation;