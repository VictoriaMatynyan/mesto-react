import React from "react";

const PopupWithForm = ({ isOpen, name, onClose, title, children, textOnButton }) => {
    return (
        <div className={`popup popup-${name} ${isOpen && "popup_opened"}`}>
        <div className="popup__container">
            <button
            className="popup__close-button"
            type="button"
            onClick={onClose} />
            <h3 className="popup__header">{title}</h3>
            <form
            className={`popup__input-form popup__input-form_type_${name}`}
            name={name}
            noValidate>
                {children}
                <button type="submit" className="popup__submit-button">{textOnButton}</button>
            </form>
        </div>
    </div>
    )
}

export default PopupWithForm;