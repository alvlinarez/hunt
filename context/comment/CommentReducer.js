import {
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_ERROR,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_ERROR,
  COMMENT_LOADING,
  ASSIGN_CURRENT_COMMENT,
  ASSIGN_CURRENT_COMMENT_ERROR,
  RESET_COMMENT_STATE
} from '../../types/commentTypes';

const CommentReducer = (state, action) => {
  switch (action.type) {
    case COMMENT_LOADING: {
      return {
        ...state,
        commentLoading: true
      };
    }
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        commentLoading: false,
        commentError: null
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        commentLoading: false,
        comments: [...state.comments, action.payload],
        commentError: null
      };
    case ASSIGN_CURRENT_COMMENT:
      return {
        ...state,
        commentLoading: false,
        currentComment: action.payload,
        commentError: null
      };
    case RESET_COMMENT_STATE:
      return {
        commentLoading: false,
        currentComment: {},
        commentError: null,
        comments: []
      };
    case GET_COMMENTS_ERROR:
    case ADD_COMMENT_ERROR:
    case ASSIGN_CURRENT_COMMENT_ERROR:
      return {
        ...state,
        commentLoading: false,
        commentError: action.payload
      };
    default:
      return state;
  }
};

export default CommentReducer;
