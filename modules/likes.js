import { comments } from './comments.js'
import { renderComments } from './renderComments.js'
import { getToken } from './API.js'

export function initLikeHandlers() {
    const commentList = document.getElementById('comment')

    if (!commentList) return

    commentList.addEventListener('click', (event) => {
        const likeButton = event.target.closest('.like-button')

        if (!likeButton) return

        const index = Number(likeButton.dataset.index)

        const comment = comments[index]

        if (!comment || comment.isLikeLoading) return

        likeButton.classList.add('-loading-like')
        comment.isLikeLoading = true

        const url = `https://wedev-api.sky.pro/api/v2/denis-godov/comments/${comment.id}/toggle-like`

        fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Ошибка при лайке')
                }
                comment.liked = !comment.liked
                comment.likes += comment.liked ? 1 : -1
            })
            .catch(() => {
                alert('Произошла ошибка при попытке лайка.')
            })
            .finally(() => {
                likeButton.classList.remove('-loading-like')
                comment.isLikeLoading = false
                renderComments(true, comment.id) // Обновляем только этот комментарий
            })
    })
}

// код с комментариями:
// import { comments } from './comments.js' - содержит данные о комментариях, например, текст комментария, количество лайков и другие данные.
// import { renderComments } from './renderComments.js' - функцию renderComments, которая отвечает за отображение комментариев на странице.
// В этом случае, она используется для перерисовки конкретного комментария после того, как был обновлён его статус лайка.
// import { getToken } from './API.js' - функция getToken, которая, возвращает токен авторизации пользователя localStorage.
// Этот токен будет использоваться для аутентификации пользователя при отправке запросов на сервер.

// Функция initLikeHandlers добавляет обработчик кликов на кнопки лайков.
// При клике на кнопку лайка:
// - Проверяется, не выполняется ли уже процесс лайка.
// - Отправляется запрос на сервер для постановки или снятия лайка.
// - После успешного выполнения обновляются данные о лайке, и комментарий перерисовывается.
// - В случае ошибки показывается сообщение.

// export function initLikeHandlers() {
//     const commentList = document.getElementById('comment') - получаем DOM-элемент с id="comment", контейнер, в котором отображаются все комментарии на странице.

//     if (!commentList) return - Если элемент с id comment не найден (например, если он не существует на странице), мы выходим из функции, так как нам нечего обрабатывать.

// обработчик события на клик по элементам внутри контейнера commentList, чтобы кликать по кнопке лайка внутри любого комментария.
//     commentList.addEventListener('click', (event) => {
//         const likeButton = event.target.closest('.like-button') - Мы ищем ближайший элемент с классом .like-button, к которому относится событие клика.
// Используем closest(), чтобы быть уверенным, что клик был именно по кнопке лайка, а не по другому элементу.

//         if (!likeButton) return - Если элемент с классом .like-button не был найден (например, если клик был не по кнопке лайка),
// то выходим из функции, ничего не делая.

//         const index = Number(likeButton.dataset.index) - Извлекаем индекс комментария из атрибута data-index кнопки лайка.
// Это значение указывает, какой комментарий был лайкнут. Преобразуем его в число с помощью Number().

//         const comment = comments[index] - Из массива comments выбираем комментарий по индексу, который мы только что извлекли.
// получаем объект с данными конкретного комментария.

//         if (!comment || comment.isLikeLoading) return - Проверяем, существует ли комментарий (не undefined или null)
// и не выполняется ли уже процесс лайка (через флаг isLikeLoading).
// Если комментарий не найден или если уже идёт процесс лайка, выходим из функции.

//         likeButton.classList.add('-loading-like') - Добавляем класс -loading-like на кнопку лайка. Это может быть использовано для
// отображения анимации или другого индикатора загрузки, чтобы пользователь понял, что лайк сейчас обрабатывается.
//         comment.isLikeLoading = true - Устанавливаем флаг isLikeLoading в true, чтобы предотвратить повторное нажатие на кнопку лайка, пока запрос не завершится.

// Формируем URL для отправки запроса на сервер для лайка/дизлайка комментария. Используем ID комментария (comment.id), чтобы обратиться к правильному ресурсу на сервере.
//         const url = `https://wedev-api.sky.pro/api/v2/denis-godov/comments/${comment.id}/toggle-like`

// Отправляем POST запрос на сервер по указанному URL.
//         fetch(url, {
//             method: 'POST',
//             headers: {
//                 Authorization: `Bearer ${getToken()}`, - В заголовке запроса отправляем токен авторизации пользователя, который получаем через функцию getToken.
// Это необходимо для того, чтобы сервер знал, что запрос отправляется авторизованным пользователем.
//             },
//         })
//             .then((response) => { - Обрабатываем успешный ответ от сервера. Если сервер вернул успешный ответ (например, статус 200), выполняем следующее.
//                 if (!response.ok) {
//                     throw new Error('Ошибка при лайке')
//                 }
//                 comment.liked = !comment.liked
//                 comment.likes += comment.liked ? 1 : -1
//             })
//             .catch(() => {
//                 alert('Произошла ошибка при попытке лайка.')
//             })
//             .finally(() => {
//                 likeButton.classList.remove('-loading-like') - Убираем класс -loading-like с кнопки лайка, чтобы завершить индикатор загрузки.
//                 comment.isLikeLoading = false - Снимаем флаг isLikeLoading, так как процесс обработки лайка завершён.
//                 renderComments(true, comment.id) // Обновляем только этот комментарий
//                Перерисовываем комментарии, но только для обновлённого комментария (по его ID).
// Это позволяет нам обновить количество лайков и статус лайка только для этого конкретного комментария.
//             })
//     })
// }

// СТАРЫЕ КОДА С ПРЕДЫДУЩИХ ДОМАШЕК
// import { comments } from './comments.js'
// import { renderComments } from './renderComments.js'
// import { getToken } from './API.js'

// export function initLikeHandlers() {
//     const commentList = document.getElementById('comment')

//     if (!commentList) return

//     commentList.addEventListener('click', (event) => {
//         const likeButton = event.target.closest('.like-button')

//         if (!likeButton) return

//         const index = Number(likeButton.dataset.index)

//         const comment = comments[index]

//         if (!comment || comment.isLikeLoading) return

//         // Добавляем класс loading
//         likeButton.classList.add('-loading-like')
//         comment.isLikeLoading = true

//         const url = `https://wedev-api.sky.pro/api/v2/denis-godov/comments/${comment.id}/toggle-like`

//         fetch(url, {
//             method: 'POST',
//             headers: {
//                 Authorization: `Bearer ${getToken()}`,
//             },
//         })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Ошибка при лайке')
//                 }
//                 comment.liked = !comment.liked
//                 comment.likes += comment.liked ? 1 : -1
//             })
//             .catch((error) => {
//                 console.error('Ошибка при лайке:', error)
//                 alert('Произошла ошибка при попытке лайка.')
//             })
//             .finally(() => {
//                 // Удаляем класс loading
//                 likeButton.classList.remove('-loading-like')
//                 comment.isLikeLoading = false
//                 renderComments(!!getToken()) // Повторная отрисовка с проверкой авторизации
//             })
//     })
// }

// import { comments } from './comments.js'
// import { renderComments } from './renderComments.js'
// import { getToken } from './API.js'
// export function initLikeHandlers() {
//     const commentList = document.getElementById('comment')
//     if (!commentList) return
//     commentList.addEventListener('click', (event) => {
//         const likeButton = event.target.closest('.like-button')
//         if (!likeButton) return
//         const index = Number(likeButton.dataset.index)
//         const comment = comments[index]
//         if (!comment || comment.isLikeLoading) return
//         comment.isLikeLoading = true
//         renderComments(true) // Re-render to show loading state
//         const url = `https://wedev-api.sky.pro/api/v2/denis-godov/comments/${comment.id}/toggle-like`
//         fetch(url, {
//             method: 'POST',
//             headers: {
//                 Authorization: `Bearer ${getToken()}`,
//             },
//         })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Ошибка при лайке')
//                 }
//                 // Обновляем состояние лайка локально
//                 comment.liked = !comment.liked
//                 comment.likes += comment.liked ? 1 : -1
//             })
//             .catch(() => {
//                 alert(
//                     'Произошла ошибка при попытке лайка. Возможно, вы не авторизованы.',
//                 )
//             })
//             .finally(() => {
//                 comment.isLikeLoading = false
//                 renderComments(true) // Re-render to remove loading state
//             })
//     })
// }

// import { comments } from './comments.js'
// import { renderComments } from './renderComments.js'

// export function initLikeHandlers() {
//     const commentList = document.getElementById('comment')
//     if (!commentList) return

//     commentList.addEventListener('click', (event) => {
//         const likeButton = event.target.closest('.like-button')
//         if (!likeButton) return

//         const index = Number(likeButton.dataset.index)
//         const comment = comments[index]

//         // Проверка на существование комментария
//         if (!comment) return

//         // Блокируем кнопку во время обновления
//         comment.isLikeLoading = true
//         renderComments()

//         setTimeout(() => {
//             comment.isLikeLoading = false
//             if (comment.liked) {
//                 comment.likes -= 1
//                 comment.liked = false
//             } else {
//                 comment.likes += 1
//                 comment.liked = true
//             }

//             renderComments()
//         }, 500)
//     })
// }

// import { comments } from './comments.js'
// import { renderComments } from './renderComments.js'

// // Функция delay возвращает промис, который выполнится через указанное количество миллисекунд.
// function delay(interval = 300) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve()
//         }, interval)
//     })
// }

// export function initLikeHandlers() {
//     const commentEl = document.getElementById('comment')

//     commentEl.addEventListener('click', (event) => {
//         const likeButton = event.target.closest('.like-button')
//         if (!likeButton) return

//         const index = likeButton.dataset.index
//         const comment = comments[index]

//         // Блокируем повторные нажатия
//         if (comment.isLikeLoading) return //Если уже идет «загрузка лайка» (isLikeLoading = true), выходим.Это предотвращает повторные нажатия, пока не завершится "запрос".

//         comment.isLikeLoading = true //Устанавливаем флаг isLikeLoading — он сигнализирует, что идёт "отправка".
//         renderComments() //отрисовывает комментарий, применяя:класс -loading-like для кнопки (анимация); disabled, чтобы заблокировать кнопку.

//         //Запускаем задержку в 2 секунды (эмуляция сетевого запроса).
//         delay(2000).then(() => {
//             comment.likes = comment.liked
//                 ? comment.likes - 1
//                 : comment.likes + 1
//             comment.liked = !comment.liked
//             comment.isLikeLoading = false
//             renderComments()
//         })
//     })
// }

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
