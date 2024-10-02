const authors = {
  andy: ["Andy Zhang", "primary"],
  marcus: ["Marcus Hung", "secondary"],
  elo: ["Ethan Lo", "danger"],
  jack: ["Jack Tang", "success"],
  magnus: ["Magnus Chan", "warning"],
  zack: ["Magnus Chan", "info"],
};

export function makeAuthor(name) {
  const authorName = authors[name][0];
  const bgColor = authors[name][1];
  return `<p class="badge rounded-pill text-bg-${bgColor}">${authorName}</p>`;
}

// https://stackoverflow.com/a/26744533/14868780
export function getSearchParams(k) {
  let p = {};
  location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (s, k, v) {
    p[k] = v;
  });
  return k ? p[k] : p;
}
