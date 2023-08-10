import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ProfileFormInput from './ProfileFormInput.jsx';
import PopupWithImage from './PopupWithImage.jsx';

function App() {
  
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

  //функция закрытия всех попапов
  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setClosedWithEsc(false);
    setSelectedCard(null);
  }

  return (
    <>
  <Header />
  <Main
    onEditAvatar={handleEditAvatarClick}
    onEditProfile={handleEditProfileClick}
    onAddPlace={handleAddPlaceClick}
    onCardClick={handleCardClick}
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
</>
  );
}

export default App;
