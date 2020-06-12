import { SET_NEWS, SET_LOADING, CLEAR_LOADING } from "../Types";

export default (state, action) => {
  switch (action.type) {
    case SET_NEWS:
      return {
        ...state,
        news: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        newsLoading: true,
      };
    case CLEAR_LOADING:
      return {
        ...state,
        newsLoading: false,
      };
    default:
      return state;
  }
};
