import React, { useReducer } from "react";
import axios from "axios";

import NewsContext from "./newsContext";
import NewsReducer from "./newsReducer";
import { SET_NEWS, SET_LOADING, CLEAR_LOADING } from "../Types";
import newsContext from "./newsContext";

const NewsState = (props) => {
  const initialState = {
    newsLoading: null,
    news: [],
  };

  const [state, dispatch] = useReducer(NewsReducer, initialState);

  //fetch news from cryptocontrol API and store in news state
  const getNews = async () => {
    setLoading();
    try {
      const res = await axios.get(
        "https://cryptocontrol.io/api/v1/public/news?latest=true&key=eaab98db0c6387dda93def19b44f3035"
      );
      const data = res.data;

      dispatch({ type: SET_NEWS, payload: data });
      clearLoading();
      console.log(data);
    } catch (err) {}
  };

  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  const clearLoading = () => {
    dispatch({ type: "CLEAR_LOADING" });
  };

  return (
    <NewsContext.Provider
      value={{
        newsLoading: state.newsLoading,
        news: state.news,
        getNews,
      }}
    >
      {props.children}
    </NewsContext.Provider>
  );
};

export default NewsState;
