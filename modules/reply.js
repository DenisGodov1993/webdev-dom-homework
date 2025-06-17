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

// код с комментариями:
// import { comments } from './comments.js' - содержит данные о комментариях. Каждый объект комментария включает информацию о тексте, авторе и других атрибутах.

// Функция handleCommentClick обрабатывает клики по комментариям и вставляет текст цитаты выбранного комментария в поле ввода (textarea).
// Это позволяет пользователю легко ответить на комментарий, просто кликнув по нему. Если клик был произведен по кнопке лайка, то эта
// часть функции игнорируется, чтобы не вызвать нежелательное поведение.

// export function handleCommentClick() {
//     const commentEl = document.getElementById('comment') - ищем DOM-элемент с ID comment, который, скорее всего, является контейнером, в котором отображаются все комментарии на странице.
// Этот элемент будет обрабатываться в дальнейшем для привязки обработчика событий.
//     const textareaEl = document.getElementById('textarea') - Получаем элемент <textarea>, который предназначен для ввода нового комментария или ответа на существующий комментарий.
// Это поле будет автоматически заполняться текстом цитаты комментария, если пользователь кликнет на комментарий.

//     commentEl.addEventListener('click', (event) => { - обработчик будет вызываться каждый раз, когда пользователь кликает на любой комментарий в контейнере.
//         if (event.target.closest('.like-button')) return - проверяем, был ли клик по кнопке лайка (элемент с классом .like-button). Если это так, то не продолжаем выполнение
// функции (возвращаемся сразу). Необходимо, чтобы избежать случайного перезаполнения текстового поля, если пользователь кликает на кнопку лайка.

//         const commentElement = event.target.closest('.comment')- ищем ближайший родительский элемент с классом .comment относительно элемента, по которому был совершен клик.
// Это нужно, чтобы убедиться, что клик был произведен по самому комментариям, а не по другим элементам внутри него (например, по кнопке лайка или другому вложенному элементу).
//         if (!commentElement) return - Если не удалось найти элемент с классом .comment (например, если клик был не по самому комментариям), то выходим из функции.
// Это предотвращает выполнение дальнейшего кода, если клик был сделан по нецелевому элементу.

// Получаем индекс элемента комментария среди всех дочерних элементов контейнера commentEl. Для этого:
// - Преобразуем commentEl.children в массив с помощью оператора [...array] (spread operator), чтобы можно было использовать метод .indexOf(),
// который возвращает индекс первого вхождения элемента в массив.
// - Находим, какой по порядку комментарий был кликнут.
//         const index = [...commentEl.children].indexOf(commentElement)

// Используем полученный индекс, чтобы выбрать соответствующий комментарий из массива comments. Этот комментарий теперь доступен
// в переменной comment, и мы можем работать с его данными (например, с его текстом и именем автора).
//         const comment = comments[index]

//         textareaEl.value = `> ${comment.name}: ${comment.text}\n- ` - Заполняем поле textareaEl (поле ввода комментария) текстом,
// который будет выглядеть как цитата выбранного комментария.
// Это позволяет пользователю легко ответить на комментарий, вставив его текст в поле ввода.
// Вставляем в поле следующее:
// - > ${comment.name}: ${comment.text} — имя автора комментария и его текст (в формате цитаты).
// - \n- — добавляем новую строку и тире, чтобы пользователь мог сразу продолжить писать свой ответ на этот комментарий.
//     })
// }

// СТАРЫЕ КОДА С ПРЕДЫДУЩИХ ДОМАШЕК
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
