import { postComment } from './API.js'
import { fetchAndRenderComments } from './fetchAndRenderComments.js'
import { clearHTML } from './utils.js'

export const initSubmitHandler = () => {
    const textareaEl = document.getElementById('textarea')
    const buttonEl = document.getElementById('write')

    buttonEl.addEventListener('click', () => {
        const rawText = textareaEl.value.trim()
        if (!rawText) {
            alert('Комментарий не может быть пустым')
            return
        }

        buttonEl.disabled = true
        buttonEl.textContent = 'Комментарий добавляется...'

        const safeText = clearHTML(rawText)

        postComment({ text: safeText })
            .then(() => {
                textareaEl.value = ''
                return fetchAndRenderComments(true)
            })
            .catch((error) => {
                alert('Ошибка при добавлении комментария: ' + error.message)
            })
            .finally(() => {
                buttonEl.disabled = false
                buttonEl.textContent = 'Написать'
            })
    })
}

// код с комментариями:
// import { postComment } from './API.js' - отправку нового комментария на сервер,
// postComment отправляет данные через HTTP-запрос (POST), чтобы добавить новый комментарий на сервере.
// import { clearHTML } from './utils.js' - функция, очищает текст от потенциально опасного HTML-кода ( которые могут быть использованы для XSS-атак).
// import { fetchAndRenderComments } from './fetchAndRenderComments.js' -  перезагрузка списка комментариев и их отображения на странице.

// обработчик события для кнопки отправки комментария, не принимает параметров и просто работает с элементами на странице.
// export const initSubmitHandler = () => {
//     const textareaEl = document.getElementById('textarea') - Находим элемент с id textarea, который представляет собой текстовое поле, куда пользователь вводит свой комментарий.
//     const buttonEl = document.getElementById('write') - Находим элемент с id write, который представляет собой кнопку отправки комментария.

// Добавляем обработчик события на кнопку. Когда пользователь нажмёт кнопку, сработает функция в колбэке.
//     buttonEl.addEventListener('click', () => {
//         const rawText = textareaEl.value.trim() - Получаем текст, который пользователь ввёл в текстовое поле.
// Метод .trim() убирает пробелы с начала и конца строки, чтобы избежать отправки пустых или "псевдопустых" комментариев.

// Проверяем, пустой ли комментарий (после удаления пробелов).
// Если комментарий пустой, показываем пользователю сообщение с помощью alert
// и выходим из функции, чтобы предотвратить отправку пустого комментария.
//         if (!rawText) {
//             alert('Комментарий не может быть пустым')
//             return
//         }

// Делаем кнопку неактивной, чтобы избежать многократных кликов во время отправки комментария
// и меняем текст на кнопке, чтобы пользователь знал, что комментарий сейчас добавляется
//         buttonEl.disabled = true
//         buttonEl.textContent = 'Комментарий добавляется...'

// Применяем функцию clearHTML к введённому тексту для того, чтобы удалить любой потенциально опасный HTML-код, если они были введены пользователем.
//         const safeText = clearHTML(rawText)

// Вызываем функцию postComment и передаём в неё объект с текстом комментария (safeText), который безопасен для отправки.
// postComment отправляет этот текст на сервер через fetch запрос
//         postComment({ text: safeText })
// если комментарий был успешно добавлен, очищаем текстовое поле после того, как комментарий успешно добавлен.
// Вызываем функцию fetchAndRenderComments, чтобы заново загрузить список комментариев с сервера и отобразить их на странице.
// Параметр true указывает, что пользователь авторизован (это влияет на отображение формы для добавления комментария).
//             .then(() => {
//                 textareaEl.value = ''
//                 return fetchAndRenderComments(true)
//             })
// иначе показываем пользователю сообщение об ошибке, если комментарий не удалось добавить
//             .catch((error) => {
//                 alert('Ошибка при добавлении комментария: ' + error.message)
//             })
// выполняем завершающие операции:
// - Включаем кнопку снова, чтобы пользователь мог отправить новый комментарий.
// - Восстанавливаем текст на кнопке на "Написать", чтобы пользователь видел, что процесс добавления комментария завершён.
//             .finally(() => {
//                 buttonEl.disabled = false
//                 buttonEl.textContent = 'Написать'
//             })
//     })
// }

// СТАРЫЕ КОДА С ПРЕДЫДУЩИХ ДОМАШЕК
// import { postComment, getUser } from './API.js'
// import { clearHTML } from './utils.js'
// import { fetchAndRenderComments } from './fetchAndRenderComments.js' // Import

// export const initSubmitHandler = () => {
//     // const nameEl = document.getElementById('name')
//     const textareaEl = document.getElementById('textarea')
//     const buttonEl = document.getElementById('write')
//     buttonEl.addEventListener('click', () => {
//         const rawText = textareaEl.value.trim()
//         if (!rawText) {
//             alert('Комментарий не может быть пустым')
//             return
//         }
//         buttonEl.disabled = true
//         buttonEl.textContent = 'Комментарий добавляется...'
//         const safeText = clearHTML(rawText)
//         postComment({ name: getUser(), text: safeText })
//             .then(() => {
//                 textareaEl.value = ''
//                 return fetchAndRenderComments(true) // Call fetchAndRenderComments
//             })
//             .catch(() => {
//                 alert('Ошибка при добавлении комментария')
//             })
//             .finally(() => {
//                 buttonEl.disabled = false
//                 buttonEl.textContent = 'Написать'
//             })
//     })
// }

// import { postComment, fetchComments, getUser } from './API.js'
// import { clearHTML } from './utils.js'

// export const initSubmitHandler = () => {
//     // const nameEl = document.getElementById('name')
//     const textareaEl = document.getElementById('textarea')
//     const buttonEl = document.getElementById('write')

//     buttonEl.addEventListener('click', () => {
//         const rawText = textareaEl.value.trim()
//         if (!rawText) {
//             alert('Комментарий не может быть пустым')
//             return
//         }

//         buttonEl.disabled = true
//         buttonEl.textContent = 'Комментарий добавляется...'

//         const safeText = clearHTML(rawText)

//         postComment({ name: getUser(), text: safeText })
//             .then(() => {
//                 textareaEl.value = ''
//                 return fetchComments()
//             })
//             .catch(() => {
//                 alert('Ошибка при добавлении комментария')
//             })
//             .finally(() => {
//                 buttonEl.disabled = false
//                 buttonEl.textContent = 'Написать'
//             })
//     })
// }

// import { postComment, fetchComments } from './API.js'
// import { clearHTML } from './utils.js'
// import { fetchAndRenderComments } from './fetchAndRenderComments.js'

// let submitHandlerInitialized = false

// export const initSubmitHandler = () => {
//     if (submitHandlerInitialized) return
//     submitHandlerInitialized = true

//     const textareaEl = document.getElementById('textarea')
//     const buttonEl = document.getElementById('write')

//     buttonEl.addEventListener('click', () => {
//         const rawText = textareaEl.value.trim()
//         if (!rawText) {
//             alert('Комментарий не может быть пустым')
//             return
//         }

//         buttonEl.disabled = true
//         buttonEl.textContent = 'Комментарий добавляется...'

//         const safeText = clearHTML(rawText)

//         postComment({ text: safeText }) // Send only text
//             .then(() => {
//                 textareaEl.value = ''
//                 return fetchAndRenderComments(true)
//             })
//             .catch((error) => {
//                 console.error('Ошибка при отправке комментария:', error)
//                 alert('Ошибка при добавлении комментария')
//             })
//             .finally(() => {
//                 buttonEl.disabled = false
//                 buttonEl.textContent = 'Написать'
//             })
//     })
// }

// export const clearSubmitHandler = () => {
//     const buttonEl = document.getElementById('write')
//     if (buttonEl) {
//         buttonEl.removeEventListener('click', () => {})
//     }
//     submitHandlerInitialized = false
// }

// import { fetchComments, postComment } from './API.js'
// import { clearHTML } from './utils.js'

// export function initSubmitHandler() {
//     const nameEl = document.getElementById('name')
//     const textareaEl = document.getElementById('textarea')
//     const buttonEl = document.getElementById('write')

//     function handlePostClick() {
//         const name = nameEl.value.trim()
//         const text = textareaEl.value.trim()

//         buttonEl.disabled = true
//         buttonEl.textContent = 'Комментарий добавляется...'

//         postComment({
//             name: clearHTML(name),
//             text: clearHTML(text),
//         })
//             .then(() => {
//                 nameEl.value = ''
//                 textareaEl.value = ''
//                 return fetchComments()
//             })
//             .catch((error) => {
//                 if (error.message === 'Сервер сломался, попробуй позже') {
//                     // Повторяем запрос сразу, без задержки и без вывода в консоль, setTimeout и console.warn лучше использовать
//                     handlePostClick()
//                 } else if (
//                     error.message ===
//                     'Имя и комментарий должны быть не короче 3 символов'
//                 ) {
//                     alert(error.message)
//                 } else {
//                     alert('Кажется, у вас сломался интернет, попробуйте позже')
//                 }
//             })
//             .finally(() => {
//                 buttonEl.disabled = false
//                 buttonEl.textContent = 'Написать'
//             })
//     }

//     buttonEl.addEventListener('click', handlePostClick)
// }

// import { fetchComments, postComment } from './API.js'
// import { clearHTML } from './utils.js'

// export function initSubmitHandler() {
//     const nameEl = document.getElementById('name')
//     const textareaEl = document.getElementById('textarea')
//     const buttonEl = document.getElementById('write')

//     function handlePostClick() {
//         const name = nameEl.value.trim()
//         const text = textareaEl.value.trim()

//         buttonEl.disabled = true
//         buttonEl.textContent = 'Комментарий добавляется...'

//         postComment({
//             name: clearHTML(name),
//             text: clearHTML(text),
//         })
//             .then(() => {
//                 nameEl.value = ''
//                 textareaEl.value = ''
//                 return fetchComments()
//             })
//             .catch((error) => {
//                 if (error.message === 'Сервер сломался, попробуй позже') {
//                     // Повторяем запрос сразу, без задержки и без вывода в консоль, setTimeout и console.warn лучше использовать
//                     handlePostClick()
//                 } else if (
//                     error.message ===
//                     'Имя и комментарий должны быть не короче 3 символов'
//                 ) {
//                     alert(error.message)
//                 } else {
//                     alert('Кажется, у вас сломался интернет, попробуйте позже')
//                 }
//             })
//             .finally(() => {
//                 buttonEl.disabled = false
//                 buttonEl.textContent = 'Написать'
//             })
//     }

//     buttonEl.addEventListener('click', handlePostClick)
// }

// import { clearHTML } from './utils.js'
// // import { renderComments } from './renderComments.js'
// // import { updateComments } from './comments.js'

// // // Загрузка комментариев
// // function fetchComments() {
// //     return fetch('https://wedev-api.sky.pro/api/v1/denis-godov/comments')
// //         .then((response) => {
// //             return response.json()
// //         })
// //         .then((data) => {
// //             const newComments = data.comments.map((item) => ({
// //                 name: item.author.name,
// //                 date: new Date(item.date)
// //                     .toLocaleString('ru-RU', {
// //                         year: '2-digit',
// //                         month: '2-digit',
// //                         day: '2-digit',
// //                         hour: '2-digit',
// //                         minute: '2-digit',
// //                     })
// //                     .replace(',', ''),
// //                 text: item.text,
// //                 likes: item.likes,
// //                 liked: item.isLiked,
// //             }))
// //             updateComments(newComments)
// //             renderComments()
// //         })
// //     // .catch(() => {
// //     //     alert('Кажется, у вас сломался интернет, попробуйте позже')
// //     // })
// // }

// // POST-запрос // если изменить адрес https, будет ошибка 404
// function postComment({ name, text }) {
//     return fetch('https://wedev-api.sky.pro/api/user', {
//         method: 'POST',
//         body: JSON.stringify({ name, text, forceError: false }), // true — для текста ошибки 500, false
//     }).then((response) => {
//         if (response.status === 201) {
//             return response.json()
//         } else {
//             if (response.status === 500) {
//                 throw new Error('Сервер сломался, попробуй позже')
//             }
//             if (response.status === 400) {
//                 throw new Error(
//                     'Имя и комментарий должны быть не короче 3 символов',
//                 )
//             }
//         }
//         throw new Error('Кажется, у вас сломался интернет, попробуйте позже')
//     })
// }

// // Основная функция
// export function initSubmitHandler() {
//     const nameEl = document.getElementById('name')
//     const textareaEl = document.getElementById('textarea')
//     const buttonEl = document.getElementById('write')

//     function handlePostClick() {
//         const name = nameEl.value.trim()
//         const text = textareaEl.value.trim()

//         buttonEl.disabled = true
//         buttonEl.textContent = 'Комментарий добавляется...'

//         postComment({
//             name: clearHTML(name),
//             text: clearHTML(text),
//         })
//             .then(() => {
//                 nameEl.value = ''
//                 textareaEl.value = ''
//                 // return fetchComments()
//             })

//             .catch((error) => {
//                 if (error.message === 'Сервер сломался, попробуй позже') {
//                     // Повторяем запрос сразу, без задержки и без вывода в консоль, setTimeout и console.warn лучше использовать
//                     handlePostClick()
//                 } else if (
//                     error.message ===
//                     'Имя и комментарий должны быть не короче 3 символов'
//                 ) {
//                     alert(error.message)
//                 } else {
//                     alert('Кажется, у вас сломался интернет, попробуйте позже')
//                 }
//             })
//             .finally(() => {
//                 buttonEl.disabled = false
//                 buttonEl.textContent = 'Написать'
//             })
//     }

//     buttonEl.addEventListener('click', handlePostClick)
// }

// import { comments } from './comments.js'
// import { renderComments } from './renderComments.js'

// export function initSubmitHandler() {
//     const buttonEl = document.getElementById('button')
//     const textAreaEl = document.getElementById('textarea')

//     buttonEl.addEventListener('click', () => {
//         if (textAreaEl.value.trim() === '') {
//             return
//         }

//         comments.push({
//             name: document.getElementById('name').value,
//             date: new Date().toLocaleString(),
//             text: textAreaEl.value,
//             likes: 0,
//             liked: false,
//         })

//         renderComments()
//     })
// }

// import { clearHTML } from './utils.js'
// import { fetchComments, postComment } from './API.js'

// export function initSubmitHandler() {
//     const nameEl = document.getElementById('name')
//     const textareaEl = document.getElementById('textarea')
//     const buttonEl = document.getElementById('button')

//     function handlePostClick() {
//         const name = nameEl.value.trim()
//         const text = textareaEl.value.trim()

//         buttonEl.disabled = true
//         buttonEl.textContent = 'Комментарий добавляется...'

//         postComment({
//             name: clearHTML(name),
//             text: clearHTML(text),
//         })
//             .then(() => {
//                 nameEl.value = ''
//                 textareaEl.value = ''
//                 return fetchComments()
//             })

//             .catch((error) => {
//                 if (error.message === 'Сервер сломался, попробуй позже') {
//                     // Повторяем запрос сразу, без задержки и без вывода в консоль, setTimeout и console.warn лучше использовать
//                     handlePostClick()
//                 } else if (
//                     error.message ===
//                     'Имя и комментарий должны быть не короче 3 символов'
//                 ) {
//                     alert(error.message)
//                 } else {
//                     alert('Кажется, у вас сломался интернет, попробуйте позже')
//                 }
//             })
//             .finally(() => {
//                 buttonEl.disabled = false
//                 buttonEl.textContent = 'Написать'
//             })
//     }

//     buttonEl.addEventListener('click', handlePostClick)
// }

// последняя версия кода домашка 7
// import { clearHTML } from './utils.js'
// import { renderComments } from './render.js'
// import { updateComments } from './comments.js'

// // Загрузка комментариев
// function fetchComments() {
//     return fetch('https://wedev-api.sky.pro/api/v1/denis-godov/comments')
//         .then((response) => {
//             return response.json()
//         })
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
//         })
//     // .catch(() => {
//     //     alert('Кажется, у вас сломался интернет, попробуйте позже')
//     // })
// }

// // POST-запрос // если изменить адрес https, будет ошибка 404
// function postComment({ name, text }) {
//     return fetch('https://wedev-api.sky.pro/api/v1/denis-godov/comments', {
//         method: 'POST',
//         body: JSON.stringify({ name, text, forceError: false }), // true — для текста ошибки 500, false
//     }).then((response) => {
//         if (response.status === 201) {
//             return response.json()
//         } else {
//             if (response.status === 500) {
//                 throw new Error('Сервер сломался, попробуй позже')
//             }
//             if (response.status === 400) {
//                 throw new Error(
//                     'Имя и комментарий должны быть не короче 3 символов',
//                 )
//             }
//         }
//         throw new Error('Кажется, у вас сломался интернет, попробуйте позже')
//     })
// }

// // Основная функция
// export function initSubmitHandler() {
//     const nameEl = document.getElementById('name')
//     const textareaEl = document.getElementById('textarea')
//     const writeEl = document.getElementById('write')

//     function handlePostClick() {
//         const name = nameEl.value.trim()
//         const text = textareaEl.value.trim()

//         writeEl.disabled = true
//         writeEl.textContent = 'Комментарий добавляется...'

//         postComment({
//             name: clearHTML(name),
//             text: clearHTML(text),
//         })
//             .then(() => {
//                 nameEl.value = ''
//                 textareaEl.value = ''
//                 return fetchComments()
//             })

//             .catch((error) => {
//                 if (error.message === 'Сервер сломался, попробуй позже') {
//                     // Повторяем запрос сразу, без задержки и без вывода в консоль, setTimeout и console.warn лучше использовать
//                     handlePostClick()
//                 } else if (
//                     error.message ===
//                     'Имя и комментарий должны быть не короче 3 символов'
//                 ) {
//                     alert(error.message)
//                 } else {
//                     alert('Кажется, у вас сломался интернет, попробуйте позже')
//                 }
//             })
//             .finally(() => {
//                 writeEl.disabled = false
//                 writeEl.textContent = 'Написать'
//             })
//     }

//     writeEl.addEventListener('click', handlePostClick)
// }

// код без дополнительного задания
// import { clearHTML } from './utils.js'
// import { renderComments } from './render.js'
// import { updateComments } from './comments.js'

// // Загрузка комментариев
// function fetchComments() {
//     return fetch('https://wedev-api.sky.pro/api/v1/denis-godov/comments')
//         .then((response) => {
//             return response.json()
//         })
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
//         })
// }

// // POST-запрос
// function postComment({ name, text }) {
//     return fetch('https://wedev-api.sky.pro/api/v1/denis-godov/comments', {
//         method: 'POST',
//         body: JSON.stringify({ name, text, forceError: true }), // true — для теста ошибки 500, false
//     }).then((response) => {
//         if (response.status === 201) {
//             return response.json()
//         } else {
//             if (response.status === 500) {
//                 throw new Error('Сервер сломался, попробуй позже')
//             }
//             if (response.status === 400) {
//                 throw new Error(
//                     'Имя и комментарий должны быть не короче 3 символов',
//                 )
//             }
//         }
//         throw new Error('Кажется, у вас сломался интернет, попробуйте позже')
//     })
// }

// // Основная функция
// export function initSubmitHandler() {
//     const nameEl = document.getElementById('name')
//     const textareaEl = document.getElementById('textarea')
//     const writeEl = document.getElementById('write')

//     writeEl.addEventListener('click', () => {
//         const name = nameEl.value.trim()
//         const text = textareaEl.value.trim()

//         writeEl.disabled = true
//         writeEl.textContent = 'Комментарий добавляется...'

//         postComment({
//             name: clearHTML(name),
//             text: clearHTML(text),
//         })
//             .then(() => {
//                 nameEl.value = ''
//                 textareaEl.value = ''
//                 return fetchComments()
//             })

//             .catch((error) => {
//                 if (
//                     error.message === 'Сервер сломался, попробуй позже' ||
//                     error.message ===
//                         'Имя и комментарий должны быть не короче 3 символов'
//                 ) {
//                     alert(error.message)
//                 } else {
//                     alert('Кажется, у вас сломался интернет, попробуйте позже')
//                 }
//             })
//             .finally(() => {
//                 writeEl.disabled = false
//                 writeEl.textContent = 'Написать'
//             })
//     })
// }

// import { comments } from './comments.js'
// import { clearHTML } from './utils.js'
// import { renderComments } from './render.js'

// export function handleWriteClick() {
//     const nameEl = document.getElementById('name')
//     const textareaEl = document.getElementById('textarea')
//     const writeEl = document.getElementById('write')

//     writeEl.addEventListener('click', () => {
//         if (!nameEl.value.trim() || !textareaEl.value.trim()) {
//             alert(
//                 'Ошибка! Добавить комментарий возможно только при заполнении всех полей ввода!',
//             )
//             return
//         }

//         const currentDate = new Date()
//         const options = {
//             year: '2-digit',
//             month: '2-digit',
//             day: '2-digit',
//             hour: '2-digit',
//             minute: '2-digit',
//         }
//         const dateString = currentDate
//             .toLocaleString('ru-RU', options)
//             .replace(',', '')

//         comments.push({
//             name: clearHTML(nameEl.value.trim()),
//             date: dateString,
//             text: clearHTML(textareaEl.value.trim()),
//             likes: 0,
//             liked: false,
//         })

//         nameEl.value = ''
//         textareaEl.value = ''

//         renderComments()
//     })
// }

// с комментариями, что было изначально, без модулей
// writeEl.addEventListener('click', () => {
//     if (!nameEl.value.trim() || !textareaEl.value.trim()) {
//         // Проверка заполненности полей ввода
//         alert(
//             'Ошибка! Добавить комментарий возможно только при заполнении всех полей ввода!',
//         )
//         return
//     }

//     const currentDate = new Date() // отображение текущей даты в необходимом формате
//     const options = {
//         year: '2-digit',
//         month: '2-digit',
//         day: '2-digit',
//         hour: '2-digit',
//         minute: '2-digit',
//     }
//     const dateString = currentDate
//         .toLocaleString('ru-RU', options)
//         .replace(',', '')

//     comments.push({
//         name: clearHTML(nameEl.value.trim()),
//         date: dateString,
//         text: clearHTML(textareaEl.value.trim()),
//         likes: 0,
//         liked: false,
//     })

//     // Очистка полей ввода
//     nameEl.value = ''
//     textareaEl.value = ''

//     renderComments() // Обновляем отображение комментариев на странице
// })

// // Отправка комментария на сервер
// function postComment({ name, text }) {
//     return fetch('https://wedev-api.sky.pro/api/v1/denis-godov/comments', {
//         method: 'POST',
//         body: JSON.stringify({ name, text }),
//     }).then((response) => {
//         return response.json()
//     })
// }
