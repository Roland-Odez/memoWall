import React, { useState } from 'react'
import { Container, Typography, Paper, Avatar, Grid, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { GoogleLogin } from 'react-google-login'
import Icon from './Icon'
import { useDispatch } from 'react-redux'


import useStyles from './styles'
import Input from './Input'
import { signin, signup } from '../../actions/auth'
import { useHistory } from 'react-router-dom'
import { ALERT, AUTH, LOGIN_STATUS } from '../../constants/actionTypes'



const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {

    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)




    const handleSubmit = (e) => {
        e.preventDefault()

        if (isSignUp) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
        setShowPassword(false)
    }

    const googleSuccess = (res) => {
        const result = res?.profileObj
        const token = res?.tokenId
        try {
            dispatch({ type: AUTH, data: { result, token } })
            dispatch({ type: LOGIN_STATUS, status: true, message: 'Login successfully!' })
            dispatch({ type: ALERT, open: true })
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = (error) => {
        dispatch({ type: ALERT, open: true })
        dispatch({ type: LOGIN_STATUS, status: false, message: 'Login failed, invalid email or password' })
        console.log(error)
    }




    return (
        <>

        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                <Input name='lastName' label='Last Name' handleChange={handleChange} autoFocus half />
                            </>
                        )}
                        <Input name='email' label='Email Addresss' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignUp && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit} >
                        {isSignUp ? 'sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId='1083708475841-tiqae103nd3a5ag096ac75b082qr8mob.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>Google Sign In</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
        </>
    )
}

export default Auth