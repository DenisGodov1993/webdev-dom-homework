import { comments } from './comments.js'
import { clearHTML } from './utils.js'
import { renderComments } from './render.js'

export function handleWriteClick() {
    const nameEl = document.getElementById('name')
    const textareaEl = document.getElementById('textarea')
    const writeEl = document.getElementById('write')

    writeEl.addEventListener('click', () => {
        if (!nameEl.value.trim() || !textareaEl.value.trim()) {
            alert(
                'Ошибка! Добавить комментарий возможно только при заполнении всех полей ввода!',
            )
            return
        }

        const currentDate = new Date()
        const options = {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        }
        const dateString = currentDate
            .toLocaleString('ru-RU', options)
            .replace(',', '')

        comments.push({
            name: clearHTML(nameEl.value.trim()),
            date: dateString,
            text: clearHTML(textareaEl.value.trim()),
            likes: 0,
            liked: false,
        })

        nameEl.value = ''
        textareaEl.value = ''

        renderComments()
    })
}

// writeEl.addEventListener('click', () => {
//     if (!nameEl.value.trim() || !textareaEl.value.trim()) {
//         // Проверка заполненности полей ввода
//         alert(
//             'Ошибка! Добавить комментарий возможно только при заполнении всех полей ввода!',
//         )
//         return
//     }

//     const currentDate = new Date() // отображение текущей даты в необходимом формате
//     const options = {
//         year: '2-digit',
//         month: '2-digit',
//         day: '2-digit',
//         hour: '2-digit',
//         minute: '2-digit',
//     }
//     const dateString = currentDate
//         .toLocaleString('ru-RU', options)
//         .replace(',', '')

//     comments.push({
//         name: clearHTML(nameEl.value.trim()),
//         date: dateString,
//         text: clearHTML(textareaEl.value.trim()),
//         likes: 0,
//         liked: false,
//     })

//     // Очистка полей ввода
//     nameEl.value = ''
//     textareaEl.value = ''

//     renderComments() // Обновляем отображение комментариев на странице
// })
