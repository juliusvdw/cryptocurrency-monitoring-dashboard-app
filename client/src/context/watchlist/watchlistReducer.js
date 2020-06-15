import {
  SET_COIN_DATA,
  SET_CRYPTOS,
  SET_LOADING,
  CLEAR_LOADING,
  GET_WATCHLIST_COINS,
  CLEAR_WATCHLIST_COINS,
  WATCHLIST_ADD,
} from "../Types";

export default (state, action) => {
  switch (action.type) {
    case GET_WATCHLIST_COINS:
      return {
        ...state,
        watchlist: action.payload,
      };
    case CLEAR_WATCHLIST_COINS:
      return {
        ...state,
        watchlist: [
          { id: "bitcoin" },
          { id: "ethereum" },
          { id: "tether" },
          { id: "ripple" },
          { id: "litecoin" },
          { id: "dash" },
          { id: "eos" },
          { id: "cardano" },
        ],
      };
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
    case WATCHLIST_ADD:
      return {
        ...state,
        wathchlist: action.payload,
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
