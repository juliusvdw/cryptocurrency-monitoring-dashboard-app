import React, { Fragment, useEffect, useContext, useState } from "react";

import { Link } from "react-router-dom";
import TradingViewWidget, { Themes, BarStyles, } from "react-tradingview-widget";



import WatchList from "../watchlist/Watchlist";
import TopMovers from "../TopMovers";
import News from "../news/News";

import WatchlistContext from "../../context/watchlist/watchlistContext";
import NewsContext from "../../context/news/newsContext";
import AuthContext from "../../context/auth/authContext";
import ChartContext from "../../context/chartwidget/chartContext";

const Home = () => {
  const [watchlistAlert, setWatchlistAlert] = useState("block");

  const watchlistContext = useContext(WatchlistContext);
  const newsContext = useContext(NewsContext);
  const authContext = useContext(AuthContext);
  const chartContext = useContext(ChartContext);

  const { setCryptos, loading, getWatchlist } = watchlistContext;
  const { getNews, newsLoading } = newsContext;
  const { getUser, user } = authContext;
  const { homeChart} = chartContext;

  //fetch all crypto prices and add to state with useEffect
  //Fetch user on page load
  useEffect(() => {
    if (user === null) {
      getUser();
    }
    getWatchlist();
    setCryptos();
    getNews();
  }, []);

  return (
    <>
      <div className = 'container-fluid '>

        <div className = 'row home-top-cards-row px-4 py-3'>
          <div className = 'col-lg-8'>
            <div className = 'home-top-card' style = {topCardStyle}>
              
              <WatchList />
            </div>

          </div>
         
          <div className = 'col-lg-4'>
          <div className = 'home-top-card' style = {topCardStyle}>

            
            <TopMovers />
          </div>
          
          
        </div>

        </div>

        <div className = 'row home-botttom-chart-row'>
          <div className = 'col-lg-12'>
            <div className = 'home-bottom-card' style = {bottomCardStyle}>
            <TradingViewWidget
              symbol={`${homeChart}`}
              theme={Themes.LIGHT}
              locale="en"
              style = {BarStyles.AREA}
              autosize
        />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const topCardStyle = {
  height: '350px',
  backgroundColor: 'white',
  borderRadius: '15px',
  padding: '20px',
  overflowY : 'auto'
}

const bottomCardStyle = {
  backgroundColor:'white',
  borderRadius:'15px',
  height:'370px',
  marginRight: '25px',
  marginLeft:'25px'

}





export default Home;
