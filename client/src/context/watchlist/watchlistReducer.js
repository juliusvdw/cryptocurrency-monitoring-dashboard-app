import {
  SET_COIN_DATA,
  SET_CRYPTOS,
  SET_LOADING,
  CLEAR_LOADING,
} from "../Types";

export default (state, action) => {
  switch (action.type) {
    case SET_CRYPTOS:
      return {
        ...state,
        cryptos: action.payload,
      };
    case SET_COIN_DATA:
      return {
        ...state,
        watchlistCoins: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
