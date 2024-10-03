const authors = {
  andy: ["Andy Zhang", "primary"],
  marcus: ["Marcus Hung", "secondary"],
  elo: ["Ethan Lo", "danger"],
  jack: ["Jack Tang", "success"],
  magnus: ["Magnus Chan", "warning"],
  zack: ["Magnus Chan", "info"],
};

// Mapping of month abbreviations to numerical representation
const monthMap = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
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

export function parseDate(dateString) {
  // Split the date string into day, month, and year parts
  const parts = dateString.split(" ");
  const day = parseInt(parts[0], 10);
  const month = parts[1];
  const year = parseInt(parts[2], 10);

  // Parse the date
  return new Date(year, monthMap[month], day);
}

export const cyrb53 = (str, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};
