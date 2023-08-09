// import {formStateObj} from '../utils/constants.js';
// import Popup from './Popup.js';

// export default class PopupWithForm extends Popup {
//     constructor(popup, {handleFormSubmit}) {
//         super(popup);
//         this._handleFormSubmit = handleFormSubmit;
//         this._popupForm = popup.querySelector('.popup__input-form');
//         this._inputList = Array.from(this._popupForm.querySelectorAll(formStateObj.inputElement));
//         this._submitButton = popup.querySelector('.popup__submit-button');
//     }
    
//     //получаем значения всех полей формы
//     _getInputValues() {
//         //создаём пустой объект для сбора данных. Этот метод собирает массив всех полей в форме, обходит их и
//         // добавляет их значения в объект. 
//         this._formValues = {};
//         // добавляем в этот объект значения всех полей
//         this._inputList.forEach(input => {
//             //ключами объекта _formValues будут атрибуты name каждого поля
//             this._formValues[input.name] = input.value;
//         });

//         return this._formValues;
//     }

//     _renderLoading() {
//         this._submitButton.textContent = 'Сохранение...';
//     }
    
//     setEventListeners() {
//         super.setEventListeners();
//         this._popupForm.addEventListener('submit', (evt) => {
//             evt.preventDefault();
//             this._handleFormSubmit(this._getInputValues());
//             this._renderLoading();
//         })
//     }

//     close() {
//         super.close();
//         this._popupForm.reset();
//     }

//     savingData(text) {
//         this._submitButton.textContent = text;
//     }

// }