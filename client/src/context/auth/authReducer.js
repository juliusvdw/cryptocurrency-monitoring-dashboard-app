import { SET_USER, SET_LOGIN_LOADING, SET_REGISTER_LOADING, CLEAR_LOGIN_LOADING, CLEAR_REGISTER_LOADING } from "../Types";

export default (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_LOGIN_LOADING:
      return {
        ...state,
        loginLoading :true
      };
    case SET_REGISTER_LOADING:
      return {
        ...state,
        registerLoading:true
      };
    case CLEAR_LOGIN_LOADING:
      return {
        ...state,
        loginLoading:false
      };
    case CLEAR_REGISTER_LOADING:
      return {
        ...state,
        registerLoading:false
      };
    default:
      return state;
  }
};
