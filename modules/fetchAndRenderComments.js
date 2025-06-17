import { fetchComments } from './API.js'
import { updateComments } from './comments.js'
import { renderComments } from './renderComments.js'

export const fetchAndRenderComments = (isAuthorized = false) => {
    fetchComments()
        .then((comments) => {
            updateComments(comments)
            renderComments(isAuthorized)
        })
        .catch((error) => {
            console.error('Ошибка при получении комментариев:', error)
            alert('Не удалось загрузить комментарии!')
        })
}

// код с комментариями:
// import { fetchComments } from './API.js' - fetchComments отвечает за асинхронный запрос к серверу для получения списка комментариев.
// использует fetch для отправки HTTP-запроса на сервер и получения данных (JSON с комментариями).
// После успешного получения данных, функция возвращает промис, который разрешается с массивом комментариев.
// import { updateComments } from './comments.js' - функция updateComments для обновления локального состояния комментариев,
// запись данных в глобальный объект, массив или сохранение их в локальное хранилище (localStorage).
// вызывается после того, как мы получим данные от сервера (через fetchComments), чтобы сохранить или обновить список комментариев в нашем приложении.
// import { renderComments } from './renderComments.js' -  Отображает комментарии на странице.

// Функция fetchAndRenderComments: занимается тем, что загружает комментарии и обрабатывает успешные и ошибочные ответы, обновляя интерфейс соответствующим образом.
// использует параметр isAuthorized для того, чтобы определить, как отображать элементы интерфейса в зависимости от того,
// авторизован ли пользователь. Если пользователь авторизован, ему может быть доступна форма для добавления нового комментария,
// а если не авторизован — будет предложено войти.
// export const fetchAndRenderComments = (isAuthorized = false) => {
//     fetchComments()
// Если запрос успешен:
// - Обновляет локальное состояние комментариев через updateComments.
// - Отображает комментарии с помощью renderComments, передавая информацию о том, авторизован ли пользователь.
//         .then((comments) => {
//             updateComments(comments)
//             renderComments(isAuthorized)
//         })
// Если запрос неудачен:
// - Выводит ошибку в консоль.
// - Показывает пользователю сообщение об ошибке с помощью alert.
//         .catch((error) => {
//             console.error('Ошибка при получении комментариев:', error)
//             alert('Не удалось загрузить комментарии!')
//         })
// }

// СТАРЫЕ КОДА С ПРЕДЫДУЩИХ ДОМАШЕК
// import { fetchComments } from './API.js'
// import { updateComments } from './comments.js'
// import { renderComments } from './renderComments.js'

// export const fetchAndRenderComments = (isAuthorized = false) => {
//     return fetchComments().then((data) => {
//         updateComments(data.comments)
//         renderComments(isAuthorized)
//     })
// }

// import { fetchComments } from './API.js'
// import { renderComments } from './renderComments.js'
// import { updateComments } from './comments.js'

// export const fetchAndRenderComments = (isAuthorized = false) => {
//     return fetchComments().then((data) => {
//         updateComments(data.comments)
//         renderComments(isAuthorized) // ← передаём флаг
//     })
// }

// import { fetchComments } from './API.js'
// import { renderComments } from './renderComments.js'
// import { updateComments } from './comments.js'

// export const fetchAndRenderComments = () => {
//     return fetchComments().then((data) => {
//         updateComments(data.comments)
//         renderComments()
//     })
// }

// import { fetchComments } from './API.js'
// import { renderComments } from './renderComments.js'

// export const fetchAndRenderComments = () => {
//     return fetchComments()
//         .then(() => {
//             renderComments()
//         })
//         .catch((error) => {
//             alert('Ошибка загрузки комментариев: ' + error.message)
//         })
// }
