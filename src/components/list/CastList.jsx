import React from "react";
import { Link } from "react-router-dom";
// import defaultProfile from "../../assets/images/profile.svg";
import "./cast-list.css";

export default ({ list }) => {
  function splitName(fullName) {
    const array = fullName.split(" ");
    const first = array.shift();
    const last = array.join(" ");
    return [first, last];
  }

  if (list) {
    return (
      <div className="cast">
        <h5>Cast:</h5>
        <ul className="cast-list">
          {list.slice(0, 12).map((actor) => (
            <li key={actor.id} className="actor">
              <div>
                <Link className="picture" to={`/person/${actor.id}`}>
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                        : ""
                    }
                    alt=""
                    loading="lazy"
                  />
                </Link>
              </div>
              <div className="text">
                <Link className="name" to={`/person/${actor.id}`}>
                  {splitName(actor.name).map((name) => (
                    <p key={name}>{name}</p>
                  ))}
                </Link>
                <span>{actor.character.split("/").pop()}</span>
              </div>
            </li>
          ))}
          <li>
            <Link style={{ marginRight: "2em" }} to={`/crew`}>
              see All
            </Link>
          </li>
        </ul>
      </div>
    );
  }
  return null;
};
