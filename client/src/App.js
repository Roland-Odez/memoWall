import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'


import { Container } from '@material-ui/core'

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import PostDetails from './components/PostDetails/PostDetails'


function App() {
    const user = JSON.parse(localStorage.getItem('profile'))
    
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

            </Container>

        </BrowserRouter>
    )
}

export default App