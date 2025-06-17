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
