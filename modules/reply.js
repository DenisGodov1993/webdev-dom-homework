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
