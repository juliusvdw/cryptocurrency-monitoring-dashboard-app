import React, { useReducer } from "react";
import { useHistory, Redirect } from "react-router-dom";

import ChartReducer from './chartReducer'
import ChartContext from './chartContext'



import { SET_HOME_CHART} from "../Types";

const ChartState = (props) => {
  const initialState = {
    homeChart:'btcusd'
  };

  const [state, dispatch] = useReducer(ChartReducer, initialState);

  const setHomeChart =  (chartID) => {
      dispatch({type:SET_HOME_CHART,payload:chartID })
      console.log('wohoo')
  }

  return (
    <ChartContext.Provider
      value={{
        homeChart:state.homeChart,
        setHomeChart,
      }}
    >
      {props.children}
    </ChartContext.Provider>
  );
};

export default ChartState;
