import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import WatchlistContext from "../../context/watchlist/watchlistContext";
import CoinFeedContext from "../../context/coinFeed/coinFeedContext";

const NavSearchBox = () => {
  const [searchValue, setSearchValue] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState("none");

  const watchlistContext = useContext(WatchlistContext);
  const coinFeedContext = useContext(CoinFeedContext);

  const { cryptos, setCryptos } = watchlistContext;
  const { getCoinFeed } = coinFeedContext;

  let history = useHistory();

  //if cryptos array is empty, fetch from watchlistContext on first render
  useEffect(() => {
    if (cryptos.length < 1) {
      setCryptos();
    }
  }, []);

  //fetch crypto suggestion values from cryptos state and push them to suggestion values
  let suggestionValues = [];
  cryptos.length > 1
    ? cryptos.forEach((coin) => suggestionValues.push(coin.id))
    : (suggestionValues = suggestionValues);

  //create onChange to change search value as user modifies input text
  const onChange = (e) => {
    setSearchValue(e.target.value);

    const suggestions = suggestionValues.filter((value) => {
      return value.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
    });

    setSuggestions(suggestions);

    if (e.target.value.length !== 0 && suggestions.length > 0) {
      setShowSuggestions("block");
    } else {
      setShowSuggestions("none");
      clearSuggestions();
    }
  };

  //create onSubmit for if the user presses enter instead of clicking the link on the dropdown. This will push history to the coin page

  const onSubmit = (e) => {
    e.preventDefault();

    setSearchValue("");
    setShowSuggestions("none");

    history.push(`/coin/${searchValue}`);
  };

  //onCLick if user clicks the link
  const onClick = (e) => {
    console.log(searchValue);
    clearSuggestions();
    clearSearch();
  };

  //clear suggestions

  const clearSuggestions = () => {
    setSuggestions([]);
  };

  //clear search
  const clearSearch = () => {
    setSearchValue("");
    setShowSuggestions("none");
  };

  //output suggestions list conditionally
  let suggestionsList;

  suggestions.length > 0
    ? (suggestionsList = suggestions.map((value) => (
        <Link
          to={`/coin/${value}`}
          onClick={() => onClick()}
          style={{ textDecoration: "none", color: "black" }}
        >
          <li
            style={{
              listStyle: "none",
              height: "40px",
              borderBottom: "1px solid lightgray",
            }}
            className=" suggestion-list w-100"
            onClick={(e) => {
              getCoinFeed(e.target.innerText);
            }}
          >
            <p className="pt-2 ml-2 pb-2">{value}</p>
          </li>
        </Link>
      )))
    : (suggestionsList = <></>);

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="form-control search-input"
          value={searchValue}
          onChange={onChange}
          placeholder="Search..."
          style={inputStyle}
        ></input>
      </form>

      <div
        id="auto-suggest"
        className="  "
        style={{
          position: "absolute",
          display: `${showSuggestions}`,
          zIndex: "100",
          width: "27%",
          maxHeight: "250px",
          overflowY: "auto",
          borderRadius : '15px',
          marginTop:'7px',
          border : '1px solid #F0F0F0',
          backgroundColor : 'white'
          
        }}
      >
        <ul className=" py-0 px-0 ">{suggestionsList}</ul>
      </div>
    </Fragment>
  );
};

const inputStyle = {
  height: "44px",
  borderRadius: "5px 5px 0px 0px",
};
export default NavSearchBox;
