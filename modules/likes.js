import { comments } from './comments.js'
import { renderComments } from './renderComments.js'
import { getToken } from './API.js'

export function initLikeHandlers() {
    const commentList = document.getElementById('comment')

    if (!commentList) return

    commentList.addEventListener('click', (event) => {
        const likeButton = event.target.closest('.like-button')

        if (!likeButton) return

        const index = Number(likeButton.dataset.index)

        const comment = comments[index]

        if (!comment || comment.isLikeLoading) return

        likeButton.classList.add('-loading-like')
        comment.isLikeLoading = true

        const url = `https://wedev-api.sky.pro/api/v2/denis-godov/comments/${comment.id}/toggle-like`

        fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Ошибка при лайке')
                }
                comment.liked = !comment.liked
                comment.likes += comment.liked ? 1 : -1
            })
            .catch(() => {
                alert('Произошла ошибка при попытке лайка.')
            })
            .finally(() => {
                likeButton.classList.remove('-loading-like')
                comment.isLikeLoading = false
                renderComments(true, comment.id) // Обновляем только этот комментарий
            })
    })
}
