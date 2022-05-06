import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'


import { Container } from '@material-ui/core'

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import PostDetails from './components/PostDetails/PostDetails'
import { ALERT } from './constants/actionTypes'
import { Alert, Snackbar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'



function App() {
    const dispatch = useDispatch()
    const { status, message, openAlert } = useSelector((state) => state.auth)
    const user = JSON.parse(localStorage.getItem('profile'))

    const handleOpen = () => {
        dispatch({ type: ALERT, openAlert: false })
    }

    return (
        <BrowserRouter>
            <Container maxwidth='lg'>
                <Navbar />

                <Switch>
                    <Route path='/' exact component={() => <Redirect to='/posts' />} />
                    <Route path='/posts' exact component={Home} />
                    <Route path='/auth' exact component={() => !(user === null) ? <Redirect to='/posts' /> : <Auth />} />
                    <Route path='/posts/search' exact component={Home} />
                    <Route path='/posts/:id' component={PostDetails} />
                </Switch>

                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} elevation={0} open={openAlert} onClose={handleOpen} autoHideDuration={5000}>
                    <Alert severity={status ? 'success' : 'error'}>{message}</Alert>
                </Snackbar>
            </Container>
        </BrowserRouter>
    )
}

export default App