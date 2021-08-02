import React, { useContext,useEffect } from "react";
import { Link } from "react-router-dom";
import NavSearchBox from "./NavSearchBox";

import AuthContext from "../../context/auth/authContext";
import { set } from "mongoose";

const TopNav = ({ setRegisterModalShow, setLoginModalShow }) => {
  const authContext = useContext(AuthContext);
  const { user, userLogout,getUser } = authContext;




  //Set active link on click
  const setActiveLink = (e) => {
    const navLinks = document.querySelectorAll('.nav-link');

    let links = [...navLinks];
    links.forEach(el => {
      el.classList.remove('active');
      e.target.classList.add('active')
    })
  }

  return (
    <>
    
  
        <nav
          className="navbar navbar-expand-md "
          style={navbarStyle}
        >
          <a
            className="navbar-brand"
            href="#"
            
          >
            <img src = '/cryptologo.png' style={{ height:'45px', width:'45px', fontSize: "24px" }} /> 
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon "></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav  ">
              <li className="nav-item ">
                <Link to="/" className="nav-link active" href="#" onClick = {setActiveLink}>
                  Dashboard{" "}
                </Link>
              </li>
              
              <li className="nav-item">
                <Link
                  to="/chart/default"
                  className="nav-link  "
                  href="#"
                  onClick = {setActiveLink}
                >
                  Chart
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/allcoins" className="nav-link " href="#" onClick = {setActiveLink}>
                  Coins
                </Link>
              </li>
            </ul>

            <div className="d-none d-md-block mx-auto" style={{ width: "37%" }}>
          <NavSearchBox />
        </div>
          </div>

          {user === null ? (
          <div
            className="nav-buttons ml-auto  d-none d-md-block"
            style={{ marginRight: "50px" }}
          >
            <div
              className="btn btn-outline-primary mr-3 nav-btn"
              style={btnStyle}
              onClick={setLoginModalShow}
            >
              Sign in
            </div>
           
          </div>
        ) : (
          <div style={{ marginRight: "80px" }}>
            <div
              className="logout-btn btn btn-outline-danger d-none d-md-block"
              style={btnStyle}
              onClick={() => userLogout()}
            >
              Logout
            </div>
          </div>
        )}
        </nav>
    </>
  );
};

const btnStyle = {
  color: "#FFFFF",
  fontWeight: "bold",
  fontSize: "13.5px",
  borderWidth: "1.2px",
};

const navbarStyle = {
  
}
export default TopNav;
