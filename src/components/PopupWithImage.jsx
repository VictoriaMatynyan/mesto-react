import React from 'react';

//создаём 2 пропса: 1) для карточки и её данных, и 2) для функции закрытия попапа
const PopupWithImage = ({card, onClose}) => {
    // console.log(`Значение card в PopupWithImage = ${card}`);
    // console.log(`Значение card.link в PopupWithImage = ${card.link}`);
    return (
        <div className={`popup popup-image ${card && "popup_opened"}`}>
            <div className="popup__image-container">
                <figure className="popup__figure">
                    <button 
                    className="popup__close-button" 
                    type="button"
                    onClick={onClose}>
                    </button>
                    <img 
                    src={card ? card.link : ''}
                    alt={card ? card.name : ''}
                    className="popup__image" />
                    <figcaption className="popup__caption">{card.name}</figcaption>
                </figure>
            </div>
        </div>
    )
}

export default PopupWithImage;