export default function (urls) {
  return Promise.all(
    urls.map((url) => fetch(url).then((response) => response.json())),
  );
}
