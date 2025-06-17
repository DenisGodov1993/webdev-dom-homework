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
