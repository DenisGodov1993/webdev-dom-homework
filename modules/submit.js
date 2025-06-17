import { postComment } from './API.js'
import { fetchAndRenderComments } from './fetchAndRenderComments.js'
import { clearHTML } from './utils.js'

export const initSubmitHandler = () => {
    const textareaEl = document.getElementById('textarea')
    const buttonEl = document.getElementById('write')

    buttonEl.addEventListener('click', () => {
        const rawText = textareaEl.value.trim()
        if (!rawText) {
            alert('Комментарий не может быть пустым')
            return
        }

        buttonEl.disabled = true
        buttonEl.textContent = 'Комментарий добавляется...'

        const safeText = clearHTML(rawText)

        postComment({ text: safeText })
            .then(() => {
                textareaEl.value = ''
                return fetchAndRenderComments(true)
            })
            .catch((error) => {
                alert('Ошибка при добавлении комментария: ' + error.message)
            })
            .finally(() => {
                buttonEl.disabled = false
                buttonEl.textContent = 'Написать'
            })
    })
}
