// https://stackoverflow.com/a/26744533/14868780
export function getSearchParams(k) {
  let p = {};
  location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (s, k, v) {
    p[k] = v;
  });
  return k ? p[k] : p;
}
