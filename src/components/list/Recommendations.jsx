import { Link } from "react-router-dom";
import fetchAll from "../../utils/fetchAll";
// import placeHolder from "../../assets/images/poster-placeholder.webp";
import "./recommendations.css";

export default () => {
  const [movies, setMovies] = createSignal([]);
  const urls = props.recommendations.map(
    (item) =>
      `https://api.themoviedb.org/3/${props.media_type}/${item.id}/external_ids?api_key=d0278f3771ae9e001fe1e92efaa54a42&language=en-US`,
  );
  fetchAll(urls).then((data) =>
    setMovies(data.map((ids, i) => ({ ...ids, ...props.recommendations[i] }))),
  );

  return (
    <div class="recommendations">
      <h4>Recommended By Other Users:</h4>
      <div>
        <For each={movies()}>
          {(item) => {
            return (
              <Link href={`/${props.media_type}/${item.imdb_id}`}>
                <section>
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                        : placeHolder
                    }
                    alt={item.title || item.name}
                    loading="lazy"
                  />
                </section>
              </Link>
            );
          }}
        </For>
      </div>
    </div>
  );
};
