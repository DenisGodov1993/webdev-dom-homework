import { registration, updateToken } from './API.js'
import { fetchAndRenderComments } from './fetchAndRenderComments.js'

export const renderRegistration = () => {
    const app = document.getElementById('app')

    app.innerHTML = `
    <div class="container">
        <div class="add-form">
            <input type="text" class="add-form-login" placeholder="Имя" id="name-input"/>
            <input type="text" class="add-form-login" placeholder="Логин" id="login-input"/>
            <input type="password" class="add-form-login" placeholder="Пароль" id="password-input"/>
            <div class="add-form-row">
                <button class="add-form-button" id="register-button">Зарегистрироваться</button>
            </div>
            <p id="error-msg" style="color: red;"></p>
        </div>
    </div>`

    document.getElementById('register-button').addEventListener('click', () => {
        const name = document.getElementById('name-input').value
        const loginVal = document.getElementById('login-input').value
        const password = document.getElementById('password-input').value

        registration({ name, login: loginVal, password })
            .then((res) => {
                updateToken(res.user.token, res.user.name)
                fetchAndRenderComments(true)
            })
            .catch((err) => {
                document.getElementById('error-msg').textContent = err.message
            })
    })
}

// код с комментариями:
// import { registration, updateToken } from './API.js' -registration() — выполняет запрос на регистрацию нового пользователя.
// updateToken() — сохраняет токен и имя пользователя (в память и в localStorage)
// import { fetchAndRenderComments } from './fetchAndRenderComments.js' - Импортируется функция для загрузки и отображения комментариев.
// После успешной регистрации пользователь считается авторизованным, и комментарии отображаются с доступными действиями (например, добавить или удалить).

// Экспорт функции renderRegistration, которая отрисовывает HTML-интерфейс страницы регистрации и вешает обработчик события на кнопку.
// export const renderRegistration = () => {
// Получаем DOM-элемент с id="app", куда вставим HTML-код формы регистрации.
//     const app = document.getElementById('app')

// Вставка HTML-формы, где:
// - поле для имени пользователя (#name-input)
// - поле для логина (#login-input)
// - поле для пароля (#password-input)
// - кнопка "Зарегистрироваться"
// - <p> с id="error-msg" — для вывода ошибок, если они возникнут

//     app.innerHTML = `
//     <div class="container">
//         <div class="add-form">
//             <input type="text" class="add-form-login" placeholder="Имя" id="name-input"/>
//             <input type="text" class="add-form-login" placeholder="Логин" id="login-input"/>
//             <input type="password" class="add-form-login" placeholder="Пароль" id="password-input"/>
//             <div class="add-form-row">
//                 <button class="add-form-button" id="register-button">Зарегистрироваться</button>
//             </div>
//             <p id="error-msg" style="color: red;"></p>
//         </div>
//     </div>`

// обработчик события на кнопку "Зарегистрироваться":
//     document.getElementById('register-button').addEventListener('click', () => {

// Считываем значения, введённые пользователем в поля формы.
//         const name = document.getElementById('name-input').value
//         const loginVal = document.getElementById('login-input').value
//         const password = document.getElementById('password-input').value

// Вызывается функция registration() — делает POST-запрос на API для создания нового пользователя. Параметры передаются в виде объекта.
//         registration({ name, login: loginVal, password })
//             .then((res) => { - Если регистрация прошла успешно:
//                 updateToken(res.user.token, res.user.name) - сохраняет токен и имя пользователя
//                 fetchAndRenderComments(true) -  загружает и отображает комментарии, включая функции, доступные только авторизованным пользователям.
//             })
// Если произошла ошибка (например, пользователь с таким логином уже существует), выводим текст ошибки в красный блок под кнопкой
//             .catch((err) => {
//                 document.getElementById('error-msg').textContent = err.message
//             })
//     })
// }

// СТАРЫЕ КОДА С ПРЕДЫДУЩИХ ДОМАШЕК
// import { registration, updateToken } from './API.js'
// import { fetchAndRenderComments } from './fetchAndRenderComments.js'

// export const renderRegistration = () => {
//     const app = document.getElementById('app')

//     app.innerHTML = `
//     <div class="container">
//             <span id="loading-message" style="color: #ffffff; margin: 32px;"></span>
//             <ul class="comments" id="comment"></ul>
//             <div class="add-form">
//                 <input
//                     type="text"
//                     class="add-form-login"
//                     placeholder="Имя"
//                     id="name-input"
//                     readonly
//                 />
//                 <input
//                     type="text"
//                     class="add-form-login"
//                     placeholder="Логин"
//                     id="login-input"
//                 />
//                 <input
//                     type="password"
//                     id="password-input"
//                     class="add-form-login"
//                     placeholder="Пароль"
//                 />
//                 <div class="add-form-row">
//                     <button class="add-form-button" id="reg-button">Зарегистрироваться</button>
//                 </div>
//             </div>
//     `
//     document.getElementById('reg-button').addEventListener('click', () => {
//         const name = document.getElementById('name-input').value
//         const login = document.getElementById('login-input').value
//         const password = document.getElementById('password-input').value

//         registration({ name, login, password }).then((res) => {
//             updateToken(res.user.token)
//             fetchAndRenderComments()
//         })
//     })

//     const buttonEL = document.getElementById('login-button')

//     const nameEl = document.getElementById('name-input')
//     const loginEl = document.getElementById('login-input')
//     const passwordEl = document.getElementById('password-input')

//     buttonEL.addEventListener('click', () => {
//         registration({
//             name: nameEl.value,
//             login: loginEl.value,
//             password: passwordEl.value,
//         }).then((date) => {
//             updateToken(date.user.token)
//             fetchAndRenderComments()
//         })
//     })
// }

// import { registration, updateToken } from './API.js'
// import { fetchAndRenderComments } from './fetchAndRenderComments.js'

// export const renderRegistration = () => {
//     const app = document.getElementById('app')
//     app.innerHTML = `
//     <div class="container">
//         <div class="add-form">
//             <input type="text" id="name-input" class="add-form-login" placeholder="Имя" />
//             <input type="text" id="login-input" class="add-form-login" placeholder="Логин" />
//             <input type="password" id="password-input" class="add-form-login" placeholder="Пароль" />
//             <div class="add-form-row">
//                 <button id="reg-button" class="add-form-button">Зарегистрироваться</button>
//             </div>
//         </div>
//     </div>`

//     document.getElementById('reg-button').addEventListener('click', () => {
//         const name = document.getElementById('name-input').value
//         const loginVal = document.getElementById('login-input').value
//         const passwordVal = document.getElementById('password-input').value

//         registration({ name, login: loginVal, password: passwordVal })
//             .then((response) => {
//                 updateToken(response.user.token)
//                 fetchAndRenderComments()
//             })
//             .catch(() => alert('Ошибка регистрации. Попробуйте другие данные.'))
//     })
// }
