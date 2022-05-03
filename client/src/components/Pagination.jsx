import React, { useEffect } from 'react'
import useStyles from './Styles'
import { Link } from 'react-router-dom'
import { Pagination, PaginationItem } from '@material-ui/lab'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../actions/posts'

const Pagn = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.posts)
    const classes = useStyles()
    const dispatch = useDispatch()


    useEffect(() => {
        if (page) dispatch(getPosts(page))
    }, [page, dispatch])
    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page)}
            variant='outlined'
            color='primary'
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    )
}

export default Pagn