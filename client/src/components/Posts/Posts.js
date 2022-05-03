import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core'
import Post from './Post/Post'
import { useSelector } from 'react-redux'

import useStyles from './styles'
function Posts({ setCurrentId }) {
    const classes = useStyles()
    const { posts, isLoading } = useSelector((state) => state.posts)

    if (!posts.length && !isLoading) return (<div style={{ fontSize: '15px', color: 'white' }}>No post</div>)

    return (
        !posts?.length ? <CircularProgress style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} /> : (
            <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6} md={6} lg={4}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts