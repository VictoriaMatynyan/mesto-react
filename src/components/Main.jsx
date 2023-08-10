import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';
import api from '../utils/Api.js';

const Main = ({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) => {
    // задаём начальные значения, данные будут подтягиваться с сервера
    const [userName, setUserName] = useState(''); 
    const [userDescription, setUserDescription] = useState('');
    const [avatar, setAvatar] = useState(''); 
    
    //создаём пустой массив для карточек, которые придут с сервера
    const [cards, setCards] = useState([]);

    const handleProfilaDataRequest = () => {
        api.getUserInfo()
        .then(user => {
            setUserName(user.name)
            setUserDescription(user.about)
            setAvatar(user.avatar)
        })
        .catch((err) => {
            console.log(`Ошибка при загрузки данных о профиле: ${err}`);
        })
    }

    const handleCardsRequest = () => {
        api.getInitialCards()
        .then(cards => setCards(cards))
        .catch((err) => {
            console.log(`Ошибка при загрузки карточек: ${err}`);
        })
    }

    useEffect(() => {
        handleProfilaDataRequest(),
        handleCardsRequest()
    }, []);

    return (
        <main className="content">
        <section className="profile">
            <div className="profile__data">
                <button 
                type="button" 
                className="profile__update-button"
                onClick={onEditAvatar}>
                    <img src={avatar}
                    alt="Аватар профиля"
                    className="profile__avatar" />
                </button>
                <div
                className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button 
                    className="profile__edit-button profile__popup-edit"
                    type="button"
                    onClick={onEditProfile}>
                    </button>
                    <p className="profile__description">{userDescription }</p>
                </div>
            </div>
            <button
            type="button" 
            className="profile__add-button profile__popup-add"
            onClick={onAddPlace}>
            </button>               
        </section>
        <section 
        className="elements" 
        aria-label="Фотокарточки с подписью">
            {cards.map((card) => (
                <Card key={card._id} card={card} onCardClick={onCardClick}/>
            ))}
        </section>
    </main>
    )
}

export default Main;