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
          </ul>
        </div>
      </div>
  `);
}

function makeFooter() {
  $(".footer").html(`
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
        <div class="row">
          <div class="col-md-3 align-self-center">
            <img src="assets/img/Memorigin.svg" style="max-height: 100px" />
          </div>
          <div class="col-md-3">
            <img src="assets/img/SJC.svg" style="height: initial; max-height: 100px" />
          </div>
          <div class="col-md-3 align-self-center">
            <img src="assets/img/Q-STEM.svg" style="max-height: 100px" />
          </div>
          <div class="col-md-3 align-self-center">
            <img src="assets/img/GR.svg" style="max-height: 100px" />
          </div>
        </div>
      </div>
      `);
}

function addMember(name, post, spool) {
  const elm = $("#index-members-showcase");

  elm.html(
    elm.html() +
      `
        <div class="col">
          <div class="card border-0 shadow-none">
            <div class="card-body d-flex align-items-center p-0">
              <img
                class="rounded-circle flex-shrink-0 me-3 fit-cover"
                width="130"
                height="130"
                src="assets/img/${spool.toUpperCase()}.png"
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
}

function addSponsor(name, imgName, desc) {
  const elm = $("#index-sponsors");
  elm.html(
    elm.html() +
      `
    <div class="col-lg-6">
          <div class="card">
            <div class="card-body p-4">
              <img src="assets/img/${imgName}.svg" style="height: 100px" />
              <h4 class="card-title">${name}</h4>
              <p class="card-text">
                ${desc}
              </p>
            </div>
          </div>
        </div>
        `,
  );
}

$(function () {
  makeHeader();
  makeFooter();

  addMember("Marcus Hung", "Project Manager", "marcus");
  addMember("Andy Zhang", "Graphic Designer", "andy");
  addMember("Ethan Lo", "Manufacturing Engineer", "elo");
  addMember("Jack Tang", "Financial Manager", "jack");
  addMember("Magnus Chan", "Design Engineer", "magnus");
  addMember("Zack Leung", "Sponsorship and marketing Manager", "zack");

  addSponsor("Memorigin", "Memorigin", "Desc");
  addSponsor("St. Joseph's College", "SJC", "Desc");
  addSponsor("Q-mark STEM", "Q-STEM", "Desc");
  addSponsor("Golden Resources", "GR", "Desc");
});
