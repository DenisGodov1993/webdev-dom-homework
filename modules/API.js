let token = ''
let userName = ''

export const updateToken = (newToken, name) => {
    token = newToken
    userName = name
    localStorage.setItem('token', token)
    localStorage.setItem('userName', name)
}

export const initToken = () => {
    token = localStorage.getItem('token') || ''
    userName = localStorage.getItem('userName') || ''
}

export const getToken = () => token
export const getUser = () => userName

const host = 'https://wedev-api.sky.pro/api/v2/denis-godov/comments'
const authHost = 'https://wedev-api.sky.pro/api/user'

export const fetchComments = () => {
    return fetch(host, {
        method: 'GET',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Не удалось получить комментарии')
            }
            return response.json()
        })
        .then((data) => {
            if (!data || !data.comments) {
                throw new Error('Получены неверные данные комментариев')
            }
            const comments = data.comments.map((item) => ({
                id: item.id,
                name: item.author.name,
                date: new Date(item.date).toLocaleString('ru-RU', {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                }),
                text: item.text,
                likes: item.likes,
                liked: item.isLiked,
            }))

            return comments
        })
}

export const deleteComment = (id) => {
    return fetch(`${host}/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        if (!response.ok) throw new Error('Ошибка при удалении')
        return response.json()
    })
}

export const postComment = ({ text }) => {
    return fetch(host, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            // 'Content-Type': 'application/json', // Correct Content-Type
        },
        body: JSON.stringify({ text }), // Only send text
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Не удалось опубликовать комментарий')
        }
        return response.json()
    })
}

export const login = ({ login, password }) => {
    return fetch(`${authHost}/login`, {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json',
        // },
        body: JSON.stringify({ login, password }),
    }).then((response) => {
        if (!response.ok) throw new Error('Неверный логин или пароль')
        return response.json()
    })
}

export const registration = ({ name, login, password }) => {
    return fetch(authHost, {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json',
        // },
        body: JSON.stringify({ name, login, password }),
    }).then((response) => {
        if (!response.ok) throw new Error('Такой пользователь уже есть')
        return response.json()
    })
}

// с комментариями:
// let token = '' токен авторизации пользователя
// let userName = '' имя текущего пользователя.

// Функция для установки токена и имени пользователя, которая:
// - Сохраняет их в переменные token и userName.
// - Кэширует эти значения в localStorage, чтобы сохранялись между перезагрузками страницы.

// export const updateToken = (newToken, name) => {
//     token = newToken
//     userName = name
//     localStorage.setItem('token', token)
//     localStorage.setItem('userName', name)
// }

// Загружает токен и имя пользователя из localStorage, если они есть, и сохраняет в переменные.
// export const initToken = () => {
//     token = localStorage.getItem('token') || ''
//     userName = localStorage.getItem('userName') || ''
// }

// Функции для доступа к текущим значениям token и userName.
// export const getToken = () => token
// export const getUser = () => userName

//  Константы с адресами API:
// host — URL для работы с комментариями.
// authHost — URL для авторизации и регистрации пользователей.

// const host = 'https://wedev-api.sky.pro/api/v2/denis-godov/comments'
// const authHost = 'https://wedev-api.sky.pro/api/user'

// получение комментариев
// export const fetchComments = () => {
//     return fetch(host, {
//         method: 'GET',
//         headers: token ? { Authorization: `Bearer ${token}` } : {},
//     })
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error('Не удалось получить комментарии')
//             }
//             return response.json()
//         })
//         .then((data) => {
//             if (!data || !data.comments) {
//                 throw new Error('Получены неверные данные комментариев')
//             }
//             const comments = data.comments.map((item) => ({
//                 id: item.id,
//                 name: item.author.name,
//                 date: new Date(item.date).toLocaleString('ru-RU', {
//                     year: '2-digit',
//                     month: '2-digit',
//                     day: '2-digit',
//                     hour: '2-digit',
//                     minute: '2-digit',
//                 }),
//                 text: item.text,
//                 likes: item.likes,
//                 liked: item.isLiked,
//             }))

//             return comments
//         })
// }

// удаление комментариев
// export const deleteComment = (id) => {
//     return fetch(`${host}/${id}`, {
//         method: 'DELETE',
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     }).then((response) => {
//         if (!response.ok) throw new Error('Ошибка при удалении')
//         return response.json()
//     })
// }

// добавление нового коммениария
// export const postComment = ({ text }) => {
//     return fetch(host, {
//         method: 'POST',
//         headers: {
//             Authorization: `Bearer ${token}`,
//             // 'Content-Type': 'application/json', // Correct Content-Type
//         },
//         body: JSON.stringify({ text }), // Only send text
//     }).then((response) => {
//         if (!response.ok) {
//             throw new Error('Не удалось опубликовать комментарий')
//         }
//         return response.json()
//     })
// }

// вход на страничку войти или зарегистрироваться
// export const login = ({ login, password }) => {
//     return fetch(`${authHost}/login`, {
//         method: 'POST',
//         // headers: {
//         //     'Content-Type': 'application/json',
//         // },
//         body: JSON.stringify({ login, password }),
//     }).then((response) => {
//         if (!response.ok) throw new Error('Неверный логин или пароль')
//         return response.json()
//     })
// }

// вход на страничку зарегистрировать нового пользователя
// export const registration = ({ name, login, password }) => {
//     return fetch(authHost, {
//         method: 'POST',
//         // headers: {
//         //     'Content-Type': 'application/json',
//         // },
//         body: JSON.stringify({ name, login, password }),
//     }).then((response) => {
//         if (!response.ok) throw new Error('Такой пользователь уже есть')
//         return response.json()
//     })
// }

// СТАРЫЕ КОДЫ ИЗ ПРЕДЫДУЩИХ ДОМАШЕК
// import { renderComments } from './renderComments.js'
// import { updateComments } from './comments.js'

// const host = 'https://wedev-api.sky.pro/api/v2/denis-godov/comments'
// const authHost = 'https://wedev-api.sky.pro/api/user'

// let token = ''

// export const updateToken = (newToken) => {
//     token = newToken
//     localStorage.setItem('token', token)
// }

// export const initToken = () => {
//     const savedToken = localStorage.getItem('token')
//     if (savedToken) {
//         token = savedToken
//     }
// }

// export const getToken = () => token

// export function fetchComments() {
//     return fetch(host, {
//         method: 'GET',
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     })
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
//             return { comments: newComments }
//         })
// }

// export function postComment({ name, text }) {
//     return fetch(host, {
//         method: 'POST',
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ name, text, forceError: false }), // true — для текста ошибки 500, false
//     }).then((response) => {
//         return response.json()
//     })
// }

// export function login({ login, password }) {
//     return fetch(`${authHost}/login`, {
//         method: 'POST',
//         body: JSON.stringify({ login, password }),
//     }).then((response) => {
//         return response.json()
//     })
// }

// export function registration({ name, login, password }) {
//     return fetch(authHost, {
//         method: 'POST',
//         body: JSON.stringify({ name, login, password }),
//     }).then((response) => {
//         return response.json()
//     })
// }

// import { renderComments } from './renderComments.js'
// import { updateComments } from './comments.js'

// const host = 'https://wedev-api.sky.pro/api/v2/denis-godov/comments'
// const authHost = 'https://wedev-api.sky.pro/api/user'

// let token = ''

// export const updateToken = (newToken) => {
//     token = newToken
// }

// export function fetchComments() {
//     return fetch(host, {
//         method: 'GET',
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     })
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
//             return { comments: newComments }
//         })
// }

// export function postComment({ name, text }) {
//     return fetch(host, {
//         method: 'POST',
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ name, text, forceError: false }), // true — для текста ошибки 500, false
//     }).then((response) => {
//         return response.json()
//     })
// }

// export function login({ login, password }) {
//     return fetch(`${authHost}/login`, {
//         method: 'POST',
//         body: JSON.stringify({ login, password }),
//     }).then((response) => {
//         return response.json()
//     })
// }

// export function registration({ name, login, password }) {
//     return fetch(authHost, {
//         method: 'POST',
//         body: JSON.stringify({ name, login, password }),
//     }).then((response) => {
//         return response.json()
//     })
// }

// import { renderComments } from './renderComments.js'
// import { updateComments } from './comments.js'

// const host = 'https://wedev-api.sky.pro/api/v2/denis-godov/comments'
// const authHost = 'https://wedev-api.sky.pro/api/user'

// let token = ''

// export const updateToken = (newToken) => {
//     token = newToken
// }

// export function fetchComments() {
//     return fetch(host, {
//         method: 'GET',
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     })
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

// export function postComment({ text }) {
//     return fetch(host, {
//         method: 'POST',
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
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

// export function login({ login, password }) {
//     return fetch(`${authHost}/login`, {
//         method: 'POST',
//         body: JSON.stringify({ login, password }),
//     }).then((response) => {
//         return response.json()
//     })
// }

// export function registration({ name, login, password }) {
//     return fetch(authHost, {
//         method: 'POST',
//         body: JSON.stringify({ name, login, password }),
//     }).then((response) => {
//         return response.json()
//     })
// }

// import { renderComments } from './renderComments.js'
// import { updateComments } from './comments.js'

// const host = 'https://wedev-api.sky.pro/api/v2/denis-godov/comments'
// const authHost = 'https://wedev-api.sky.pro/api/user'

// let token = ''

// export const updateToken = (newToken) => {
//     token = newToken
// }

// export function fetchComments() {
//     return fetch(host, {
//         method: 'GET',
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     })
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error('Ошибка загрузки комментариев')
//             }
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
//             return newComments // <== возвращаем массив комментариев
//         })
// }

// export function postComment({ name, text }) {
//     return fetch(host, {
//         method: 'POST',
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ name, text }),
//     }).then((response) => {
//         if (response.status === 201) return response.json()
//         if (response.status === 400)
//             throw new Error(
//                 'Имя и комментарий должны быть не короче 3 символов',
//             )
//         if (response.status === 500)
//             throw new Error('Сервер сломался, попробуй позже')
//         throw new Error('Кажется, у вас сломался интернет, попробуйте позже')
//     })
// }

// export function login({ login, password }) {
//     return fetch(`${authHost}/login`, {
//         method: 'POST',
//         body: JSON.stringify({ login, password }),
//     }).then((response) => {
//         if (!response.ok) throw new Error('Ошибка авторизации')
//         return response.json()
//     })
// }

// export function registration({ name, login, password }) {
//     return fetch(authHost, {
//         method: 'POST',
//         body: JSON.stringify({ name, login, password }),
//     }).then((response) => {
//         if (!response.ok) throw new Error('Ошибка регистрации')
//         return response.json()
//     })
// }
