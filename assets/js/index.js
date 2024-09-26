import "bootstrap/dist/css/bootstrap.min.css";
import "/assets/css/styles.css";
import "/assets/css/bs-theme-overrides.css";
import { getPreferredTheme } from "./darkmode";
import $ from "jquery";
import "./blogs";
import { makeHeader, makeFooter } from "./headerFooter";

const type = {
  layout: ["primary", "Layout"],
  userInterface: ["success", "User Interface"],
  codeHosting: ["info", "Code Hosting"],
  development: ["danger", "Development"],
};

function addMember(name, post, spool) {
  const elm = $("#index-members-showcase");

  import(`/assets/img/MEMBERS/${spool.toUpperCase()}.png`).then(function (m) {
    console.log(m.default);
    elm.append(
      `<div class="col">
        <div class="card border-0 shadow-none">
          <div class="card-body d-flex align-items-center p-0">
            <img
              class="rounded-circle flex-shrink-0 me-3 fit-cover"
              width="130"
              height="130"
              src="${m.default.replace("png", "avif")}"
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
          <img src="${m.default}" style="height: 100px" />
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
              class="img-fluid align-self-center"
              style="height: 5em;"
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

  await addSponsor(
    "Memorigin",
    "https://www.memorigin.com",
    "Memorigin",
    "Memorigin is a well-known Hong Kong watchmaker which specialises in creating Tourbillon watches.",
  );
  await addSponsor(
    "St. Joseph's College",
    "https://www.sjc.edu.hk",
    "SJC",
    "St. Joseph's College has undergone many \
    changes since its establishment in 1875. Our College is now one of the most prestigious schools in Hong Kong, in \
    both academic and extra-curricular areas.",
  );
  await addSponsor(
    "Q-mark STEM",
    "https://www.qmark.org.hk/tc/plan-stem.asp",
    "Q-STEM",
    "Q-Mark STEM aims to \
    standardize the evaluation of STEM products and provide higher product quality assurance for STEM product \
    developers to help the industry and consumers identify or judge the performance and quality of STEM products.",
  );
  await addSponsor(
    "Golden Resources",
    "https://www.rice.com.hk/customer/",
    "GR",
    "Golden resources was founded in 1946 as a trading company named Yuen Long, which obtained its rice importing \
    license in Hong Kong in 1955 and began the Group’s romance with rice for decades.",
  );

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
    "Our code is hosted on <a href='https://github.com/Pandurance/Pandurance-web'>GitHub</a>",
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
    "https://npmjs.com/package/serve",
    "https://github.com/vercel/serve/blob/main/media/banner.png?raw=true",
    type.development,
    "Serve is a local server that allows hot reloading, which accelerates the website development.",
  );

  addTool(
    "Bootstrap Studio",
    "https://bootstrapstudio.io",
    "https://bootstrapstudio.io/assets/img/logo_128.png",
    type.layout,
    "Allows quick drag-and-drop UI design.",
  );

  addTool(
    "Marked.js",
    "https://marked.js.org",
    "https://marked.js.org/img/logo-black.svg",
    type.layout,
    "Allows rendering Markdown content as HTML.",
  );

  makeFooter();
});
