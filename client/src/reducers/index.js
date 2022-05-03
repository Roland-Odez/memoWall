import { combineReducers } from "redux";

import posts from './posts'
import auth from './Auth'
export default combineReducers({ posts, auth })