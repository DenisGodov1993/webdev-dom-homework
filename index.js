// index.js - файл с кодом js, файл входная точка, файл запуск проекта
import { initLikeHandlers } from './modules/likes.js'
import { handleCommentClick } from './modules/reply.js'
import { renderComments } from './modules/render.js'
import { updateComments } from './modules/comments.js'
import { initSubmitHandler } from './modules/submit.js'

function fetchComments() {
    fetch('https://wedev-api.sky.pro/api/v1/denis-godov/comments')
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
            initLikeHandlers()
            handleCommentClick()
        })
}

fetchComments()

initSubmitHandler()

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
