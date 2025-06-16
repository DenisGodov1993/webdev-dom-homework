import { login, updateToken } from './API.js'
import { renderRegistration } from './renderRegistration.js'
import { fetchAndRenderComments } from './fetchAndRenderComments.js'

export const renderLogin = () => {
    const app = document.getElementById('app')

    app.innerHTML = `
    <div class="container">
        <div class="add-form">
            <input type="text" class="add-form-login" placeholder="Логин" id="login-input"/>
            <input type="password" class="add-form-login" placeholder="Пароль" id="password-input"/>
            <div class="add-form-row">
                <button class="add-form-button" id="login-button">Войти</button>
                <button class="add-form-button" id="reg-button">Зарегистрироваться</button>
            </div>
            <p id="error-msg" style="color: red;"></p>
        </div>
    </div>`

    document.getElementById('login-button').addEventListener('click', () => {
        const loginValue = document.getElementById('login-input').value
        const passwordValue = document.getElementById('password-input').value

        login({ login: loginValue, password: passwordValue })
            .then((res) => {
                updateToken(res.user.token, res.user.name)
                fetchAndRenderComments(true)
            })
            .catch((err) => {
                document.getElementById('error-msg').textContent = err.message
            })
    })

    document
        .getElementById('reg-button')
        .addEventListener('click', renderRegistration)
}

// с комментариями
// import { login, updateToken } from './API.js' login() — выполняет запрос на авторизацию; updateToken() — сохраняет токен и имя пользователя.
// import { renderRegistration } from './renderRegistration.js' импорт функции, которая будет вызвана при нажатии кнопки "Зарегистрироваться" для отображения формы регистрации.
// import { fetchAndRenderComments } from './fetchAndRenderComments.js' импорт функции, которая загружает и отображает комментарии.
// И принимает флаг true/false, чтобы отобразить интерфейс в зависимости от авторизации.

// Экспортируется функция renderLogin, которая:
// - отрисовывает HTML форму входа
// - навешивает обработчики событий на кнопки

// export const renderLogin = () => {
//     const app = document.getElementById('app') Получаем корневой DOM-элемент с id app, куда будет вставляться форма.

// Вставка HTML-формы, где:
// - два поля для логина и пароля
// - две кнопки — "Войти" и "Зарегистрироваться"
// - пустой <p> с id error-msg для вывода сообщений об ошибке (красным цветом)

//     app.innerHTML = `
//     <div class="container">
//         <div class="add-form">
//             <input type="text" class="add-form-login" placeholder="Логин" id="login-input"/>
//             <input type="password" class="add-form-login" placeholder="Пароль" id="password-input"/>
//             <div class="add-form-row">
//                 <button class="add-form-button" id="login-button">Войти</button>
//                 <button class="add-form-button" id="reg-button">Зарегистрироваться</button>
//             </div>
//             <p id="error-msg" style="color: red;"></p>
//         </div>
//     </div>`

// обработчик клика на кнопку "Войти"
//     document.getElementById('login-button').addEventListener('click', () => {

// Получаем значения, введённые пользователем в поля логина и пароля.
//         const loginValue = document.getElementById('login-input').value
//         const passwordValue = document.getElementById('password-input').value

//  Вызываем функцию login() с введёнными данными. Она делает POST-запрос на API.
//         login({ login: loginValue, password: passwordValue })
//             .then((res) => { Если логин успешен:
//                 updateToken(res.user.token, res.user.name) сохраняем токен и имя пользователя (в память и в localStorage)
//                 fetchAndRenderComments(true) загружаем и отрисовываем комментарии как авторизованный пользователь.
//             })
//  Если логин неудачный (например, неверный пароль) — выводим сообщение об ошибке в #error-msg.
//             .catch((err) => {
//                 document.getElementById('error-msg').textContent = err.message
//             })
//     })

// обработчик клика на кнопку "Зарегистрироваться":
// При нажатии вызывается функция renderRegistration(), которая перекидывает на страничку регистрации.
//     document
//         .getElementById('reg-button')
//         .addEventListener('click', renderRegistration)
// }

// СТАРЫЕ КОДА С ПРЕДЫДУЩИХ ДОМАШЕК
// import { login, updateToken } from './API.js'
// import { renderRegistration } from './renderRegistration.js'
// import { fetchAndRenderComments } from './fetchAndRenderComments.js'
// import { renderComments } from './renderComments.js'

// export const renderLogin = () => {
//     const app = document.getElementById('app')

//     app.innerHTML = `
//     <div class="container">
//             <span id="loading-message" style="color: #ffffff; margin: 32px;"></span>
//             <ul class="comments" id="comment"></ul>
//             <div class="add-form">
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
//                     <button class="add-form-button" id="login-button">Войти</button>
//                     <button class="add-form-button" id="reg-button">Зарегистрироваться</button>
//                 </div>
//             </div>
//     `

//     const buttonEL = document.getElementById('login-button')
//     const loginEl = document.getElementById('login-input')
//     const passwordEl = document.getElementById('password-input')

//     buttonEL.addEventListener('click', () => {
//         // login({
//         //     login: loginEl.value,
//         //     password: passwordEl.value,
//         // }).then((resposeDate) => {
//         //     updateToken(resposeDate.user.token)
//         //     fetchAndRenderComments(true)
//         // })

//         login({
//             login: loginEl.value,
//             password: passwordEl.value,
//         }).then((resposeData) => {
//             updateToken(resposeData.user.token)
//             fetchAndRenderComments()
//         })
//     })

//     const buttonReg = document.getElementById('reg-button')

//     buttonReg.addEventListener('click', () => {
//         renderRegistration()
//         renderComments()
//     })
// }

// import { login, updateToken } from './API.js'
// import { renderRegistration } from './renderRegistration.js'
// import { fetchAndRenderComments } from './fetchAndRenderComments.js'
// import { renderComments } from './renderComments.js'

// export const renderLogin = () => {
//     const app = document.getElementById('app')

//     app.innerHTML = `
//     <div class="container">
//             <span id="loading-message" style="color: #ffffff; margin: 32px;"></span>
//             <ul class="comments" id="comment"></ul>
//             <div class="add-form">
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
//                     <button class="add-form-button" id="login-button">Войти</button>
//                     <button class="add-form-button" id="reg-button">Зарегистрироваться</button>
//                 </div>
//             </div>
//     `

//     const buttonEL = document.getElementById('login-button')

//     const loginEl = document.getElementById('login-input')

//     const passwordEl = document.getElementById('password-input')

//     buttonEL.addEventListener('click', () => {
//         login({
//             login: loginEl.value,
//             password: passwordEl.value,
//         }).then((resposeDate) => {
//             updateToken(resposeDate.user.token)
//             fetchAndRenderComments()
//         })
//     })

//     const buttonReg = document.getElementById('reg-button')

//     buttonReg.addEventListener('click', () => {
//         renderRegistration()
//         renderComments()
//     })
// }
