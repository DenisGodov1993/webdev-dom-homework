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
