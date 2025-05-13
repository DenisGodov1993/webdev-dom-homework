import { comments } from './comments.js'

export function handleCommentClick() {
    const commentEl = document.getElementById('comment')
    const textareaEl = document.getElementById('textarea')

    commentEl.addEventListener('click', (event) => {
        if (event.target.closest('.like-button')) return

        const commentElement = event.target.closest('.comment')
        if (!commentElement) return

        const index = [...commentEl.children].indexOf(commentElement)
        const comment = comments[index]
        textareaEl.value = `> ${comment.name}: ${comment.text}\n- `
    })
}

// function attachLikeHandlers() {
//     const likeButtons = commentEl.querySelectorAll('.like-button') // все кнопки лайков
//     likeButtons.forEach((button) => {
//         button.addEventListener('click', (event) => {
//             event.stopPropagation() // запрещает, нажимая на лайк, цитировать уже написанный комментарий

//             handleLikeClick(index) // Обрабатываем клик по лайку
//         })
//     })
// }

//     const index = [...commentEl.children].indexOf(commentElement) // всё li это массив, получаем коомментарий по которому кликнули
//     const comment = comments[index] // Получаем сам объект комментария из массива comments по индексу.
//     textareaEl.value = `> ${comment.name}: ${comment.text}\n- ` // Заполняем поле для комментария (textarea) текстом в формате цитаты: и перенос строки
// })
