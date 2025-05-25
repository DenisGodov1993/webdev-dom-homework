import { clearHTML } from './utils.js'
import { renderComments } from './render.js'
import { updateComments } from './comments.js'

// Загрузка комментариев
function fetchComments() {
    return fetch('https://wedev-api.sky.pro/api/v1/denis-godov/comments')
        .then((response) => {
            return response.json()
        })
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
    // .catch(() => {
    //     alert('Кажется, у вас сломался интернет, попробуйте позже')
    // })
}

// POST-запрос // если изменить адрес https, будет ошибка 404
function postComment({ name, text }) {
    return fetch('https://wedev-api.sky.pro/api/v1/denis-godov/comments', {
        method: 'POST',
        body: JSON.stringify({ name, text, forceError: true }), // true — для текста ошибки 500, false
    }).then((response) => {
        if (response.status === 201) {
            return response.json()
        } else {
            if (response.status === 500) {
                throw new Error('Сервер сломался, попробуй позже')
            }
            if (response.status === 400) {
                throw new Error(
                    'Имя и комментарий должны быть не короче 3 символов',
                )
            }
        }
        throw new Error('Кажется, у вас сломался интернет, попробуйте позже')
    })
}

// Основная функция
export function initSubmitHandler() {
    const nameEl = document.getElementById('name')
    const textareaEl = document.getElementById('textarea')
    const writeEl = document.getElementById('write')

    function handlePostClick() {
        const name = nameEl.value.trim()
        const text = textareaEl.value.trim()

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
                if (error.message === 'Сервер сломался, попробуй позже') {
                    // Повторяем запрос сразу, без задержки и без вывода в консоль, setTimeout и console.warn лучше использовать
                    handlePostClick()
                } else if (
                    error.message ===
                    'Имя и комментарий должны быть не короче 3 символов'
                ) {
                    alert(error.message)
                } else {
                    alert('Кажется, у вас сломался интернет, попробуйте позже')
                }
            })
            .finally(() => {
                writeEl.disabled = false
                writeEl.textContent = 'Написать'
            })
    }

    writeEl.addEventListener('click', handlePostClick)
}

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
