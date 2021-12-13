import { createSignal } from "solid-js";
import "./movie-dropdown.css";
import { Link } from "@rturnq/solid-router";

export default () => {
  const [list, setList] = createSignal(null);

  function handleInput(input) {
    fetch(
      `http://www.omdbapi.com/?apikey=bfd0caba&s=${input.split(" ").join("+")}`
    )
      .then((res) => res.json())
      .then((data) => setList(data?.Search));
  }

  return (
    <div class="search-area">
      <div class="search-bar">
        <label>
          <input
            type="text"
            onChange={(e) => handleInput(e.target.value)}
            placeholder="type a movie title"
          ></input>
        </label>
      </div>
      <Show when={list()}>
        <ul class="drop-down">
          <For each={list()}>
            {(item) => (
              <Link
                href={`/${item.Type === "movie" ? "movie" : "tv"}/${
                  item.imdbID
                }`}
              >
                <li>
                  <img src={item.Poster} />
                  <div class="text">
                    <h3>{item.Title}</h3>
                    <div class="meta">
                      <p>{item.Year}</p>
                      <p>{item.Type}</p>
                    </div>
                  </div>
                </li>
              </Link>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
};
