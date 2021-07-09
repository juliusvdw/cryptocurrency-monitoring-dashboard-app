import React, { useEffect, useContext, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import TopNav from "./components/layout/TopNav";
import SideNav from "./components/layout/SideNav";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";

//import context providers
import WatchlistState from "./context/watchlist/WatchlistState";
import NewsState from "./context/news/NewsState";
import AuthState from "./context/auth/AuthState";
import CoinFeedState from "./context/coinFeed/CoinFeedState";
import ChartState from "./context/chartwidget/ChartState";

//import Context
import AuthContext from "./context/auth/authContext";

//import pages
import Home from "./components/pages/Home";
import NewsPage from "./components/pages/NewsPage";
import Chart from "./components/pages/Chart";
import CoinPage from "./components/pages/CoinPage";
import AllCoinsPage from "./components/pages/AllCoinsPage";

function App(props) {
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [registerModalShow, setRegisterModalShow] = useState(false);

  return (
    <AuthState
      setLoginModalShow={setLoginModalShow}
      setRegisterModalShow={setRegisterModalShow}
    >
      <CoinFeedState>
        <NewsState>
          <WatchlistState>
           <ChartState>
            <Router>
              <div className="App">
                <TopNav
                  setLoginModalShow={setLoginModalShow}
                  setRegisterModalShow={setRegisterModalShow}
                />

                    
                      <div id="body" >
                        
                        <Switch>
                          <Route
                            exact
                            path={"/"}
                            render={(props) => <Home {...props} />}
                          />
                          <Route
                            exact
                            path={"/chart/:coin"}
                            render={(props) => <Chart {...props} />}
                          />
                          <Route
                            exact
                            path={"/news"}
                            render={(props) => <NewsPage {...props} />}
                          />

                          <Route
                            exact
                            path={"/coin/:id"}
                            render={(props) => <CoinPage {...props} />}
                          />
                          <Route
                            exact
                            path={"/allCoins"}
                            render={(props) => <AllCoinsPage {...props} />}
                          />
                        </Switch>

                        <LoginModal
                          show={loginModalShow}
                          onHide={() => setLoginModalShow(false)}
                        />
                        <RegisterModal
                          show={registerModalShow}
                          onHide={() => setRegisterModalShow(false)}
                        />
                      </div>
                  </div>
            </Router>
              </ChartState>
             </WatchlistState>
        </NewsState>
      </CoinFeedState>
    </AuthState>
  );
}

export default App;
