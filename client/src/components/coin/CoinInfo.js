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
    output = (
      <div className="row " style={{ marginTop: "120px", height: "250px" }}>
        <div
          className="spinner-border text-primary mx-auto"
          role="status"
          style={{ width: "3.5rem", height: "3.5rem" }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else {
    output = <div dangerouslySetInnerHTML={{ __html: description }}></div>;
  }

  return (
    <div className="jumbotron " style={{ backgroundColor: "#2D2D2D" }}>
      <h5 className="mb-4">Description</h5>
      {output}
    </div>
  );
};

export default CoinInfo;
