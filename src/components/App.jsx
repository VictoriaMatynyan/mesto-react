import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ProfileFormInput from './ProfileFormInput.jsx';
import PopupWithImage from './PopupWithImage.jsx';

import api from '../utils/Api.js';

//импорт объекта контекста для изменения данных пользователя
import CurrentUserContext from '../contexts/CurrentUserContext.jsx';

function App() {

  //создаём стейт для изменения данных пользователя
  const [currentUser, setCurrentUser] = useState({});

  //создаём пустой массив для карточек, которые придут с сервера
  const [cards, setCards] = useState([]);

  // объединяем запросы и получение данных пользователя и карточек в 1 хук
  useEffect(() => {
    Promise.all ([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
      setCurrentUser(userData);
      setCards(cardsData);
    })
    .catch((err) => {
      console.log(`Ошибка при загрузки данных с сервера: ${err}`);
    })
  }, [])

  //создаём переменные, отвечающие за видимость попапов
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)

  //создаём возможность закрытия попапов по Esc
  const [isClosedWithEsc, setClosedWithEsc] = useState(false);

  //создаём стейт-переменную для открытия popupWithImage
  const [selectedCard, setSelectedCard] = useState(null);

  //создаём обработчики для открытия попапов
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleCardLike = (card) => {
    // снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // console.log(`card = ${JSON.stringify(card)}`)
    
    // отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card, !isLiked)
    .then((newCard) => {
        setCards((currentState) => currentState.map((cardElement) => cardElement._id === card._id ? newCard : cardElement));
    })
    .catch((err) => {
        console.log(`Ошибка при лайке/дислайке элемента:: ${err}`);
    })
  }
  // выше, в api, мы принимаем текущее состояние - currentState - и используем map для обновления каждого 
  // элемента массива cards
  // NB: в функции handleCardLike в зависимости от isLiked происходит рендер новой карточки с новым значением isLiked

  const handleCardDelete = (card) => {
    api.removeCard(card)
    .then(() => {
      // делаем неравными id карточки (возвращаем false), чтобы реализовать её удаление
      setCards((currentState) => currentState.filter((cardElement) => cardElement._id !== card._id));
    })
    .catch((err) => {
      console.log(`Ошибка при удалении элемента: ${err}`)
    })
  }

  //функция закрытия всех попапов
  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    // setClosedWithEsc(false);
    setSelectedCard(null);
  }

  return (
    <>
  <CurrentUserContext.Provider value={currentUser}>
  <Header />
  <Main
    onEditAvatar={handleEditAvatarClick}
    onEditProfile={handleEditProfileClick}
    onAddPlace={handleAddPlaceClick}
    onCardClick={handleCardClick}
    onCardLike={handleCardLike}
    onCardDelete={handleCardDelete}
    cards={cards}
  />
  <Footer />
  <PopupWithImage
    isOpen={selectedCard}
    card={selectedCard}
    onClose={closeAllPopups}
  />
  <PopupWithForm
    isOpen={isEditProfilePopupOpen}
    name={"edit"}
    onClose={closeAllPopups}
    title={"Редактировать профиль"}
    textOnButton={"Сохранить"}
  >
    <ProfileFormInput
      type={"text"}
      name={"name"}
      idName={"name"}
      placeholder={"Ваше имя"}
      minLength={2}
      maxLength={40}
    />
    <ProfileFormInput
      type={"text"}
      name={"about"}
      idName={"description"}
      placeholder={"О себе"}
      minLength={2}
      maxLength={200}
    />
  </PopupWithForm>
  <PopupWithForm
    isOpen={isAddPlacePopupOpen}
    name={"add"}
    onClose={closeAllPopups}
    title={"Новое место"}
    textOnButton={"Создать"}
  >
    <ProfileFormInput
      type={"text"}
      name={"name"}
      idName={"placeName"}
      placeholder={"Название"}
    />
    <ProfileFormInput
      type={"url"}
      name={"link"}
      idName={"placeDescription"}
      placeholder={"Ссылка на картинку"}
    />
  </PopupWithForm>
  <PopupWithForm
    isOpen={isEditAvatarPopupOpen}
    name={"update"}
    onClose={closeAllPopups}
    title={"Обновить аватар"}
    textOnButton={"Сохранить"}
  >
    <ProfileFormInput
      type={"url"}
      name={"link"}
      idName={"avatarUpdate"}
      placeholder={"Ссылка на картинку"}
    />
  </PopupWithForm>
  </CurrentUserContext.Provider>
</>
  );
}

export default App;


// на всякий случай
  // //обращаемся к api и получаем данные пользователя
  // useEffect(() => {
  //   api.getUserInfo()
  //   .then((currentUser) => {
  //     setCurrentUser(currentUser);
  //   })
  //   .catch((err) => {
  //     console.log(`Ошибка при загрузки данных о профиле: ${err}`);
  //   })
  // }, []);

  //  const handleCardsRequest = () => {
  //       api.getInitialCards()
  //       .then(cards => setCards(cards))
  //       .catch((err) => {
  //           console.log(`Ошибка при загрузки карточек: ${err}`);
  //       })
  //   }

  // useEffect(() => {
  //     handleCardsRequest()
  // }, []);