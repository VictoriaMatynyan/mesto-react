class FormValidator {
    constructor(formStateObj, formElement) {
        this._formStateObj = formStateObj;
        this._formElement = formElement;
        this._inputElement = formElement.querySelector(formStateObj.inputElement);
        this._inputList = Array.from(formElement.querySelectorAll(formStateObj.inputElement));
        this._submitButton = formElement.querySelector(formStateObj.submitButton);
        this._inactiveSubmitButton = formStateObj.inactiveSubmitButton;
        this._inputError = formStateObj.inputError;
        this._errorElement = formElement.querySelector(formStateObj.errorElement);
    }

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(this._inputError);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = '';
        inputElement.classList.remove(this._inputError);
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _checkInputInvalidity() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid; 
        });
    }

    _setFormSubmitButtonState() {
        if (this._checkInputInvalidity()) {
            this._submitButton.setAttribute('disabled', true);
            this._submitButton.classList.add(this._inactiveSubmitButton);
        } else {
            this._submitButton.removeAttribute('disabled');
            this._submitButton.classList.remove(this._inactiveSubmitButton);
        }
    }

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._setFormSubmitButtonState();
            })
        })
    }

    setFormState() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
            });
        this._setFormSubmitButtonState();
    } 

    enableValidation() {
        this._setEventListeners(); 
    }
}

export default FormValidator;