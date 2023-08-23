import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ProfileFormInput from './ProfileFormInput.jsx';
import PopupWithImage from './PopupWithImage.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';

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

  const handleUpdateUser = ({name, about}) => {
    api.editUserInfo({name, about})
    .then((data) => setCurrentUser(data))
    .catch((err) => {
      console.log(`Ошибка загрузки данных пользователя: ${err}`);
    })
    .finally(() => {
      closeAllPopups();
    })
  }

  const handleUpdateAvatar = (avatar) => {
    api.editAvatar(avatar)
    .then((data) => {
      setCurrentUser(data);
    })
    .catch((err) => {
      console.log(`Ошибка загрузки аватара: ${err}`);
    })
    .finally(() => {
      closeAllPopups();
    })
  }

  const handleAddPlaceSubmit = ({name, link}) => {
    api.addNewCard({name, link})
    .then((newCard) => {
      // newCard - новая карточка, добавленная с помощью API, оператор ... расширяет копию текущего массива
      setCards([newCard, ...cards]);
    })
    .catch((err) => {
      console.log(`Ошибка при добавлении новой карточки: ${err}`);
    })
    .finally(() => {
      closeAllPopups();
    })
  }

  //функция закрытия всех попапов
  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
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
  <EditProfilePopup
    isOpen={isEditProfilePopupOpen} 
    onClose={closeAllPopups}
    onUpdateUser={handleUpdateUser} 
  />
  <EditAvatarPopup 
    isOpen={isEditAvatarPopupOpen} 
    onClose={closeAllPopups}
    onUpdateAvatar={handleUpdateAvatar}
  />
  <AddPlacePopup
    isOpen={isAddPlacePopupOpen}
    onClose={closeAllPopups}
    onAddPlace={handleAddPlaceSubmit}
  />
  {/* <PopupWithForm
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
  </PopupWithForm> */}
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