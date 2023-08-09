// export default class UserInfo {
//     constructor({name, about, avatar}) {
//         this._userName = document.querySelector(name);
//         this._userData = document.querySelector(about);
//         this._userAvatar = document.querySelector(avatar);
//     }

//     getUserInfo() {
//         return {
//             name: this._userName.textContent,
//             about: this._userData.textContent
//         }
//     }

//     //получаем данные пользователя и выводим их на страницу
//     setUserInfo(name, about) {
//         //проверяем, были ли аргументы переданы методу setUserInfo()
//         if (name) {
//             this._userName.textContent = name; //здесь должно быть имя инпута (атрибут name, был изменён в html на name)
//         }
//         if (about) {
//             this._userData.textContent = about; //здесь должно быть имя инпута (атрибут name)
//         }
//     }

//     //устанавливаем аватар
//     setUserAvatar(link) {
//         this._userAvatar.src = link; //link - также имя инпута
//     }
// }