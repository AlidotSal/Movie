import React from "react";
import { useQuery } from "react-query";
import Loading from "../components/Loading";

export default () => {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiKey = "6f55e05d679b49ce9d686a1fae63135e";
  const url = `${proxyUrl}https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=${apiKey}`;
  const request = new Request(url);

  const { data, error, status } = useQuery("news", () =>
    fetch(request).then((r) => r.json()),
  );

  if (status === "loading") return <Loading />;
  if (status === "error") return <div>{error}</div>;
  return (
    <div>
      {data.articles.map((n) => (
        <Card key={n.url} news={n} />
      ))}
    </div>
  );
};

function Card({ news }) {
  return (
    <div className="news">
      <a href={news.url}>
        <img src={news.urlToImage} />
        <h4>{news.title}</h4>
        <div
          className="detail"
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "1em",
          }}
        >
          <span>{news.source.name}</span>
          <span>{news.publishedAt.substring(0, 10)}</span>
        </div>
      </a>
    </div>
  );
}
