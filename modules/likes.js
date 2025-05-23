import { comments } from './comments.js'
import { renderComments } from './render.js'

// Функция delay возвращает промис, который выполнится через указанное количество миллисекунд.
function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, interval)
    })
}

export function initLikeHandlers() {
    const commentEl = document.getElementById('comment')

    commentEl.addEventListener('click', (event) => {
        const likeButton = event.target.closest('.like-button')
        if (!likeButton) return

        const index = likeButton.dataset.index
        const comment = comments[index]

        // Блокируем повторные нажатия
        if (comment.isLikeLoading) return //Если уже идет «загрузка лайка» (isLikeLoading = true), выходим.Это предотвращает повторные нажатия, пока не завершится "запрос".

        comment.isLikeLoading = true //Устанавливаем флаг isLikeLoading — он сигнализирует, что идёт "отправка".
        renderComments() //отрисовывает комментарий, применяя:класс -loading-like для кнопки (анимация); disabled, чтобы заблокировать кнопку.

        //Запускаем задержку в 2 секунды (эмуляция сетевого запроса).
        delay(2000).then(() => {
            comment.likes = comment.liked
                ? comment.likes - 1
                : comment.likes + 1
            comment.liked = !comment.liked
            comment.isLikeLoading = false
            renderComments()
        })
    })
}

// import { comments } from './comments.js'
// import { renderComments } from './render.js'

// export function initLikeHandlers() {
//     const commentEl = document.getElementById('comment')

//     commentEl.addEventListener('click', (event) => {
//         const likeButton = event.target.closest('.like-button') //-Ищем ближайший элемент с классом .like-button, на который кликнули.
//         if (!likeButton) return  //-Если клик был не по кнопке лайка — выходим.

//         const index = likeButton.dataset.index .// Читаем data-index из кнопки (индекс в массиве comments).
//         comments[index].liked = !comments[index].liked //Получаем соответствующий объект комментария.
//         comments[index].likes += comments[index].liked ? 1 : -1
//         renderComments()
//     })
// }

// import { renderComments } from './render.js'
// import { comments } from './comments.js'

// function delay(interval = 2000) {
//     return new Promise((resolve) => {
//         setTimeout(resolve, interval)
//     })
// }

// export function initLikeHandlers() {
//     const commentList = document.getElementById('comment')

//     commentList.addEventListener('click', (event) => {
//         const likeButton = event.target.closest('.like-button')
//         if (!likeButton) return

//         const index = Number(likeButton.dataset.index)

//         // Защита от двойного клика во время "запроса"
//         if (likeButton.classList.contains('-loading-like')) return

//         likeButton.classList.add('-loading-like')

//         delay(500).then(() => {
//             // Обновляем данные
//             comments[index].liked = !comments[index].liked
//             comments[index].likes += comments[index].liked ? 1 : -1

//             // Перерисовываем и заново привязываем обработчики
//             renderComments()
//             initLikeHandlers()

//             // Удаляем анимацию с новой кнопки
//             const updatedButton =
//                 document.querySelectorAll('.like-button')[index]
//             updatedButton.classList.remove('-loading-like')
//         })
//     })
// }

// import { comments } from './comments.js'
// import { renderComments } from './render.js'

// export function initLikeHandlers() {
//     const commentEl = document.getElementById('comment')

//     commentEl.addEventListener('click', (event) => {
//         const likeButton = event.target.closest('.like-button')
//         if (!likeButton) return

//         const index = likeButton.dataset.index
//         comments[index].liked = !comments[index].liked
//         comments[index].likes += comments[index].liked ? 1 : -1
//         renderComments()
//     })
// }

// import { comments } from './comments.js'
// import { renderComments } from './render.js'

// export function initLikeHandlers() {
//     const commentEl = document.getElementById('comment')

//     commentEl.addEventListener('click', (event) => {
//         const likeButton = event.target.closest('.like-button')
//         if (!likeButton) return
//         event.stopPropagation()

//         const index = likeButton.getAttribute('data-index')
//         comments[index].liked = !comments[index].liked
//         comments[index].likes += comments[index].liked ? 1 : -1

//         renderComments()
//     })
// }

// function handleLikeClick(index) {
//     //В функции клика на лайк нужно менять значения ключей в массиве и после этого заново выполнять рендер всех комментариев.
//     const index = button.getAttribute('data-index') // индекс из атрибута data-index
//     comments[index].liked = !comments[index].liked // переключаем состояние лайка
//     comments[index].likes += comments[index].liked ? 1 : -1 // обновление количества лайков, если пользователь поставил лайк под комментарием
//     renderComments() // отображает изменения на странице
// }

// commentEl.addEventListener('click', (event) => {
//     // Проверяем, что клик был НЕ по лайку
//     if (event.target.closest('.like-button')) return

//     const commentElement = event.target.closest('.comment') // выбераем комментарий,на который хотим ответить
//     if (!commentElement) return // если кликаем не на комментарий, то выходим из функции
