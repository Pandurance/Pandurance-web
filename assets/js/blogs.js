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

async function appendModal(id, title, body, author, date) {
  $(document.body).prepend(`
    <div class="modal" tabindex="-1" id="blog-modal-${id}">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><strong>Article</strong> – ${title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ${await body}
          </div>
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

  // On server
  if (page.includes('blog')) {
    const response = await fetch("https://raw.githubusercontent.com/ZCG-coder/Pandurance-blogs/main/index.json");
    const content = await response.text();
    const elm = $("#blog-entries");
    const obj = JSON.parse(content);
    for (const key in obj) {
      const value = obj[key];
      const title = value["name"];
      const name = value["author"];
      const date = value["date"];
      await appendModal(key, title, getContent(key), name, date);
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
          ${makeAuthor(name)}
          <p class="card-text">${value["desc"]}
          </p>
        </div>
      </div>
    </div>`);
    }

    console.log("Blogs loaded.");
  }
}
