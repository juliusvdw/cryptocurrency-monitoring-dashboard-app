import React, { useReducer } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import axios from "axios";

import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

import { SET_USER, CLEAR_WATCHLIST_COINS } from "../Types";

const AuthState = (props) => {
  const initialState = {
    user: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const { setLoginModalShow, setRegisterModalShow } = props;

  
  //set User state
  const setUser = (user) => {

    console.log('setting user')
     dispatch({ type: SET_USER, payload: user });
  };

  //Get logged in user
  const getUser = async () => {
    try {
      const user = auth.currentUser;
        
      if (user) {

        console.log(user)
        // const username = data.user.username;
        // const id = data.user._id;
        // const user = { username, id };
        // setUser(user);
      } 
    } catch (err) {
      console.log(err);
    }
  };

  //User Login
  const userLogin = async (formData) => {
    try {
      console.log("logging in");
      const user = await signInWithEmailAndPassword(auth, formData.username, formData.password)
      console.log(user)
      // if (user) {
      //   const username = data.user.username;
      //   const id = data.user._id;
      //   const user = {
      //     username,
      //     id,
      //   };
      //   await setUser(user);
      //   setLoginModalShow(false);
      //   window.location.reload();
      // }
    } catch (err) {
      console.log(err);
    }
  };

  //Create watchlist
  const createWatchlist = async () => {
    try {
      await axios.post(
        "/watchlist/create"
      );
    } catch (err) {
      console.log(err);
    }
  };

  //User Register
  const userRegister = async (formData) => {

    try {
      const data = await createUserWithEmailAndPassword(auth,formData.username, formData.password)
      const user = data.user
      
      const userInfo = {
          username: formData.username,
          id: user.uid
        };

        
          setUser(userInfo);
          setRegisterModalShow(false);
          window.location.reload();
        

    } catch (error) {
      console.log(error.message, '123456')
    }
  };

  
  //User Logout
  const userLogout = async () => {
    try {
      console.log("logging out");
      await axios.get("/auth/logout");
      dispatch({ type: SET_USER, payload: null });
      console.log('logged out')

      window.location.reload();
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
