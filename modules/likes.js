import { comments } from './comments.js'
import { renderComments } from './render.js'

export function initLikeHandlers() {
    const commentEl = document.getElementById('comment')

    commentEl.addEventListener('click', (event) => {
        const likeButton = event.target.closest('.like-button')
        if (!likeButton) return
        event.stopPropagation()

        const index = likeButton.getAttribute('data-index')
        comments[index].liked = !comments[index].liked
        comments[index].likes += comments[index].liked ? 1 : -1

        renderComments()
    })
}

// function handleLikeClick(index) {
//     //В функции клика на лайк нужно менять значения ключей в массиве и после этого заново выполнять рендер всех комментариев.
//     const index = button.getAttribute('data-index') // индекс из атрибута data-index
//     comments[index].liked = !comments[index].liked // переключаем состояние лайка
//     comments[index].likes += comments[index].liked ? 1 : -1 // обновление количества лайков, если пользователь поставил лайк под комментарием
//     renderComments() // отображает изменения на странице
// }

// commentEl.addEventListener('click', (event) => {
//     // Проверяем, что клик был НЕ по лайку
//     if (event.target.closest('.like-button')) return

//     const commentElement = event.target.closest('.comment') // выбераем комментарий,на который хотим ответить
//     if (!commentElement) return // если кликаем не на комментарий, то выходим из функции
