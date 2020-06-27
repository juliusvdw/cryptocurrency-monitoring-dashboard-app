import React, { useContext } from "react";

import CoinFeedContext from "../../context/coinFeed/coinFeedContext";

const CoinInfo = () => {
  const coinFeedContext = useContext(CoinFeedContext);
  const { stats } = coinFeedContext;

  //declare output var
  let output;

  //Dclare var to store descriptions once it has loaded
  let description;

  //see whether stats have loaded
  if (stats) description = stats.description.en;

  //Determine wheter the news or loading will be displayed based on the state of news
  if (!stats) {
    output = <div>Loading</div>;
  } else {
    output = <div dangerouslySetInnerHTML={{ __html: description }}></div>;
  }

  return (
    <div className="jumbotron " style={{ backgroundColor: "#2D2D2D" }}>
      <h5>Description</h5>
      {output}
    </div>
  );
};

export default CoinInfo;
