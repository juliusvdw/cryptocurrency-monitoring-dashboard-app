import React, { useReducer } from "react";
import axios from "axios";

import CoinFeedContext from "./coinFeedContext";
import CoinFeedReducer from "./coinFeedReducer";

const CoinFeedState = () => {
  const initialState = {
    coinFeed: [],
    coinFeedLoading: false,
  };

  const [state, dispatch] = useReducer(CoinFeedReducer, initialState);

  const getCoinFeed = () => {
   try {
       const res = await axios.get('')
   } catch (err) {
       console.log(err)
   }
  }

  return (
    <CoinFeedContext.Provider
      value={{
        coinFeedLoading:state.coinFeedLoading,
        coinFeed: state.coinFeed,
        getCoinFeed,
      }}
    >
      {props.children}
    </CoinFeedContext.Provider>
  );
};

export default CoinFeedState;
