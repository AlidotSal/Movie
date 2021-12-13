import React from "react";
import { useQuery } from "react-query";
import List from "./list/List";
import Loading from "./Loading";
import fetchAll from "../utils/fetchAll";
import instagram from "url:../assets/images/instagram.svg";
import twitter from "url:../assets/images/twitter.svg";
import facebook from "url:../assets/images/facebook.svg";
import imdb from "url:../assets/images/imdb.svg";
import "./person.css";

export default ({ id }) => {
  const urls = [
    `https://api.themoviedb.org/3/person/${id}?api_key=d0278f3771ae9e001fe1e92efaa54a42`,
    `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=d0278f3771ae9e001fe1e92efaa54a42`,
    `https://api.themoviedb.org/3/person/${id}/external_ids?api_key=d0278f3771ae9e001fe1e92efaa54a42&language=en-US`,
  ];

  const { status, data } = useQuery(`data${id}`, () => fetchAll(urls));

  if (status === "error") return "An error has occurred.";
  if (status === "loading") return <Loading />;
  if (status === "success") {
    return (
      <PersonUI data={data[0]} credits={data[1].cast} externals={data[2]} />
    );
  }
};

function PersonUI({ data, credits, externals }) {
  const defaultProfile =
    "https://cdn0.iconfinder.com/data/icons/user-interface-line-19/32/ui_6-512.png";
  const { facebook_id, twitter_id, instagram_id, imdb_id } = externals;

  document.title = `${data.name} - MyMDb`;

  return (
    <div className="person">
      <main>
        <div className="header">
          <div className="photo">
            <img
              src={`https://image.tmdb.org/t/p/w200${data.profile_path}`}
              alt=""
            />
          </div>
          <div>
            <h3>{data.name}</h3>
            <div className="externals">
              {imdb_id && (
                <div>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.imdb.com/name/${imdb_id}/`}
                  >
                    <img className="icon" src={imdb} alt="" />
                  </a>
                </div>
              )}
              {facebook_id && (
                <div>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.facebook.com/${facebook_id}/`}
                  >
                    <img className="icon" src={facebook} alt="" />
                  </a>
                </div>
              )}
              {instagram_id && (
                <div>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.instagram.com/${instagram_id}/`}
                  >
                    <img className="icon" src={instagram} alt="" />
                  </a>
                </div>
              )}
              {twitter_id && (
                <div>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.twitter.com/${twitter_id}/`}
                  >
                    <img className="icon" src={twitter} alt="" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        <section>
          <h2>BioGraphy</h2>
          <div>
            <p>{data.biography}</p>
            <p>Birth: {data.birthday}</p>
            {data.deathday && <p>Death: {data.deathday}</p>}
            <p>{data.gender === 1 ? "Female" : "Male"}</p>
            <p>known for: {data.known_for_department}</p>
            <p>born in: {data.place_of_birth}</p>
          </div>
        </section>
      </main>
      <div className="credits">
        <h4>Known For</h4>
        <List list={credits.slice(0, 10)} />
      </div>
    </div>
  );
}
