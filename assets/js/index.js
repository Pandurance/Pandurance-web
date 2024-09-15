import "/assets/css/styles.css";
import "/assets/css/bs-theme-overrides.css";
import {getPreferredTheme} from "./darkmode";

const type = {
  layout: ["primary", "Layout"],
  userInterface: ["success", "User Interface"],
  codeHosting: ["info", "Code Hosting"],
  development: ["danger", "Development"],
};

function makeHeader() {
  $(".navbar").html(`
      <div class="container-fluid">
        <a class="navbar-brand" href="index.html">Pandurance</a
        ><button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-1">
          <span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navcol-1">
          <ul class="navbar-nav">
            <li class="nav-item"><a class="nav-link" href="#"></a></li>
            <li class="nav-item">
              <a class="nav-link active" href="blog.html">Blog</a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="dropdown-toggle nav-link"
                aria-expanded="false"
                data-bs-toggle="dropdown"
                id="nav-internals-dropdown"
                href="#"
                >Internal</a
              >
              <div class="dropdown-menu">
                <a class="dropdown-item" href="https://prj.pandurance.tech">Project Tracker</a>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="about_site.html">About this website</a>
            </li>
          </ul>
        </div>
      </div>
  `);
}

function makeFooter() {
  let footerHtml = `
      <div class="container text-muted py-4 py-lg-5">
        <p>Made using&nbsp;<a href="https://bootstrapstudio.io">Bootstrap Studio</a></p>
        <a href="https://instagram.com/panduranceracing"><i class="bi bi-instagram"></i></a>
        <p class="mb-0">Copyright &copy; 2024 Pandurance Racing</p>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-12 align-self-baseline">
            <p>Supported by</p>
          </div>
        </div>
        <div class="row">`;

  for (const obj of global.sponsorsList) {
    footerHtml += `
          <div class="col-md-3 align-self-center">
            <a href="${obj.url}"><img src="${obj.imgName}" style="max-height: 4em" /></a>
          </div>
      `;
  }
  footerHtml += `
        </div>
      </div>`;

  $(".footer").html(footerHtml);
}

function addMember(name, post, spool) {
  const elm = $("#index-members-showcase");

  import(`/assets/img/MEMBERS/${spool.toUpperCase()}.png`).then(function (m) {
    elm.append(
      `<div class="col">
        <div class="card border-0 shadow-none">
          <div class="card-body d-flex align-items-center p-0">
            <img
              class="rounded-circle flex-shrink-0 me-3 fit-cover"
              width="130"
              height="130"
              src="${m.default}"
            />
            <div>
              <h5 class="fw-bolder text-primary mb-0">${name}</h5>
              <p class="text-muted mb-1">${post}</p>
              <a href="mailto:${spool}@pandurance.tech"><i class="bi bi-envelope-at-fill text-muted"></i> </a>
            </div>
          </div>
        </div>
      </div>`,
    );
  });
}

async function addSponsor(name, url, imgName, desc) {
  const elm = $("#index-sponsors");

  const m = await import(`/assets/img/SPONSORS/${imgName}.svg`);
  const obj = {
    name: name,
    url: url,
    imgName: m.default,
  };
  global.sponsorsList.push(obj);
  elm.append(
    `
    <div class="col-lg-6">
          <div class="card">
            <div class="card-body p-4">
              <img src=${m.default} style="height: 100px" />
              <h4 class="card-title"><a href="${url}">${name}</a></h4>
              <p class="card-text">
                ${desc}
              </p>
            </div>
          </div>
        </div>
        `,
  );
}

function addTool(name, url, imgUrl, type, desc) {
  const elm = $("#abt-site-blocks");
  elm.append(`
        <div class="col">
          <div class="card">
            <img
              class="card-img-top img-fluid align-self-center"
              style="max-width: 10em;"
              src="${imgUrl}"
            />
            <div class="card-body p-4">
              <h4 class="card-title"><a href="${url}">${name}</a></h4>
              <p class="badge rounded-pill bg-${type[0]}">${type[1]}</p>
              <p class="card-text">${desc}</p>
            </div>
          </div>
        </div>
  `);
}

$(async function () {
  makeHeader();

  global.sponsorsList = [];

  $("img").on("dragstart", function (event) {
    event.preventDefault();
  });

  addMember("Marcus Hung", "Project Manager", "marcus");
  addMember("Andy Zhang", "Graphic Designer", "andy");
  addMember("Ethan Lo", "Manufacturing Engineer", "elo");
  addMember("Jack Tang", "Financial Manager", "jack");
  addMember("Magnus Chan", "Design Engineer", "magnus");
  addMember("Zack Leung", "Sponsorship and Marketing Manager", "zack");

  await addSponsor("Memorigin", "https://www.memorigin.com", "Memorigin", "Desc");
  await addSponsor("St. Joseph's College", "https://www.sjc.edu.hk", "SJC", "Desc");
  await addSponsor("Q-mark STEM", "https://www.qmark.org.hk/tc/plan-stem.asp", "Q-STEM", "Desc");
  await addSponsor("Golden Resources", "https://www.rice.com.hk/customer/", "GR", "Desc");

  addTool(
    "Bootstrap",
    "https://getbootstrap.com",
    "https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg",
    type.userInterface,
    "Bootstrap is used as the user interface for this website. It is then overridden by a custom CSS file.",
  );
  addTool(
    "jQuery",
    "https://jquery.com",
    "https://upload.wikimedia.org/wikipedia/commons/f/fd/JQuery-Logo.svg",
    type.userInterface,
    "jQuery can select HTML elements quickly and create a DOM tree dynamically.",
  );
  addTool(
    "GitHub",
    "https://github.com",
    "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
    type.codeHosting,
    "Our code is hosted on <a href='https://github.com/ZCG-coder/Pandurance-web'>GitHub</a>",
  );
  addTool(
    "Azure",
    "https://azure.com",
    "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg",
    type.codeHosting,
    "This website uses Azure Static Web Apps (SWA) to deliver its contents. The Project Tracker uses an Azure VM to power the server.",
  );

  let webPackIcon = "https://raw.githubusercontent.com/webpack/media/master/logo/logo-on-white-bg.svg";
  if (getPreferredTheme() == "dark")
    webPackIcon = "https://raw.githubusercontent.com/webpack/media/master/logo/logo-on-dark-bg.svg";

  addTool(
    "Webpack",
    "https://webpack.js.org",
    webPackIcon,
    type.development,
    "Webpack is used to package and optimize code and resources to ensure faster loading.",
  );

  addTool(
    "Serve",
    "npmjs.com/package/serve",
    "https://github.com/vercel/serve/blob/main/media/banner.png?raw=true",
    type.development,
    "Serve is a local server that allows hot reloading, which accelerates the website development.",
  );

  makeFooter();
});
