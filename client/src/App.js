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

//import Context
import AuthContext from "./context/auth/authContext";

//import pages
import Home from "./components/pages/Home";
import NewsPage from "./components/pages/NewsPage";
import Education from "./components/pages/Education";
import Exchanges from "./components/pages/Exchanges";
import Connect from "./components/pages/Connect";
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
            <Router>
              <div className="App">
                <TopNav
                  setLoginModalShow={setLoginModalShow}
                  setRegisterModalShow={setRegisterModalShow}
                />

                <div
                  style={{ position: "relative", height: "calc(100vh - 75px)" }}
                >
                  <div className="d-flex h-100 w-100">
                    <div id="sidenav-container" className="d-none d-md-flex">
                      <SideNav />
                    </div>

                    <div
                      className=" d-flex "
                      id="body-container"
                      style={{
                        width: "100vw",
                        background: "#1d1d1d",
                      }}
                    >
                      <div
                        id="body"
                        className="d-flex w-100 h-100 text-white  "
                      >
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
                            path={"/exchanges"}
                            render={(props) => <Exchanges {...props} />}
                          />
                          <Route
                            exact
                            path={"/education"}
                            render={(props) => <Education {...props} />}
                          />
                          <Route
                            exact
                            path={"/connect"}
                            render={(props) => <Connect {...props} />}
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
                  </div>
                </div>
              </div>
            </Router>
          </WatchlistState>
        </NewsState>
      </CoinFeedState>
    </AuthState>
  );
}

export default App;
