import {
    SET_POSTS,
    LIKE_POST,
    UNLIKE_POST,
    LOAD_DATA,
    REMOVE_POST,
    LOAD_UI,
    ADD_POST,
    SET_ERRORS,
    REMOVE_ERRORS,
    SET_POST,
    STOP_LOAD_UI,
    ADD_COMMENT,
    SET_USERS
} from '../types';

import axios from 'axios';

// get all posts
export const getPosts = () => (dispatch) => {
    dispatch({ type: LOAD_DATA });
    axios.get('/posts')
      .then((res) => {
        dispatch({
          type: SET_POSTS,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_POSTS,
          payload: []
        });
      });
};

// get all users
export const getUsers = () => (dispatch) => {
  dispatch({ type: LOAD_DATA });
  axios.get('/users')
    .then((res) => {
      dispatch({
        type: SET_USERS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_USERS,
        payload: []
      });
    });
};

// get post details
export const getPostDetails = (postId) => (dispatch) => {
  dispatch({ type: LOAD_UI });
  axios.get(`/post/${postId}`)
    .then((res) => {
      dispatch({
        type: SET_POST,
        payload: res.data
      });
      dispatch({ type: STOP_LOAD_UI });
    })
    .catch((err) => console.log(err));
};

// add post
export const addPost = (newPost) => (dispatch) => {
  dispatch({ type: LOAD_UI });
  axios.post('/post', newPost)
    .then((res) => {
      dispatch({
        type: ADD_POST,
        payload: res.data,
      });
      dispatch(removeError());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

// like post
export const likePost = (postId) => (dispatch) => {
    axios.get(`/post/${postId}/like`)
      .then((res) => {
        dispatch({
          type: LIKE_POST,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };

  // unlike post
  export const unlikePost = (postId) => (dispatch) => {
    axios.get(`/post/${postId}/unlike`)
      .then((res) => {
        dispatch({
          type: UNLIKE_POST,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };

// add comment
export const addComment = (postId, commentData) => (dispatch) => {
  axios.post(`/post/${postId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      });
      dispatch(removeError());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

// delete post
export const deletePost = (postId) => (dispatch) => {
    axios.delete(`/post/${postId}`)
      .then(() => {
        dispatch({ type: REMOVE_POST, payload: postId });
      })
      .catch((err) => console.log(err));
};

// get user info and posts
export const getUserProfile = (user) => (dispatch) => {
  dispatch({ type: LOAD_DATA });
  axios.get(`/user/${user}`)
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data.posts
      });
    })
    .catch(() => {
      dispatch({
        type: SET_POSTS,
        payload: null
      });
    });
};

export const removeError = () => (dispatch) => {
  dispatch({ type: REMOVE_ERRORS });
};