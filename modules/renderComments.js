import { comments } from './comments.js'
import { initSubmitHandler } from './submit.js'
import { initLikeHandlers } from './likes.js'
import { handleCommentClick } from './reply.js'
import { renderLogin } from './renderLogin.js'
import { getUser, deleteComment } from './API.js'
import { fetchAndRenderComments } from './fetchAndRenderComments.js'

export function renderComments(isAuthorized) {
    const app = document.getElementById('app')

    app.innerHTML = ''

    const commentsHtml = comments
        .map((comment, index) => {
            const likeClass = comment.liked ? '-active-like' : ''
            const loadingClass = comment.isLikeLoading ? '-loading-like' : ''
            return `
                <li class="comment">
                  <div class="comment-header">
                    <div>${comment.name}</div>
                    <div>${comment.date}</div>
                  </div>
                  <div class="comment-body">
                    <div class="comment-text">${comment.text}</div>
                  </div>
                  <div class="comment-footer">
                    <div class="add-form-delete">
                      <button class="add-form-delete-btn" data-id="${comment.id}">Удалить</button>
                    </div>
                    <div class="likes">
                      <span class="likes-counter">${comment.likes}</span>
                      <button class="like-button ${likeClass} ${loadingClass}" data-index="${index}"></button>
                    </div>
                  </div>
                </li>`
        })
        .join('')

    const authHtml = `
        <div class="auth-info">
            <p style="color:white;">Чтобы добавить комментарий, <a href="#" id="go-to-login">авторизуйтесь</a>.</p>
        </div>`

    const formHtml = `
      <div class="add-form">
        <input
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
          id="name"
          readonly
          value="${getUser()}"
        />
        <textarea
          class="add-form-text"
          placeholder="Введите ваш комментарий"
          rows="4"
          id="textarea"
        ></textarea>
        <div class="add-form-row">
          <button class="add-form-button" id="write">Написать</button>
        </div>
      </div>`

    app.innerHTML = `
      <div class="container">
        <ul class="comments" id="comment">${commentsHtml}</ul>
        ${isAuthorized ? formHtml : authHtml}
      </div>`

    if (isAuthorized) {
        initSubmitHandler()
        initLikeHandlers()
        handleCommentClick()
        initDeleteHandlers()
    } else {
        document
            .getElementById('go-to-login')
            .addEventListener('click', (e) => {
                e.preventDefault()
                renderLogin()
            })
    }
}

function initDeleteHandlers() {
    document.querySelectorAll('.add-form-delete-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id
            if (!id) return

            btn.disabled = true
            btn.textContent = 'Удаление...'

            deleteComment(id)
                .then(() => {
                    // Обновляем список комментариев после успешного удаления
                    fetchAndRenderComments(true)
                })
                .catch((error) => {
                    alert('Ошибка при удалении: ' + error.message)
                })
                .finally(() => {
                    btn.disabled = false
                    btn.textContent = 'Удалить'
                })
        })
    })
}

// код с комментариями:
// import { comments } from './comments.js' - список комментариев (заглушка данных, в виде массива).
// import { initSubmitHandler } from './submit.js' - инициализация обработчика для отправки комментариев.
// import { initLikeHandlers } from './likes.js' - обработка лайков на комментариях.
// import { handleCommentClick } from './reply.js' - обработчик клика по каждому комментарию (для ответа или редактирования).
// import { renderLogin } from './renderLogin.js' - отображение формы логина, если пользователь не авторизован.
// import { getUser, deleteComment } from './API.js' - getUser — получение имени текущего пользователя,
// deleteComment — функция для удаления комментариев.
// import { fetchAndRenderComments } from './fetchAndRenderComments.js' - загрузка и перерисовка комментариев с API.

// Функция renderComments отвечает за отрисовку комментариев на странице,
// принимает один параметр isAuthorized, который определяет, авторизован ли пользователь.
// export function renderComments(isAuthorized) {

// Получаем ссылку на DOM-элемент с id="app" и очищаем его содержимое. Место, где будет отображаться весь контент.
//     const app = document.getElementById('app')
//     app.innerHTML = ''

// Маппинг (mapping) (сопоставление полей данных между разными базами данных, системами или форматами данных для обеспечения их интеграции и совместимости)
// массива comments:
// - Для каждого комментария генерируется HTML-код.
// - В зависимости от состояния лайка (liked), добавляется класс -active-like.
// - Если лайк в процессе загрузки, добавляется класс -loading-like.
// - Для каждого комментария создается структура с:
// - comment-header (имя и дата комментария),
// - comment-body (текст комментария),
// - comment-footer (кнопка удаления и кнопка лайка).
// После этого весь массив комментариев преобразуется в строку HTML с помощью .join('').

//     const commentsHtml = comments
//         .map((comment, index) => {
//             const likeClass = comment.liked ? '-active-like' : ''
//             const loadingClass = comment.isLikeLoading ? '-loading-like' : ''
//             return `
//                 <li class="comment">
//                   <div class="comment-header">
//                     <div>${comment.name}</div>
//                     <div>${comment.date}</div>
//                   </div>
//                   <div class="comment-body">
//                     <div class="comment-text">${comment.text}</div>
//                   </div>
//                   <div class="comment-footer">
//                     <div class="add-form-delete">
//                       <button class="add-form-delete-btn" data-id="${comment.id}">Удалить</button>
//                     </div>
//                     <div class="likes">
//                       <span class="likes-counter">${comment.likes}</span>
//                       <button class="like-button ${likeClass} ${loadingClass}" data-index="${index}"></button>
//                     </div>
//                   </div>
//                 </li>`
//         })
//         .join('')

//  Если пользователь не авторизован, показываем HTML с просьбой авторизоваться, добавляя ссылку на страницу логина.
//     const authHtml = `
//         <div class="auth-info">
//             <p style="color:white;">Чтобы добавить комментарий, <a href="#" id="go-to-login">авторизуйтесь</a>.</p>
//         </div>`

// Если пользователь авторизован, показываем форму для добавления комментария, где:
// - Поле для имени, которое заполняется значением, полученным из getUser(), а для запрета изменения имени используем атрибутом readonly.
// - Поле для ввода текста комментария.
// - Кнопка для отправки комментария.

//     const formHtml = `
//       <div class="add-form">
//         <input
//           type="text"
//           class="add-form-name"
//           placeholder="Введите ваше имя"
//           id="name"
//           readonly
//           value="${getUser()}"
//         />
//         <textarea
//           class="add-form-text"
//           placeholder="Введите ваш комментарий"
//           rows="4"
//           id="textarea"
//         ></textarea>
//         <div class="add-form-row">
//           <button class="add-form-button" id="write">Написать</button>
//         </div>
//       </div>`

// Генерируем финальный HTML:
// - Вставляем список комментариев (commentsHtml).
// - Вставляем либо форму для ввода комментариев (formHtml), если пользователь авторизован, либо сообщение с ссылкой на авторизацию (authHtml).

//     app.innerHTML = `
//       <div class="container">
//         <ul class="comments" id="comment">${commentsHtml}</ul>
//         ${isAuthorized ? formHtml : authHtml}
//       </div>`

// Если пользователь авторизован:
// то инициализируются (т.е. готовы к использованию) обработчики:
// - initSubmitHandler() — обработка отправки нового комментария.
// - initLikeHandlers() — обработка лайков для комментариев.
// - handleCommentClick() — обработка кликов по комментариям.
// - initDeleteHandlers() — обработка удаления комментариев.

//     if (isAuthorized) {
//         initSubmitHandler()
//         initLikeHandlers()
//         handleCommentClick()
//         initDeleteHandlers()
//     } else { // Если пользователь не авторизован, при клике на ссылку "авторизуйтесь" вызывается функция renderLogin(), которая отобразит форму входа.
//         document
//             .getElementById('go-to-login')
//             .addEventListener('click', (e) => {
//                 e.preventDefault()
//                 renderLogin()
//             })
//     }
// }

// Функция initDeleteHandlers:
// - Назначает обработчики на все кнопки удаления комментариев.
// - При клике блокирует кнопку, меняет текст на "Удаление...", вызывает функцию для удаления комментария.
// - После успешного удаления обновляет комментарии, а в случае ошибки — выводит сообщение об ошибке.
// - В конечном итоге восстанавливает доступность кнопки и её исходный текст.

// function initDeleteHandlers() {
//     document.querySelectorAll('.add-form-delete-btn').forEach((btn) => {
//         btn.addEventListener('click', () => {
//             const id = btn.dataset.id;
//             if (!id) return;

//             btn.disabled = true;
//             btn.textContent = 'Удаление...';

//             deleteComment(id)
//                 .then(() => {
//                     // Обновляем список комментариев после успешного удаления
//                     fetchAndRenderComments(true);
//                 })
//                 .catch((error) => {
//                     alert('Ошибка при удалении: ' + error.message);
//                 })
//                 .finally(() => {
//                     btn.disabled = false;
//                     btn.textContent = 'Удалить';
//                 });
//         });
//     });
// }

// СТАРЫЕ КОДА С ПРЕДЫДУЩИХ ДОМАШЕК
// import { comments } from './comments.js'
// import { initSubmitHandler } from './submit.js'
// import { initLikeHandlers } from './likes.js'
// import { handleCommentClick } from './reply.js'
// import { renderLogin } from './renderLogin.js'
// import { getUser, deleteComment } from './API.js'
// import { fetchAndRenderComments } from './fetchAndRenderComments.js'

// export function renderComments(isAuthorized) {
//     const app = document.getElementById('app')
//     app.innerHTML = ''

//     const commentsHtml = comments
//         .map((comment, index) => {
//             const likeClass = comment.liked ? '-active-like' : ''
//             const loadingClass = comment.isLikeLoading ? '-loading-like' : ''
//             return `
//                 <li class="comment">
//                   <div class="comment-header">
//                     <div>${comment.name}</div>
//                     <div>${comment.date}</div>
//                   </div>
//                   <div class="comment-body">
//                     <div class="comment-text">${comment.text}</div>
//                   </div>
//                   <div class="comment-footer">
//                     <div class="add-form-delete">
//                       <button class="add-form-delete-btn" data-id="${comment.id}">Удалить</button>
//                     </div>
//                     <div class="likes">
//                       <span class="likes-counter">${comment.likes}</span>
//                       <button class="like-button ${likeClass} ${loadingClass}" data-index="${index}"></button>
//                     </div>
//                   </div>
//                 </li>`
//         })
//         .join('')

//     const authHtml = `
//         <div class="auth-info">
//             <p style="color:white;">Чтобы добавить комментарий, <a href="#" id="go-to-login">авторизуйтесь</a>.</p>
//         </div>`

//     const formHtml = `
//       <div class="add-form">
//         <input
//           type="text"
//           class="add-form-name"
//           placeholder="Введите ваше имя"
//           id="name"
//           readonly
//           value="${getUser()}"
//         />
//         <textarea
//           class="add-form-text"
//           placeholder="Введите ваш комментарий"
//           rows="4"
//           id="textarea"
//         ></textarea>
//         <div class="add-form-row">
//           <button class="add-form-button" id="write">Написать</button>
//         </div>
//       </div>`

//     app.innerHTML = `
//       <div class="container">
//         <ul class="comments" id="comment">${commentsHtml}</ul>
//         ${isAuthorized ? formHtml : authHtml}
//       </div>`

//     if (isAuthorized) {
//         initSubmitHandler()
//         initLikeHandlers()
//         handleCommentClick()
//         initDeleteHandlers()
//     } else {
//         document
//             .getElementById('go-to-login')
//             .addEventListener('click', (e) => {
//                 e.preventDefault()
//                 renderLogin()
//             })
//     }
// }

// function initDeleteHandlers() {
//     document.querySelectorAll('.add-form-delete-btn').forEach((btn) => {
//         btn.addEventListener('click', async () => {
//             const id = btn.dataset.id
//             if (!id) return
//             btn.disabled = true
//             btn.textContent = 'Удаление...'
//             try {
//                 const res = await deleteComment(id)
//                 if (res.result === 'ok') {
//                     fetchAndRenderComments(true)
//                 }
//             } catch {
//                 alert('Ошибка при удалении')
//             }
//         })
//     })
// }

// import { comments } from './comments.js'
// import { initSubmitHandler } from './submit.js'
// import { initLikeHandlers } from './likes.js'
// import { handleCommentClick } from './reply.js'
// import { renderLogin } from './renderLogin.js'

// export function renderComments(isAuthorized) {
//     const app = document.getElementById('app')
//     app.innerHTML = ''

//     const commentsHtml = comments
//         .map((comment, index) => {
//             const likeClass = comment.liked ? '-active-like' : ''
//             const loadingClass = comment.isLikeLoading ? '-loading-like' : ''

//             return `
//         <li class="comment">
//           <div class="comment-header">
//             <div>${comment.name}</div>
//             <div>${comment.date}</div>
//           </div>
//           <div class="comment-body">
//             <div class="comment-text">${comment.text}</div>
//           </div>
//           <div class="comment-footer">
//             <div class="likes">
//               <span class="likes-counter">${comment.likes}</span>
//               <button
//                 class="like-button ${likeClass} ${loadingClass}"
//                 data-index="${index}"
//                 ${comment.isLikeLoading ? 'disabled' : ''}>
//               </button>
//             </div>
//           </div>
//         </li>`
//         })
//         .join('')

//     const authHtml = `
//         <div class="auth-info">
//             <p style="color:white;">Чтобы добавить комментарий, <a href="#" id="go-to-login">авторизуйтесь</a>.</p>
//         </div>
//     `

//     const formHtml = `
//       <div class="add-form">
//         <input
//           type="text"
//           class="add-form-name"
//           placeholder="Введите ваше имя"
//           id="name"
//         />
//         <textarea
//           type="textarea"
//           class="add-form-text"
//           placeholder="Введите ваш комментарий"
//           rows="4"
//           id="textarea"
//         ></textarea>
//         <div class="add-form-row">
//           <button class="add-form-button" id="write">Написать</button>
//         </div>
//       </div>
//     `

//     const appHtml = `
//     <div class="container">
//       <span id="loading-message" style="color: #ffffff; margin: 32px;"></span>
//       <ul class="comments" id="comment">
//         ${commentsHtml}
//       </ul>
//       ${isAuthorized ? formHtml : authHtml}
//       </div>
//     `

//     app.innerHTML = appHtml

//     if (isAuthorized) {
//         initSubmitHandler()
//         initLikeHandlers()
//         handleCommentClick()
//     } else {
//         document
//             .getElementById('go-to-login')
//             .addEventListener('click', (e) => {
//                 e.preventDefault()
//                 renderLogin()
//             })
//     }
// }

// import { comments } from './comments.js'
// import { initSubmitHandler } from './submit.js'
// import { initLikeHandlers } from './likes.js'
// import { handleCommentClick } from './reply.js'

// export function renderComments() {
//     const app = document.getElementById('app')
//     app.innerHTML = ''

//     const commentsHtml = comments
//         .map((comment, index) => {
//             const likeClass = comment.liked ? '-active-like' : ''
//             const loadingClass = comment.isLikeLoading ? '-loading-like' : ''

//             return `
//         <li class="comment">
//           <div class="comment-header">
//             <div>${comment.name}</div>
//             <div>${comment.date}</div>
//           </div>
//           <div class="comment-body">
//             <div class="comment-text">${comment.text}</div>
//           </div>
//           <div class="comment-footer">
//             <div class="likes">
//               <span class="likes-counter">${comment.likes}</span>
//               <button
//                 class="like-button ${likeClass} ${loadingClass}"
//                 data-index="${index}"
//                 ${comment.isLikeLoading ? 'disabled' : ''}>
//               </button>
//             </div>
//           </div>
//         </li>`
//         })
//         .join('')

//     const appHtml = `
//     <div class="container">
//       <span id="loading-message" style="color: #ffffff; margin: 32px;"></span>
//       <ul class="comments" id="comment">
//         ${commentsHtml}
//       </ul>
//       <div class="add-form">
//         <input
//           type="text"
//           class="add-form-name"
//           placeholder="Введите ваше имя"
//           id="name"
//         />
//         <textarea
//           type="textarea"
//           class="add-form-text"
//           placeholder="Введите ваш комментарий"
//           rows="4"
//           id="textarea"
//         ></textarea>
//         <div class="add-form-row">
//           <button class="add-form-button" id="write">Написать</button>
//         </div>
//       </div>
//     </div>
//   `

//     app.innerHTML = appHtml

//     initSubmitHandler()
//     initLikeHandlers()
//     handleCommentClick()
// }

// старый код 7 домашки
// import { comments } from './comments.js'

// export function renderComments() {
//     const commentEl = document.getElementById('comment')
//     commentEl.innerHTML = ''

//     comments.forEach((comment, index) => {
//         const likeClass = comment.liked ? '-active-like' : ''
//         const loadingClass = comment.isLikeLoading ? '-loading-like' : '' //Если идёт "загрузка лайка" (comment.isLikeLoading === true), добавляется CSS-класс -loading-like, который отвечает за анимацию.

//         // ${comment.isLikeLoading ? 'disabled' : ''} - если сейчас лайк «загружается», чтобы не было двойных кликов.
//         const newCommentHtml = `
//       <li class="comment">
//         <div class="comment-header">
//           <div>${comment.name}</div>
//           <div>${comment.date}</div>
//         </div>
//         <div class="comment-body">
//           <div class="comment-text">${comment.text}</div>
//         </div>
//         <div class="comment-footer">
//           <div class="likes">
//             <span class="likes-counter">${comment.likes}</span>
//             <button
//               class="like-button ${likeClass} ${loadingClass}"
//               data-index="${index}"
//               ${comment.isLikeLoading ? 'disabled' : ''}>
//             </button>
//           </div>
//         </div>
//       </li>`

//         commentEl.innerHTML += newCommentHtml
//     })
// }

// import { comments } from './comments.js'

// export function renderComments() {
//     const commentEl = document.getElementById('comment') Получаем HTML-элемент с ID comment, куда будут вставляться комментарии.
//     commentEl.innerHTML = ''

//     comments.forEach((comment, index) => {
//         const likeClass = comment.liked ? '-active-like' : ''
//         const newCommentHtml = `
//       <li class="comment">
//         <div class="comment-header">
//           <div>${comment.name}</div>
//           <div>${comment.date}</div>
//         </div>
//         <div class="comment-body">
//           <div class="comment-text">${comment.text}</div>
//         </div>
//         <div class="comment-footer">
//           <div class="likes">
//             <span class="likes-counter">${comment.likes}</span>
//             <button class="like-button ${likeClass}" data-index="${index}"></button>
//           </div>
//         </div>
//       </li>`

//         commentEl.innerHTML += newCommentHtml
//     })
// }

// один и тот же код
// import { comments } from './comments.js'

// export function renderComments() {
//     const commentEl = document.getElementById('comment')
//     commentEl.innerHTML = ''

//     comments.forEach((comment, index) => {
//         const likeClass = comment.liked ? '-active-like' : ''
//         const newCommentHtml = `
//       <li class="comment">
//         <div class="comment-header">
//           <div>${comment.name}</div>
//           <div>${comment.date}</div>
//         </div>
//         <div class="comment-body">
//           <div class="comment-text">${comment.text}</div>
//         </div>
//         <div class="comment-footer">
//           <div class="likes">
//             <span class="likes-counter">${comment.likes}</span>
//             <button class="like-button ${likeClass}" data-index="${index}"></button>
//           </div>
//         </div>
//       </li>`

//         commentEl.innerHTML += newCommentHtml
//     })
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
