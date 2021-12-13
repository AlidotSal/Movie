import React from "react";
import { useQuery } from "react-query";
import List from "./list/List";
import Loading from "./Loading";
const Cast = React.lazy(() => import("./list/CastList"));
const Videos = React.lazy(() => import("./list/Videos"));
import fetchAll from "../utils/fetchAll";
import "./movie.css";

export default ({ id }) => {
  const urls = [
    `https://api.themoviedb.org/3/movie/${id}?api_key=d0278f3771ae9e001fe1e92efaa54a42`,
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=d0278f3771ae9e001fe1e92efaa54a42&language=en-US`,
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=d0278f3771ae9e001fe1e92efaa54a42&language=en-US`,
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=d0278f3771ae9e001fe1e92efaa54a42&language=en-US&page=1`,
  ];

  const { status, data } = useQuery(`data${id}`, () => fetchAll(urls));

  if (status === "error") return "An error has occurred.";
  if (status === "loading") return <Loading />;
  if (status === "success") {
    return (
      <MovieUI
        data={data[0]}
        videos={data[1]}
        cast={data[2].cast}
        recommends={data[3].results}
      />
    );
  }
};

function MovieUI({ data, videos, cast, recommends }) {
  const movieYear = data.release_date.split("-")[0];
  document.title = `${data?.title} (${movieYear}) - MyMDb`;

  return (
    <>
      <div className="movie">
        <div className="header">
          <img
            srcSet={`https://image.tmdb.org/t/p/w500${data.poster_path} 500w, https://image.tmdb.org/t/p/original${data.poster_path} 1200w`}
            sizes="(max-width: 500px) 500px, 1000px"
            src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
            alt=""
          />
          <div className="text">
            <h2>
              {data.title.toUpperCase()} <span>({movieYear})</span>
              {/* <span>
                      {data()?.imdbRating} /
                      <span style={`font-size: .5em`}>{data()?.imdbVotes}</span>
                    </span> */}
            </h2>
            <div>
              {/* {data()?.Rated} | */} {~~(data.runtime / 60)}h{" "}
              {data.runtime % 60}
              min |{"  "}
              <span>
                {data.genres.map((genre) => genre.name).join(", ")} |{"  "}
              </span>
              <div className="companies">
                {data.production_companies.map((c) => (
                  <span>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${c.logo_path}`}
                      alt={c.name}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <main>
          <h4 className="plot">Plot</h4>
          <p>{data.overview}</p>
          {/* <h5>Director: {data.Director}</h5>
          <h5>Writers: {data.Writer.split(", ").slice(0, 2).join(", ")}</h5> */}
          <Cast list={cast} />
          <div>
            <span
              style={{
                padding: "3px",
                color: "white",
                background: "#66cc33",
              }}
            >
              {data.Metascore}
            </span>{" "}
            Metascore
          </div>
          <hr />
          <div style={{ padding: "10px 20px", background: "#EFE3A4" }}>
            Awards: {data.Awards} see more awards.
          </div>
          <hr />
          {/* <List list={videos} /> */}
          <hr />
          <hr />
          {data.budget && (
            <div className="box-office">
              <h4>Box Office</h4>
              <h6>Budget: ${data.budget.toLocaleString()}</h6>
              <h5>Gross USA: {data.BoxOffice}</h5>
              <h5>Gross WorldWide: ${data.revenue.toLocaleString()}</h5>
            </div>
          )}
        </main>
      </div>
      <hr />
      <div className="recommendations">
        <List list={recommends} />
      </div>
    </>
  );
}
