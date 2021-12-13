import React from "react";
import DailyShows from "./list/DailyShows";
import Upcoming from "./list/Upcoming";
import DailyMovies from "./list/DailyMovies";
import Weekly from "./list/Weekly";

export default () => {
  return (
    <main className="home-lists">
      <Upcoming />
      <div className="trending">
        <h3>Trending</h3>
        <DailyMovies />
        <DailyShows />
        <Weekly />
      </div>
    </main>
  );
};
