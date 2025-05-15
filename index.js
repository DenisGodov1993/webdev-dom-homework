import { renderComments } from './modules/render.js' // визуализация, обработка, генерация, моделирование (рендеринг) комментариев
import { initLikeHandlers } from './modules/likes.js' // установка, активация, запуск и настройка (инициализация) работы лайков в комментариях
import { handleCommentClick } from './modules/reply.js' // обработчик (делать рукой, управлять, обращение) написания ответа (reply) на уже написанный комментарий
import { handleWriteClick } from './modules/submit.js' // обработчик (делать рукой, управлять, обращение) написания предлагаемого, создаваемого (submit) комментария

renderComments()
initLikeHandlers()
handleCommentClick()
handleWriteClick()
// index.js - файл с кодом js, файл входная точка, файл запуск проекта
