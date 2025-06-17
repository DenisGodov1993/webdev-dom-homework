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
