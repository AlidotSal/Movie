import React from "react";
import { useQuery } from "react-query";
import List from "./List";

export default () => {
  const fetcher = () =>
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=d0278f3771ae9e001fe1e92efaa54a42&region=US",
    ).then((r) => r.json());

  const { data, error } = useQuery("upcoming", fetcher);

  if (error) return <div>failed to load</div>;

  if (data) {
    return (
      <div className="upcoming">
        <h3>Coming Soon To Theaters:</h3>
        <List list={data.results} />
      </div>
    );
  }
  return null;
};
