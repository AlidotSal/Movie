import React from "react";
import { Link } from "react-router-dom";
import "./list.css";

export default ({ list }) => {
  return (
    <div className="list">
      <div>
        {list.map((item) => (
          <Link key={item.id} to={`/${item.media_type ?? "movie"}/${item.id}`}>
            <section>
              <img
                src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                width="200"
                height="300"
                alt={item.title || item.name}
                loading="lazy"
              />
            </section>
          </Link>
        ))}
      </div>
    </div>
  );
};
