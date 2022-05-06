import * as api from '../api'
import { ALERT, AUTH, LOGIN_STATUS } from '../constants/actionTypes'

export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData)
        dispatch({ type: AUTH, data })
        dispatch({ type: LOGIN_STATUS, status: true, message: 'Login successfully!' })
        dispatch({ type: ALERT, open: true })
        history.push('/')

    } catch (error) {
        dispatch({ type: ALERT, open: true })
        dispatch({ type: LOGIN_STATUS, status: false, message: 'Login failed, invalid email or password' })

        console.log(error)
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData)
        dispatch({ type: AUTH, data })
        dispatch({ type: LOGIN_STATUS, status: true, message: 'Login successfully!' })
        dispatch({ type: ALERT, open: true })
        history.push('/')
    } catch (error) {
        dispatch({ type: ALERT, open: true })
        dispatch({ type: LOGIN_STATUS, status: false, message: 'User already exist' })
    }
}