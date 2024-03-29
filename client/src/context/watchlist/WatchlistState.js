import React, { useReducer, useEffect, useContext } from "react";
import {  onAuthStateChanged } from "firebase/auth";
import {collection, doc, getDoc,updateDoc } from 'firebase/firestore'
import { auth, firestore } from "../../config/firebaseConfig";

import axios from "axios";


import WatchlistContext from "./watchlistContext";
import WatchlistReducer from "./watchlistReducer";
import {
  GET_WATCHLIST_COINS,
  SET_COIN_DATA,
  SET_CRYPTOS,
  SET_LOADING,
  CLEAR_LOADING,
  WATCHLIST_ADD,
  WATCHLIST_DELETE,
  CLEAR_WATCHLIST_COINS,
} from "../Types";

import AuthContext from "../auth/authContext";


const WatchlistState = (props) => {
  const initialState = {
    loading: null,
    cryptos: [],
    watchlist: [
      { id: "bitcoin" },
      { id: "ethereum" },
      { id: "tether" },
      { id: "ripple" },
      { id: "litecoin" },
      { id: "dash" },
      { id: "eos" },
      { id: "cardano" },
    ],
  };

  //Destructure what is needed from auth context
  const authContext = useContext(AuthContext)
  const {user} = authContext

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {

      setLoading('watchlist')

      if(user) {
        console.log(user)
        //Find user watchlist when user is logged in and set to watchlist state        
        const docRef = doc(firestore, "users", `${user.uid}`);
        const docSnap = await getDoc(docRef);
        const userData= docSnap.data()

        console.log(userData)

        dispatch({ type: GET_WATCHLIST_COINS, payload: userData.watchlist });

        clearLoading()


      } else {
        dispatch({type:CLEAR_WATCHLIST_COINS})

        clearLoading()

      }
    })

  }, [])

  const [state, dispatch] = useReducer(WatchlistReducer, initialState);

  //fetch data for each coin when loading watchlist from coingecko
  const getCoin = async (coin) => {
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin}`
      );
      const data = res.data.market_data;
      return data;
    } catch (err) {
      console.log(err);
    }
  };


  const setCryptos = async (loadingID) => {
    setLoading(loadingID);
    try {
      const res1 = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250`
      );
      const res2 = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=2&sparkline=false'        );
      const data1 = await res1.data;
      const data2 = await res2.data;

      const data = [...data1, ...data2]

      console.log(data)

      dispatch({ type: SET_CRYPTOS, payload: data });
    } catch (err) {
      console.log(err);
    }
      setTimeout(() => {
        clearLoading()
      }, 1000);
    ;
  };

  const watchlistAdd = async (id) => {

    try {
      //Find user watchlist and add coin to watchlist     
      const docRef = doc(firestore, "users", `${user.id}`);
      const docSnap = await getDoc(docRef);
      const userData= docSnap.data()

      const newWatchlist = userData.watchlist;
      newWatchlist.push({id:id})

      await updateDoc(docRef, {
        watchlist:newWatchlist
      })

      //Update watchlist state
      dispatch({ type: GET_WATCHLIST_COINS, payload: newWatchlist });

      console.log(newWatchlist)

      // dispatch({ type: WATCHLIST_ADD, payload: watchlist });
    } catch (err) {
      console.log(err);
    }
  };

  const watchlistDelete = async (id) => {

    //Remove coin instantly in local state
    dispatch({ type: WATCHLIST_DELETE, payload: id.toLowerCase() });

    try {
       //Find user watchlist and add coin to watchlist     
       const docRef = doc(firestore, "users", `${user.id}`);
       const docSnap = await getDoc(docRef);
       const userData= docSnap.data()
 
       let newWatchlist = userData.watchlist;
       newWatchlist = newWatchlist.filter((coin) => {
         return coin.id != id.toLowerCase()
       })

       console.log(newWatchlist)
 
       await updateDoc(docRef, {
         watchlist:newWatchlist
       });


      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const setLoading = (loadingID) => {
    dispatch({ type: "SET_LOADING",payload:loadingID });
  };

  const clearLoading = () => {
    dispatch({ type: "CLEAR_LOADING" });
  };

  return (
    <WatchlistContext.Provider
      value={{
        loading: state.loading,
        watchlist: state.watchlist,
        cryptos: state.cryptos,
        getCoin,
        setCryptos,
        watchlistAdd,
        watchlistDelete,
      }}
    >
      {props.children}
    </WatchlistContext.Provider>
  );
};

export default WatchlistState;
