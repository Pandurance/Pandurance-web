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
  const response = await fetch(`https://raw.githubusercontent.com/ZCG-coder/Pandurance-blogs/main/pages/${name}.md`);
  const content = await response.text();

  return marked.parse(content);
}

async function appendModal(id, title, author, date) {
  $(document.body).prepend(`
    <div class="blog-modal modal" tabindex="-1" id="blog-modal-${id}">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><strong>Article</strong> – ${title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" id="modal-body-${id}"></div>
        </div>
      </div>
    </div>`);

  $(`<p class="text-muted">${makeAuthor(author)} ${date}</p>`).insertAfter($("div.modal-body > h1"));
}

function makeAuthor(name) {
  const authorName = authors[name][0];
  const bgColor = authors[name][1];
  return `<p class="badge rounded-pill text-bg-${bgColor}">${authorName}</p>`;
}

function makeImage(name) {
  return `https://github.com/ZCG-coder/Pandurance-blogs/raw/main/previews/${name}.png`;
}

export async function getBlogs() {
  const path = window.location.pathname;
  const page = path.split("/").pop();

  $("#featured-blog-container").html(`
      <p class="fw-bold text-primary mb-2">Driven to win</p>
      <h1 class="fw-bold mb-4">Pandurance Racing</h1>
      <h2 id="featured-blog-title">Title</h2>
      <p id="featured-blog-desc">Desc</p>
      <button class="btn btn-primary fs-5 me-2 py-2 px-4" id="idx-learn-more" type="button" data-bs-toggle="modal">Learn More</button>
  `);
  const response = await fetch("https://raw.githubusercontent.com/ZCG-coder/Pandurance-blogs/main/index.json");
  const content = await response.text();
  const elm = $("#blog-entries");
  const obj = JSON.parse(content);

  const featuredBlogKey = Object.keys(obj).pop();
  const featuredBlog = obj[featuredBlogKey];
  const title = featuredBlog["name"];
  const desc = featuredBlog["desc"];
  $("#featured-blog-title").html(title);
  $("#featured-blog-desc").html(desc);
  $("#idx-learn-more").attr("data-bs-target", `#blog-modal-${featuredBlogKey}`)

  for (const key in obj) {
    const value = obj[key];
    const title = value["name"];
    const name = value["author"];
    const date = value["date"];
    await appendModal(key, title, name, date);
    elm.append(`
    <div class="col">
      <div class="card">
        <img
          class="card-img-top w-100 d-block fit-cover"
          style="height: 200px"
          src="${makeImage(key)}"
        />
        <div class="card-body p-4">
          <h4 class="card-title"><a href="#" data-bs-toggle="modal" data-bs-target="#blog-modal-${key}">${title}</a></h4>
          <p class="text-muted">${makeAuthor(name)} ${date}</p>
          <p class="card-text">${value["desc"]}
          </p>
        </div>
      </div>
    </div>`);
    console.log("Blogs loaded.");
  }
}

$(async function() {
  $(document.body).on('shown.bs.modal', '.blog-modal', async function (event) {
    const id = event.target.id.replace("blog-modal", "modal-body");
    const blogId = event.target.id.slice(11);
    const elm = $(`#${id}`)
    elm.html(await getContent(blogId));
  })
})
