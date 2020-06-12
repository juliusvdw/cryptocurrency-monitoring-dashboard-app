import React, { useReducer } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

import { SET_USER } from "../Types";

const AuthState = (props) => {
  const initialState = {
    user: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const { setLoginModalShow, setRegisterModalShow } = props;

  //set User state
  const setUser = (user) => {
    dispatch({ type: SET_USER, payload: user });
  };

  //Get logged in user
  const getUser = async () => {
    try {
      const res = await axios.get("/auth/user");

      const data = res.data;

      if (res.data.user) {
        const username = data.user.username;
        const id = data.user._id;
        const user = { username, id };
        setUser(user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //User Register
  const userLogin = async (formData) => {
    try {
      const res = await axios({
        method: "post",
        url: "/auth/login",
        data: formData,
      });

      const data = res.data;

      if (data.success === true) {
        const username = data.user.username;
        const id = data.user._id;
        const user = {
          username,
          id,
        };
        setUser(user);
        setLoginModalShow(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //User Login
  const userRegister = async (formData) => {
    try {
      const res = await axios({
        method: "post",
        url: "/auth/register",
        data: formData,
      });

      const data = res.data;

      if (data.success === true) {
        console.log("succesfully registered user");

        setRegisterModalShow(false);
      } else {
        console.log("registration failure");
      }
    } catch (err) {
      console.log(err);
    }
  };
  //User Logout
  const userLogout = async () => {
    try {
      console.log("logging out");
      await axios.get("/auth/logout");
      dispatch({ type: SET_USER, payload: null });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        getUser,
        userLogin,
        userRegister,
        userLogout,
        setUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
