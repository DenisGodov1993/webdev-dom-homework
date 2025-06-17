import { renderLogin } from './modules/renderLogin.js'
import { fetchAndRenderComments } from './modules/fetchAndRenderComments.js'
import { updateToken } from './modules/API.js'

const savedToken = localStorage.getItem('token')

if (savedToken) {
    updateToken(savedToken)
    fetchAndRenderComments(true)
}

renderLogin()
fetchAndRenderComments(false)

// ОШИБКИ!!!!
// длинный комментарий выходит за поле
// при нажатии на лайк, сердце не качается в обе стороны
// любой зарегистрированный пользователь может удалить любой, даже не свой, комментарий
// ставится ещё один лайк даже, когда пользователь уже поставил лайк под комментарием
