import React from "react";
import { useQuery } from "react-query";
import List from "./List";

export default () => {
  const fetcher = () =>
    fetch(
      "https://api.themoviedb.org/3/trending/tv/day?api_key=d0278f3771ae9e001fe1e92efaa54a42",
    ).then((r) => r.json());

  const { data, error } = useQuery("daolyShows", fetcher);

  if (error) return <div>failed to load</div>;

  if (data) {
    return (
      <div>
        <h4>TV Shows:</h4>
        <List list={data.results} />
      </div>
    );
  }
  return null;
};
