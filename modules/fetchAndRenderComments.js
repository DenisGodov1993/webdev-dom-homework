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
