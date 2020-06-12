import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

//bring in news context
import NewsContext from "../../context/news/newsContext";
import NewsItem from "./NewsItem";

const News = () => {
  const [articleAmount, setArticleAMount] = useState(16);

  let location = useLocation();

  const newsContext = useContext(NewsContext);

  const { news, newsLoading } = newsContext;

  if (!newsLoading && news.length > 1) {
    const newsList = news.map((article) => {
      const title = article.title,
        image = article.originalImageUrl,
        url = article.url,
        description = article.description,
        date = article.publishedAt;

      return <NewsItem newsData={{ title, image, url, description, date }} />;
    });

    //return news list to client

    return (
      <div className="row " style={{ marginTop: "30px" }}>
        {
          //conditionally return amount of articles displayed based on pathname
          location.pathname === "/"
            ? newsList.slice(0, 8)
            : newsList.slice(0, articleAmount)
        }

        {
          //display view more button on News page only, until MAX 40 articles are displayed
          location.pathname === "/news" && articleAmount <= 40 ? (
            <div
              className="btn btn-lg btn-outline-primary mx-auto text-white"
              style={{
                marginBottom: "35px",
                marginTop: "25px",
                borderWidth: "1.5px",
              }}
              onClick={() => setArticleAMount(articleAmount + 8)}
            >
              View more
            </div>
          ) : (
            <> </>
          )
        }
      </div>
    );
  } else {
    return (
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
  }

  return <div className="row"></div>;
};

export default News;
