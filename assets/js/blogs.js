import { marked } from "marked";

const authors = {
  andy: ["Andy Zhang", "primary"],
  marcus: ["Marcus Hung", "secondary"],
  elo: ["Ethan Lo", "danger"],
  jack: ["Jack Tang", "success"],
  magnus: ["Magnus Chan", "warning"],
  zack: ["Magnus Chan", "info"],
};

async function getContent(name) {
  const response = await fetch(`https://raw.githubusercontent.com/Pandurance/Pandurance-blogs/main/pages/${name}.md`);
  if (!response.ok) {
    console.warn("Load failed!");
    window.location.replace("/error.html");
    return;
  }
  const content = await response.text();

  return marked.parse(content);
}

function makeAuthor(name) {
  const authorName = authors[name][0];
  const bgColor = authors[name][1];
  return `<p class="badge rounded-pill text-bg-${bgColor}">${authorName}</p>`;
}

function makeImage(name) {
  return `https://github.com/Pandurance/Pandurance-blogs/raw/main/previews/${name}.png`;
}

// https://stackoverflow.com/a/26744533/14868780
function getSearchParams(k) {
  var p = {};
  location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (s, k, v) {
    p[k] = v;
  });
  return k ? p[k] : p;
}

export async function getBlogs(populateCards = false) {
  const response = await fetch("https://raw.githubusercontent.com/ZCG-coder/Pandurance-blogs/main/index.json");
  const content = await response.text();
  const elm = $("#blog-entries");
  const obj = JSON.parse(content);
  global.obj = obj;

  const featuredBlogKey = Object.keys(obj).pop();
  global.featuredBlogKey = featuredBlogKey;
  const featuredBlog = obj[featuredBlogKey];
  const title = featuredBlog["name"];
  const desc = featuredBlog["desc"];
  $("#featured-blog-title").html(title);
  $("#featured-blog-desc").html(desc);
  $("#idx-learn-more").attr("data-bs-target", `#blog-modal-${featuredBlogKey}`);
  if (!populateCards) return;

  for (const key in obj) {
    const value = obj[key];
    const title = value["name"];
    const name = value["author"];
    const date = value["date"];

    elm.append(`
    <div class="col">
      <div class="card">
        <img
          class="card-img-top"
          style="object-fit: cover;"
          src="${makeImage(key)}"
        />
        <div class="card-body p-4">
          <h4 class="card-title"><a href="/blog?id=${key}">${title}</a></h4>
          <p class="text-muted">${makeAuthor(name)} ${date}</p>
          <p class="card-text">${value["desc"]}
          </p>
        </div>
      </div>
    </div>`);
  }
}

$(async function () {
  global.obj = undefined;
  await getBlogs(false);

  $("#featured-blog-container").html(`
      <p class="fw-bold text-primary mb-2">Driven to win</p>
      <h1 class="fw-bold mb-4">Pandurance Racing</h1>
      <h2 id="featured-blog-title">Title</h2>
      <p id="featured-blog-desc">Desc</p>
      <a class="btn btn-primary btn-lg" href="/blog?id=${global.featuredBlogKey}">Learn More</a>
  `);
  $("#featured-blog-learn-more").attr("href", `/blog?id=${global.featuredBlogKey}`);
  await getBlogs(true);

  const id = getSearchParams("id");
  if (id !== undefined) {
    console.log(id);
    $(`#blog-text`).html(await getContent(id));
    $(`#non-blog-text`).html(``);

    const author = global.obj[id]["author"];
    const date = global.obj[id]["date"];
    const elm = $(`#${id}`);
    elm.html(await getContent(id));
    $(`<p class="text-muted">${makeAuthor(author)} ${date}</p>`).insertAfter($("div#blog-text > h1"));
    var math = document.getElementById(`blog-text`);
    MathJax.typeset();
    return;
  }
});
