import React from "react";
import PopupWithForm from "./PopupWithForm.jsx";

const PopupWithConfirmation = ({ isOpen, onClose, onCardDelete, textOnButton, card }) => {

    function handleCardDelete(card) {
        onCardDelete(card);
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleCardDelete(card);
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