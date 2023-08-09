import React from 'react';

const Card = ({card, onCardClick}) => {

    //обработчик для отображния popupWithImage
    const handleClick = (card) => {
        onCardClick(card);
    };

    return (
        <article className="element">
            <img
            src={card.link} // link, name, likes - это всё пропсы объекта с сервера
            alt={card.name} 
            className="element__image element__popup-open"
            onClick={
                () => handleClick(card)
                } />
            <button
            type="button"
            className="element__delete-button">
            </button>
            <div className="element__text">
                <h2 className="element__caption">{card.name}</h2>
                <div className="element__like-attributes">
                    <button
                    type="button"
                    className="element__like-button">
                    </button>
                    <p className="element__likes-counter">{card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card;
