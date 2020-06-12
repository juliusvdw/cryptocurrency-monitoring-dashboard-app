import React from "react";

const NewsItem = (props) => {
  const { title, image, description, url, date } = props.newsData;

  return (
    <div className="col-lg-3 col-md-6">
      <div className="card  text-white" style={cardStyle}>
        <div className="article-image">
          <img
            className="img-fluid"
            src={`${image}`}
            style={{ height: "200px", width: "100%" }}
          />
        </div>

        <div className="card-body">
          <div
            className="article-title"
            style={{ fontSize: "1.2rem", fontWeight: "600" }}
          >
            <a
              className="article-link"
              href={`${url}`}
              target="_blank"
              style={{ textDecoration: "none", color: "white" }}
            >
              {title.slice(0, 95)}
            </a>
          </div>

          <div className="article-text mt-3" style={{ fontSize: "0.95rem" }}>
            <p>{description.slice(0, 200)}...</p>
          </div>

          <div
            className="article-date mt-3 w-100 text-right"
            style={{ fontSize: "0.8rem" }}
          >
            <p className=" w-100">
              Published on {date.slice(0, date.indexOf("T"))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const cardStyle = {
  borderRadius: "5px",
  backgroundColor: "#2D2D2D",
  marginBottom: "20px",
};

export default NewsItem;
