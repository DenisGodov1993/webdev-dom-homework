// НЕНУЖНЫЙ ФАЙЛ, для черновика
// import { comments } from './comments.js'
// import { renderLogin } from './renderLogin.js'

// export const renderCommentsReadOnly = () => {
//     const app = document.getElementById('app')

//     const commentsHtml = comments
//         .map(
//             (comment) => `
//         <li class="comment">
//             <div class="comment-header">
//                 <div>${comment.name}</div>
//                 <div>${comment.date}</div>
//             </div>
//             <div class="comment-body">
//                 <div class="comment-text">${comment.text}</div>
//             </div>
//             <div class="comment-footer">
//                 <div class="likes">
//                     <span class="likes-counter">${comment.likes}</span>
//                     <button class="like-button" disabled></button>
//                 </div>
//             </div>
//         </li>
//     `,
//         )
//         .join('')

//     app.innerHTML = `
//         <div class="container">
//             <ul class="comments">
//                 ${commentsHtml}
//             </ul>
//             <p style="margin-top: 20px;">
//                 Чтобы добавить комментарий, <a href="#" id="login-link">авторизуйтесь</a>.
//             </p>
//         </div>
//     `

//     document.getElementById('login-link').addEventListener('click', (e) => {
//         e.preventDefault()
//         renderLogin()
//     })
// }
