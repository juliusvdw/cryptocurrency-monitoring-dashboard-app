import React, { useReducer } from "react";
import { useHistory, Redirect } from "react-router-dom";



import { SET_HOME_CHART} from "../Types";

const ChartState = (props) => {
  const initialState = {
    homeChart:'btcusd'
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  

  return (
    <ChartState.Provider
      value={{
        homeChart:state.homeChart,
      }}
    >
      {props.children}
    </ChartState.Provider>
  );
};

export default AuthState;
