import React, { useReducer, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import axios from "axios";

import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

import { SET_USER, SET_LOGIN_LOADING, SET_REGISTER_LOADING, CLEAR_LOGIN_LOADING, CLEAR_REGISTER_LOADING} from "../Types";

const AuthState = (props) => {
  const initialState = {
    user: null,
    loginLoading: false,
    registerLoading:false
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const { setLoginModalShow, setRegisterModalShow } = props;

  //Update user on auth state change 
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user, 'user logged in')
        //Store user info to be stored in user state with setUser
        const userInfo = {
          username: user.email,
          id: user.uid
        };

        //Set user state globally
         setUser(userInfo);
       
      } else {
        console.log('no user logged in')
      }
    });
  },[])

  
  //set User state
  const setUser = (user) => {
     dispatch({ type: SET_USER, payload: user });
  };


  //User Login
  const userLogin = async (formData) => {

    setLoading('login')
    try {
      //Login with firebase
      const data = await signInWithEmailAndPassword(auth, formData.username, formData.password)
      const user = data.user
      
        setLoginModalShow(false);
        // window.location.reload();
      
    } catch (err) {
      console.log(err);
    }

    clearLoading('login')
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

    setLoading('register')

    try {
      //Register with firebase
      const data = await createUserWithEmailAndPassword(auth,formData.username, formData.password)
      const user = data.user
  
      setRegisterModalShow(false);
      // window.location.reload();
        
    } catch (error) {
      console.log(error.message)
    }

      clearLoading('register')
  };


  //User Logout
  const userLogout = async () => {
    try {
      await signOut(auth)
      setUser(null)
    } catch (err) {
      console.log(err);
    }
  };

  //Set loading for login + register 
  const setLoading = (authType) => {
    if(authType == 'login') {
      dispatch({type:SET_LOGIN_LOADING})
    } else {
      dispatch({type:SET_REGISTER_LOADING})
    }
  }

  //Clear loading 
  const clearLoading = (authType) => {
    if(authType = 'login') {
      dispatch({type:CLEAR_LOGIN_LOADING})
    }else {
      dispatch({type:CLEAR_REGISTER_LOADING})
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loginLoading:state.loginLoading,
        registerLoading:state.registerLoading,
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
