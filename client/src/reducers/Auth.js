import { AUTH, LOGOUT, LOGIN_STATUS, ALERT } from '../constants/actionTypes'

const auth = (state = { authData: null, openAlert: false, status: false, message: '' }, action) => {
    switch (action.type) {
        case ALERT:
            return { ...state, openAlert: action.open }

        case LOGIN_STATUS:
            return { ...state, status: action.status, message: action.message }

        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action?.data }

        case LOGOUT:
            localStorage.clear()
            return { ...state, authData: null }

        default:
            return state;
    }
}

export default auth