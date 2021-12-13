import React from "react";
import { useQuery } from "react-query";
const Cast = React.lazy(() => import("./list/CastList"));
import List from "./list/List";
import Loading from "./Loading";
import fetchAll from "../utils/fetchAll";
import "./show.css";

export default ({ id }) => {
  const urls = [
    `https://api.themoviedb.org/3/tv/${id}?api_key=d0278f3771ae9e001fe1e92efaa54a42`,
    `https://api.themoviedb.org/3/tv/${id}/videos?api_key=d0278f3771ae9e001fe1e92efaa54a42&language=en-US`,
    `https://api.themoviedb.org/3/tv/${id}/credits?api_key=d0278f3771ae9e001fe1e92efaa54a42&language=en-US`,
    `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=d0278f3771ae9e001fe1e92efaa54a42&language=en-US&page=1`,
  ];

  const { status, data } = useQuery(`data${id}`, () => fetchAll(urls));

  if (status === "error") return "An error has occurred.";
  if (status === "loading") return <Loading />;
  if (status === "success") {
    return (
      <ShowUI
        data={data[0]}
        videos={data[1]}
        cast={data[2].cast}
        recommends={data[3].results}
      />
    );
  }
};

function ShowUI({ data, videos, cast, recommends }) {
  document.title = `${data.name} (${
    data.first_air_date.split("-")[0]
  }) - MyMDb`;

  return (
    <>
      <div className="show">
        <div className="header">
          <img
            srcSet={`https://image.tmdb.org/t/p/w500${data.poster_path} 500w, https://image.tmdb.org/t/p/original${data.poster_path} 1200w`}
            sizes="(max-width: 500px) 500px, 1000px"
            src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
            alt=""
          />
          <div className="text">
            <h2>
              {data.name.toUpperCase()}{" "}
              <span>{`(${data.first_air_date.split("-")[0]}-${
                data.status === "Ended" ? data.last_air_date.split("-")[0] : ""
              })`}</span>
              {/* <span>
                      {data()?.imdbRating} /
                      <span style={`font-size: .5em`}>{data()?.imdbVotes}</span>
                    </span> */}
            </h2>
            <div>
              <span>
                {data.genres.map((genre) => genre.name).join(", ")} |{"  "}
              </span>
              {/* {data()?.Released} ({data()?.Country.split(", ")[0]}) */}
            </div>
          </div>
        </div>
        <main>
          <h4 className="plot">Plot</h4>
          <p>{data.overview}</p>
          {/* <h5>Director: {data.Director}</h5>
          <h5>Writers: {data.Writer.split(", ").slice(0, 2).join(", ")}</h5> */}

          {data.created_by && (
            <h5>
              Created By:
              {data.created_by.map((person) => (
                <span key={person.id}>{` ${person.name}`},</span>
              ))}
            </h5>
          )}

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
          {/* <Videos videos={videos()} /> */}
          <hr />
        </main>
      </div>
      <hr />
      <div className="recommendations">
        <List list={recommends} />
      </div>
    </>
  );
}
