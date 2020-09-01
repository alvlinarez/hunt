import React, { useReducer } from 'react';
import CommentReducer from './CommentReducer';
import { axiosClient } from '../../config/axios';
import { CommentContext } from './CommentContext';

import {
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_ERROR,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_ERROR,
  ASSIGN_CURRENT_COMMENT,
  ASSIGN_CURRENT_COMMENT_ERROR,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_ERROR,
  COMMENT_LOADING
} from '../../types/commentTypes';

export const CommentState = ({ children }) => {
  const initialState = {
    comments: [],
    currentComment: {},
    commentLoading: false,
    commentError: null
  };
  const [state, dispatch] = useReducer(CommentReducer, initialState);

  const getComments = (comments) => {
    dispatch({
      type: COMMENT_LOADING
    });
    if (comments === null || comments === undefined) {
      dispatch({
        type: GET_COMMENTS_ERROR,
        payload: 'An unexpected error happened'
      });
    } else {
      dispatch({
        type: GET_COMMENTS_SUCCESS,
        payload: comments
      });
    }
  };

  const addCommentToProduct = async (productId, { message }) => {
    dispatch({
      type: COMMENT_LOADING
    });
    try {
      const { data } = await axiosClient().put(
        `product/${productId}/addComment`,
        {
          message
        }
      );
      dispatch({
        type: ADD_COMMENT_SUCCESS,
        payload: data.commentAdded
      });
    } catch (e) {
      dispatch({
        type: ADD_COMMENT_ERROR,
        payload: e.response.data.error
      });
    }
  };

  const removeCommentFromProduct = async (productId, comment) => {
    dispatch({
      type: COMMENT_LOADING
    });
    try {
      await axiosClient().put(`product/${productId}/removeTask`, {
        commentId: comment.id
      });
      dispatch({
        type: REMOVE_COMMENT_SUCCESS,
        payload: comment
      });
    } catch (e) {
      dispatch({
        type: REMOVE_COMMENT_ERROR,
        payload: e.response.data.error
      });
    }
  };

  const assignCurrentComment = (comment) => {
    if (comment === null || comment === undefined) {
      dispatch({
        type: ASSIGN_CURRENT_COMMENT_ERROR,
        payload: 'An unexpected error happened'
      });
    } else {
      dispatch({
        type: ASSIGN_CURRENT_COMMENT,
        payload: comment
      });
    }
  };

  return (
    <CommentContext.Provider
      value={{
        comments: state.comments,
        currentComment: state.currentComment,
        commentLoading: state.commentLoading,
        commentError: state.commentError,
        getComments,
        addCommentToProduct,
        removeCommentFromProduct,
        assignCurrentComment
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
