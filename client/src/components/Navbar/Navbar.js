import React, { useCallback, useEffect, useState } from 'react'
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core'
import { Link, useHistory, useLocation } from 'react-router-dom'
import useStyles from './styles'
import memories from '../../images/memories.png'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'


const Navbar = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')) || null)


    const token = user?.token


    const logOut = useCallback(() => {
        dispatch({ type: 'LOGOUT' })
        history.push('/')
        setUser(null)
    }, [dispatch, history],
    )

    useEffect(() => {

        if (token) {

            const decodedToken = decode(token)

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logOut()
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')) || null)
    }, [token, location, logOut])


    const classes = useStyles()

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>

                <Typography component={Link} to='/' className={classes.heading} variant='h2' align='center'>MemoWall</Typography>
                <img className={classes.image} src={memories} alt='memories' height={60} />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                        <Button variant='contained' className={classes.logout} color='secondary' onClick={logOut}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar