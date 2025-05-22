import { clearHTML } from './utils.js'
import { renderComments } from './render.js'
import { updateComments } from './comments.js'

// Функция загрузки комментариев с сервера
function fetchComments() {
    return fetch('https://wedev-api.sky.pro/api/v1/denis-godov/comments')
        .then((response) => response.json())
        .then((data) => {
            const newComments = data.comments.map((item) => ({
                name: item.author.name,
                date: new Date(item.date)
                    .toLocaleString('ru-RU', {
                        year: '2-digit',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                    })
                    .replace(',', ''),
                text: item.text,
                likes: item.likes,
                liked: item.isLiked,
            }))
            updateComments(newComments)
            renderComments()
        })
}

// Отправка комментария на сервер
function postComment({ name, text }) {
    return fetch('https://wedev-api.sky.pro/api/v1/denis-godov/comments', {
        method: 'POST',
        body: JSON.stringify({ name, text }),
    }).then((response) => {
        return response.json()
    })
}

// Основная функция
export function initSubmitHandler() {
    const nameEl = document.getElementById('name')
    const textareaEl = document.getElementById('textarea')
    const writeEl = document.getElementById('write')

    writeEl.addEventListener('click', () => {
        const name = nameEl.value.trim()
        const text = textareaEl.value.trim()

        if (name.length < 3 || text.length < 3) {
            alert('Имя и комментарий должны содержать минимум 3 символа')
            return
        }

        writeEl.disabled = true
        writeEl.textContent = 'Комментарий добавляется...'

        postComment({
            name: clearHTML(name),
            text: clearHTML(text),
        })
            .then(() => {
                nameEl.value = ''
                textareaEl.value = ''
                return fetchComments()
            })
            .catch((error) => {
                alert(error.message)
            })
            .finally(() => {
                writeEl.disabled = false
                writeEl.textContent = 'Написать'
            })
    })
}

// import { clearHTML } from './utils.js'
// import { renderComments } from './render.js'
// import { updateComments } from './comments.js'

// // Функция загрузки комментариев с сервера
// function fetchComments() {
//     return fetch('https://wedev-api.sky.pro/api/v1/denis-godov/comments')
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
//         })
// }

// // Отправка комментария на сервер
// function postComment({ name, text }) {
//     return fetch('https://wedev-api.sky.pro/api/v1/denis-godov/comments', {
//         method: 'POST',
//         body: JSON.stringify({ name, text }),
//     }).then((response) => {
//         if (response.status === 400) {
//             return response.json().then((data) => {
//                 throw new Error(data.error)
//             })
//         }
//         if (!response.ok) {
//             throw new Error('Ошибка при отправке комментария')
//         }
//         return response.json()
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

//         if (name.length < 3 || text.length < 3) {
//             alert('Имя и комментарий должны содержать минимум 3 символа')
//             return
//         }

//         writeEl.disabled = true
//         writeEl.textContent = 'Отправка...'

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
//                 alert(error.message)
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
