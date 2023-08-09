import React from 'react';

//создаём 2 пропса: 1) для карточки и её данных, и 2) для функции закрытия попапа
const PopupWithImage = ({card, onClose}) => {
    return (
        <div className={`popup popup-image ${card && "popup_opened"}`}>
            <div className="popup__image-container">
                <figure className="popup__figure">
                    <button 
                    className="popup__close-button" 
                    type="button">
                    </button>
                    <img 
                    src={card.link}
                    alt={card.name}
                    onClick={onClose}
                    className="popup__image"
                    />
                    <figcaption className="popup__caption">{card.name}</figcaption>
                </figure>
            </div>
        </div>
    )
}

export default PopupWithImage;