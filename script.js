// рабочий для меня файл с кодом JS

// const commentEl = document.getElementById('comment') //в рендер функции и в лайках, в реплэй
// const nameEl = document.getElementById('name') // в сабмите
// const textareaEl = document.getElementById('textarea') // в сабмите, в реплей
// const writeEl = document.getElementById('write') // в сабмите

// const comments = [
//     //Добавьте в массив ключи, в которых будет храниться состояние лайка и их количество.
//     {
//         name: 'Глеб Фокин',
//         date: '12.02.22 12:18',
//         text: 'Это будет первый комментарий на этой странице',
//         likes: 3,
//         liked: false,
//     },
//     {
//         name: 'Варвара Н.',
//         date: '13.02.22 19:22',
//         text: 'Мне нравится как оформлена эта страница! ❤',
//         likes: 75,
//         liked: true,
//     },
// ]

// function clearHTML(signs) {
//     // заменяет в HTML небезопасные знаки на безопасные
//     return signs
//         .replaceAll('&', '&amp;')
//         .replaceAll('<', '&lt;')
//         .replaceAll('>', '&gt;')
//         .replaceAll('"', '&quot;')
//         .replaceAll("'", '&apos;')
// }

// function renderComments() {
//     commentEl.innerHTML = '' // очистили html код где id = comment

//     comments.forEach((comment, index) => {
//         const likeClass = comment.liked ? '-active-like' : '' // Класс для активного лайка
//         const newCommentHtml = `
//           <li class="comment">
//             <div class="comment-header">
//               <div>${comment.name}</div>
//               <div>${comment.date}</div>
//             </div>
//             <div class="comment-body">
//               <div class="comment-text">${comment.text}</div>
//             </div>
//             <div class="comment-footer">
//               <div class="likes">
//                 <span class="likes-counter">${comment.likes}</span>
//                 <button class="like-button ${likeClass}" data-index="${index}"></button>
//               </div>
//             </div>
//           </li>` //В разметке укажите необходимый класс для иконки лайка в зависимости от значения ключа в массиве.

//         commentEl.innerHTML += newCommentHtml // Добавление нового комментария в контейнер
//     })

//     attachLikeHandlers() // Привязка обработчиков событий к кнопкам лайков
// }

// function handleLikeClick(index) {
//     //В функции клика на лайк нужно менять значения ключей в массиве и после этого заново выполнять рендер всех комментариев.
//     comments[index].liked = !comments[index].liked // переключаем состояние лайка
//     comments[index].likes += comments[index].liked ? 1 : -1 // обновление количества лайков, если пользователь поставил лайк под комментарием
//     renderComments() // отображает изменения на странице
// }

// function attachLikeHandlers() {
//     const likeButtons = commentEl.querySelectorAll('.like-button') // все кнопки лайков
//     likeButtons.forEach((button) => {
//         button.addEventListener('click', (event) => {
//             event.stopPropagation() // запрещает, нажимая на лайк, цитировать уже написанный комментарий
//             const index = button.getAttribute('data-index') // индекс из атрибута data-index
//             handleLikeClick(index) // Обрабатываем клик по лайку
//         })
//     })
// }

// commentEl.addEventListener('click', (event) => {
//     // Проверяем, что клик был НЕ по лайку
//     if (event.target.closest('.like-button')) return

//     const commentElement = event.target.closest('.comment') // выбераем комментарий,на который хотим ответить
//     if (!commentElement) return // если кликаем не на комментарий, то выходим из функции

//     const index = [...commentEl.children].indexOf(commentElement) // всё li это массив, получаем коомментарий по которому кликнули
//     const comment = comments[index] // Получаем сам объект комментария из массива comments по индексу.
//     textareaEl.value = `> ${comment.name}: ${comment.text}\n- ` // Заполняем поле для комментария (textarea) текстом в формате цитаты: и перенос строки
// })

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

// renderComments() // Первоначальное отображение комментариев при загрузке страницы`

// б
// е
// з

// к
// о
// м
// м
// е
// н
// т
// а
// р
// и
// е
// в

// const commentEl = document.getElementById('comment')
// const nameEl = document.getElementById('name')
// const textareaEl = document.getElementById('textarea')
// const writeEl = document.getElementById('write')

// const comments = [
//     {
//         name: 'Глеб Фокин',
//         date: '12.02.22 12:18',
//         text: 'Это будет первый комментарий на этой странице',
//         likes: 3,
//         liked: false,
//     },
//     {
//         name: 'Варвара Н.',
//         date: '13.02.22 19:22',
//         text: 'Мне нравится как оформлена эта страница! ❤',
//         likes: 75,
//         liked: true,
//     },
// ]

// function clearHTML(signs) {
//     return signs
//         .replaceAll('&', '&amp;')
//         .replaceAll('<', '&lt;')
//         .replaceAll('>', '&gt;')
//         .replaceAll('"', '&quot;')
//         .replaceAll("'", '&apos;')
// }

// function renderComments() {
//     commentEl.innerHTML = ''

//     comments.forEach((comment, index) => {
//         const likeClass = comment.liked ? '-active-like' : ''
//         const newCommentHtml = `
//           <li class="comment">
//             <div class="comment-header">
//               <div>${comment.name}</div>
//               <div>${comment.date}</div>
//             </div>
//             <div class="comment-body">
//               <div class="comment-text">${comment.text}</div>
//             </div>
//             <div class="comment-footer">
//               <div class="likes">
//                 <span class="likes-counter">${comment.likes}</span>
//                 <button class="like-button ${likeClass}" data-index="${index}"></button>
//               </div>
//             </div>
//           </li>`

//         commentEl.innerHTML += newCommentHtml
//     })

//     attachLikeHandlers()
// }

// function handleLikeClick(index) {
//     comments[index].liked = !comments[index].liked
//     comments[index].likes += comments[index].liked ? 1 : -1
//     renderComments()
// }

// function attachLikeHandlers() {
//     const likeButtons = commentEl.querySelectorAll('.like-button')
//     likeButtons.forEach((button) => {
//         button.addEventListener('click', (event) => {
//             event.stopPropagation()
//             const index = button.getAttribute('data-index')
//             handleLikeClick(index)
//         })
//     })
// }

// commentEl.addEventListener('click', (event) => {
//     if (event.target.closest('.like-button')) return

//     const commentElement = event.target.closest('.comment')
//     if (!commentElement) return

//     const index = [...commentEl.children].indexOf(commentElement)
//     const comment = comments[index]
//     textareaEl.value = `> ${comment.name}: ${comment.text}\n- `
// })

// writeEl.addEventListener('click', () => {
//     if (!nameEl.value.trim() || !textareaEl.value.trim()) {
//         alert(
//             'Ошибка! Добавить комментарий возможно только при заполнении всех полей ввода!',
//         )
//         return
//     }

//     const currentDate = new Date()
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

//     nameEl.value = ''
//     textareaEl.value = ''

//     renderComments()
// })

// renderComments()
