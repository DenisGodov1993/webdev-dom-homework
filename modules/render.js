import { comments } from './comments.js'

export function renderComments() {
    const commentEl = document.getElementById('comment')
    commentEl.innerHTML = ''

    comments.forEach((comment, index) => {
        const likeClass = comment.liked ? '-active-like' : ''
        const loadingClass = comment.isLikeLoading ? '-loading-like' : '' //Если идёт "загрузка лайка" (comment.isLikeLoading === true), добавляется CSS-класс -loading-like, который отвечает за анимацию.

        // ${comment.isLikeLoading ? 'disabled' : ''} - если сейчас лайк «загружается», чтобы не было двойных кликов.
        const newCommentHtml = `
      <li class="comment">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">${comment.text}</div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button 
              class="like-button ${likeClass} ${loadingClass}" 
              data-index="${index}"
              ${comment.isLikeLoading ? 'disabled' : ''}> 
            </button>
          </div>
        </div>
      </li>`

        commentEl.innerHTML += newCommentHtml
    })
}

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
