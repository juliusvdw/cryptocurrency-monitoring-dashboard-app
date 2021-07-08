import { SET_HOME_CHART } from "../Types";

export default (state, action) => {
  switch (action.type) {
    case SET_HOME_CHART:
      return {
        ...state,
        homeChart:action.payload
      };
    default:
      return state;
  }
};
