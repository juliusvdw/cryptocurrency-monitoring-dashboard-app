import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {GraphUp, PlusCircle} from 'react-bootstrap-icons';


import WatchlistContext from "../../context/watchlist/watchlistContext";
import AuthContext from "../../context/auth/authContext";

const AllCoinsItem = (props) => {
  const watchlistContext = useContext(WatchlistContext);
  const authContext = useContext(AuthContext);

  const {user} = authContext;

  const { watchlistAdd } = watchlistContext;
  const {
    id,
    current_price,
    price_change_percentage_24h,
    market_cap,
    total_volume,
    image,
    symbol,
  } = props.coin;

  return (

    <Link to = {`/coin/${id}`} style = {{textDecoration:'none'}}>
    <div className = 'allcoins-item-container' style = {containerStyle}>

      <div className = 'coin-id-container' style = {idContainerStyle}>
        <span><img src = {image} style = {imageStyle} className = 'allcoins-image'/></span>
        <span className = 'pl-3' style = {idStyle}>{id.length < 9 ? id.replace(id.charAt(0), id.charAt(0).toUpperCase()) : symbol.toUpperCase()}</span>
        <span style = {symbolStyle} className = 'allcoins-symbol'>{symbol.toUpperCase()}</span>
        <span style = {graphStyle} className = 'icon-container'><Link to = {`/chart/${symbol}usd`}><GraphUp className = 'graph-icon'/></Link></span>
        </div>

        <div className = 'price-container allcoins-stat' style = {infoContainerStyle}>
          <span style = {priceStyle}>$ {current_price}</span>
        </div>

           

        <div
                 style={{
              color: price_change_percentage_24h > 0 ? "#4E9D66" : "#F14848", flex:'1', fontWeight:'bold',fontSize:'15px'
            }}
            className = 'allcoins-stat'
          >
            {price_change_percentage_24h && price_change_percentage_24h < 0
              ? String(price_change_percentage_24h).slice(1, 5)
              : String(price_change_percentage_24h).slice(0, 4)}{" "}
            %
          </div>

          { user != null &&<div className = 'add-icon-container'><span className = 'mr-4'><PlusCircle className = 'add-icon' onClick = {() => watchlistAdd(id)}/></span></div> }


    </div>
    </Link>
   
  );
};

const containerStyle = {
  display:'flex',
  borderBottom:'1px solid rgb(240,240,240)',
  height:'85px',
  alignItems:'center',
  color:'#021E69'
}

const imageStyle = {
  height:'45px',
  width:'45px'
}

const idContainerStyle = {
  flex:'2'
}
const idStyle = {
  fontWeight:'450'
}

const symbolStyle = {
  fontSize:'12px',
  color:'#A5A5A5',
  marginLeft :'10px',
  fontWeight:'bold'
}

const infoContainerStyle = {
  flex:'1',
  fontSize:'15px'
}

const priceStyle = {

}

const graphStyle = {
  paddingLeft:'30px',
  color:'#374FC9',
  fontSize:'18px'
}

export default AllCoinsItem;


{/* <div
className="row  pt-3 allcoin-item-container"
style={{ minHeight: "60px", borderBottom: "1px solid #555555" }}
>
<div className="col-lg-3 col-md-4 d-flex flex-row">
  <img
    className=" img-fluid "
    src={`${image}`}
    style={{ height: "25px", width: "25px" }}
  />
  <span className="pl-4">
    <Link
      className="coin-link"
      to={`coin/${id}`}
      style={{ textDecoration: "none", color: "#ffff" }}
    >
      {id.replace(id.charAt(0), id.charAt(0).toUpperCase())}{" "}
    </Link>
  </span>
</div>

<div className="col-lg-2 col-md-3 mt-1 ">$ {current_price}</div>

<div
  className="col-lg-1 col-md-2 mt-1 mb-2"
  style={{
    color: price_change_percentage_24h > 0 ? "lightgreen" : "#F14848",
  }}
>
  {price_change_percentage_24h && price_change_percentage_24h < 0
    ? String(price_change_percentage_24h).slice(1, 5)
    : String(price_change_percentage_24h).slice(0, 4)}{" "}
  %
</div>

<div className="col-lg-3 col-md-3 d-none d-lg-block">
  $ {total_volume}
</div>

<div className="col-lg-2 col-md-2 d-none d-lg-block">$ {market_cap}</div>

<div className="col-lg-1 col-md-2 d-none d-md-block">
  <span onClick={() => watchlistAdd(id)} className="watchlist-add-btn">
    <i
      className="fas fa-plus "
      style={{ fontSize: "1.6rem", color: "lightgreen" }}
    />
  </span>
</div>
</div> */}
