import Popup from './Popup.js';
export default class PopupWithConfirmation extends Popup {
    constructor(popup, handleRemoveCard) {
        super(popup);
        this._form = this._popup.querySelector('.popup__input-form');
        this._handleRemoveCard = handleRemoveCard;
        this._submitButton = this._popup.querySelector('.popup__submit-button');
    } 

    open(cardItem, cardElement) {
        this.cardItem = cardItem;  //объект карточки
        this.cardElement = cardElement;  //DOM-елемент
        super.open();
    }

    _renderLoading() {
        this._submitButton.textContent = 'Удаление...';
    }

    setEventListeners() {
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleRemoveCard(this.cardItem, this.cardElement);
            this._renderLoading();
        });
        super.setEventListeners();
    }

    savingData(text) {
        this._submitButton.textContent = text;
    }

}