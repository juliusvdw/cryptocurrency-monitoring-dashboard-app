import React, { useContext } from "react";

import NavSearchBox from "./NavSearchBox";

import AuthContext from "../../context/auth/authContext";

const TopNav = ({ setRegisterModalShow, setLoginModalShow }) => {
  const authContext = useContext(AuthContext);
  const { user, userLogout } = authContext;

  return (
    <nav
      className="navbar navbar-light d-flex  "
      style={{ background: "#141414" }}
    >
      <a
        className="navbar-brand  text-white d-none d-md-flex"
        href="#"
        style={{
          marginLeft: "70px",
          fontWeight: "bold",
          height: "60px",
          fontSize: "32px",
        }}
      >
        cryptohawk
      </a>

      <a
        className="d-md-none mx-auto text-white"
        style={{
          marginLeft: "60px",
          fontWeight: "bold",
          fontSize: "30px",
          height: "60px",
        }}
      >
        cryptohawk
      </a>

      <div className="d-none d-lg-block  mx-auto" style={{ width: "41%" }}>
        <NavSearchBox />
      </div>

      <div className="d-none d-md-block d-lg-none   mx-auto">
        <NavSearchBox />
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
          <div
            className="btn btn-outline-primary nav-btn"
            style={btnStyle}
            onClick={setRegisterModalShow}
          >
            Create account
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
  );
};

const btnStyle = {
  color: "white",
  fontWeight: "bold",
  fontSize: "13.5px",
  borderWidth: "1.2px",
};
export default TopNav;
