import { renderLogin } from './modules/renderLogin.js'
import { fetchAndRenderComments } from './modules/fetchAndRenderComments.js'
import { updateToken } from './modules/API.js'

const savedToken = localStorage.getItem('token')

if (savedToken) {
    updateToken(savedToken)
    fetchAndRenderComments(true) // пользователь авторизован
}

renderLogin()
fetchAndRenderComments(false)

// ОШИБКИ!!!!
// длинный комментарий выходит за поле
// при нажатии на лайк, сердце не качается в обе стороны
// любой зарегистрированный пользователь может удалить любой, даже не свой, комментарий
// ставится ещё один лайк даже, когда пользователь уже поставил лайк под комментарием

// код с комментариями:
// import { renderLogin } from './modules/renderLogin.js' функция, отвечающая за отображение формы входа пользователя (логина).
// import { fetchAndRenderComments } from './modules/fetchAndRenderComments.js'  функция, которая загружает и отображает комментарии с сервера.
// import { updateToken } from './modules/API.js'  функция, которая обновляет или устанавливает токен авторизации (сохраняет его в переменной, которая используется в HTTP-запросах).

// Из локального хранилища браузера (localStorage) берётся сохранённый токен с ключом 'token'.
// localStorage сохраняет данные между перезагрузками страниц, поэтому здесь проверяется, входил ли пользователь ранее.
// const savedToken = localStorage.getItem('token')

// Если токен найден, т.е. пользователь входил уже, уже был авторизован ранее, то:
// updateToken(savedToken) — передаёт токен в функцию, которая обновляет или устанавливает токен авторизации
// fetchAndRenderComments(true) — загружает и отображает комментарии, передавая флаг true, что указывает:
// - пользователь авторизован (можно показать дополнительные функции, например, возможность оставить комментарий или удалить).

// if (savedToken) {
//     updateToken(savedToken)
//     fetchAndRenderComments(true) // пользователь авторизован
// }

// renderLogin() вызывается функция, отвечающая за отображение формы входа пользователя (логина).
// fetchAndRenderComments(false) вызывается функция, которая загружает и отображает комментарии снова, но с флагом false,
// означающим, что пользователь не авторизован.

// п
// р
// о
// б
// е
// л

// СТАРЫЕ КОДА(Ы)
// import { renderLogin } from './modules/renderLogin.js'
// import { fetchAndRenderComments } from './modules/fetchAndRenderComments.js'
// import { updateToken } from './modules/API.js'

// const savedToken = localStorage.getItem('token')

// if (savedToken) {
//     updateToken(savedToken)
//     fetchAndRenderComments(true) // пользователь авторизован
// } else {
//     fetchAndRenderComments(false) // гость
// }

// renderLogin()
// fetchAndRenderComments(false)

// import { initToken, getToken } from './modules/API.js'
// import { renderLogin } from './modules/renderLogin.js'
// import { fetchAndRenderComments } from './modules/fetchAndRenderComments.js'
// import { renderCommentsReadOnly } from './modules/renderReadOnly.js'

// initToken()

// if (getToken()) {
//     fetchAndRenderComments()
// } else {
//     fetchAndRenderComments().then(() => {
//         renderCommentsReadOnly() // отрисовывает список и ссылку на вход
//     })
// }

// renderLogin()

// import { renderLogin } from './modules/renderLogin.js'

// renderLogin()

// последняя версия кода, домашка 7
// // index.js - файл с кодом js, файл входная точка, файл запуск проекта

// import { initLikeHandlers } from './modules/likes.js'
// import { handleCommentClick } from './modules/reply.js'
// import { renderComments } from './modules/render.js'
// import { updateComments } from './modules/comments.js'
// import { initSubmitHandler } from './modules/submit.js'

// const loadingMessage = document.getElementById('loading-message')
// let isLoading = false

// function fetchComments() {
//     // Показываем сообщение только один раз
//     if (!isLoading && loadingMessage) {
//         loadingMessage.textContent =
//             'Данные загружаются... Пожалуйста подождите!'
//         // loadingMessage.disabled = true не нужен, только при <button>, <input>, <textarea> нужен
//         isLoading = true // чтобы больше не показывать сообщение при следующих вызовах fetchComments()
//     }

//     fetch('https://wedev-api.sky.pro/api/v1/denis-godov/comments')
//         .then((response) => response.json())
//         .then((data) => {
//             if (loadingMessage) {
//                 loadingMessage.textContent = ''
//                 loadingMessage.disabled = false
//             }
//             const newComments = data.comments.map((item) => ({
//                 name: item.author.name,
//                 date: new Date(item.date)
//                     .toLocaleString('ru-RU', {
//                         year: '2-digit',
//                         month: '2-digit',
//                         day: '2-digit',
//                         hour: '2-digit',
//                         minute: '2-digit',
//                     })
//                     .replace(',', ''),
//                 text: item.text,
//                 likes: item.likes,
//                 liked: item.isLiked,
//             }))
//             updateComments(newComments)
//             renderComments()
//             initLikeHandlers()
//             handleCommentClick()
//         })
// }

// fetchComments()

// initSubmitHandler()

// import { initLikeHandlers } from './modules/likes.js'
// import { handleCommentClick } from './modules/reply.js'
// import { renderComments } from './modules/render.js'
// import { updateComments } from './modules/comments.js'
// import { initSubmitHandler } from './modules/submit.js'

// function fetchComments() {
//     fetch('https://wedev-api.sky.pro/api/v1/denis-godov/comments')
//         .then((response) => response.json())
//         .then((data) => {
//             const newComments = data.comments.map((item) => ({
//                 name: item.author.name,
//                 date: new Date(item.date)
//                     .toLocaleString('ru-RU', {
//                         year: '2-digit',
//                         month: '2-digit',
//                         day: '2-digit',
//                         hour: '2-digit',
//                         minute: '2-digit',
//                     })
//                     .replace(',', ''),
//                 text: item.text,
//                 likes: item.likes,
//                 liked: item.isLiked,
//             }))
//             updateComments(newComments)
//             renderComments()
//             initLikeHandlers()
//             handleCommentClick()
//         })
// }

// fetchComments()

// initSubmitHandler()

// import { initLikeHandlers } from './modules/likes.js'
// import { handleCommentClick } from './modules/reply.js'
// import { handleWriteClick } from './modules/submit.js'
// import { renderComments } from './modules/render.js'

// renderComments()
// initLikeHandlers()
// handleCommentClick()
// handleWriteClick()

// import { renderComments } from './modules/render.js' // визуализация, обработка, генерация, моделирование (рендеринг) комментариев
// import { initLikeHandlers } from './modules/likes.js' // установка, активация, запуск и настройка (инициализация) работы лайков в комментариях
// import { handleCommentClick } from './modules/reply.js' // обработчик (делать рукой, управлять, обращение) написания ответа (reply) на уже написанный комментарий
// import { handleWriteClick } from './modules/submit.js' // обработчик (делать рукой, управлять, обращение) написания предлагаемого, создаваемого (submit) комментария

// renderComments()
// initLikeHandlers()
// handleCommentClick()
// handleWriteClick()
