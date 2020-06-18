import {
  SET_COIN_ARTICLES,
  SET_COIN_STATS,
  SET_LOADING,
  CLEAR_LOADING,
} from "../Types";

export default (state, action) => {
  switch (action.type) {
    case SET_COIN_ARTICLES:
      return {
        ...state,
        news: action.payload,
      };
    case SET_COIN_STATS:
      return {
        ...state,
        stats: { ...action.payload },
      };
    case SET_LOADING:
      return {
        ...state,
        statsLoading: true,
        newsLoading: true,
      };
    case CLEAR_LOADING:
      return {
        ...state,
        statsLoading: false,
        newsLoading: false,
      };
    default:
      return {
        ...state,
      };
  }
};
