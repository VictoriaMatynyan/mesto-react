// export default class Section {
//     constructor({renderer}, containerSelector) {
//         this._renderer = renderer; //создание и отрисовка данных на странице
//         this._containerSelector = containerSelector //убрала document.querySelector, чтобы в index.js поставить переменную, а не название класса
//     }

//     setItem(element) {
//         this._containerSelector.prepend(element);
//     }

//     renderItems(items) {
//         items.reverse();
//         items.forEach((item) => {
//             this._renderer(item);
//         })
//     }

//     handleDeleteCard(element) {
//         element.remove();
//         element = null;
//     }
// }