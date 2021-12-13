import React, { useRef, useState, useEffect } from "react";
import "./movie-dropdown.css";
import { Link } from "react-router-dom";

export default () => {
  const [list, setList] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 600);
  const inputRef = useRef();

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=d0278f3771ae9e001fe1e92efaa54a42&query=${searchTerm
          .split(" ")
          .join("+")}`,
      )
        .then((res) => res.json())
        .then((data) => setList(data?.results));
    } else {
      setList(null);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="search-area">
      <div className="search-bar">
        <label>
          <input
            ref={inputRef}
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="type a movie title"
          ></input>
          <span
            onClick={() => {
              inputRef.value = "";
              inputRef.focus();
              setList(null);
            }}
            style={{
              position: "absolute",
              display: "block",
              top: "3px",
              right: "10px",
              width: "15px",
              height: "15px",
              background: 'url("../../assets/images/clear.svg")',
              cursor: "pointer",
            }}
          ></span>
        </label>
      </div>
      {list && (
        <ul className="drop-down">
          {list.map((item) => (
            <Link key={item.id} to={`/${item.media_type}/${item.id}`}>
              <li>
                <img
                  src={`https://image.tmdb.org/t/p/w200${
                    item.poster_path || item.profile_path
                  }`}
                />
                <div className="text">
                  <h3>{item.title || item.name}</h3>
                  <div className="meta">
                    {item.release_date && (
                      <p>{item.release_date.split("-")[0]}</p>
                    )}
                    <p>{item.media_type}</p>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
