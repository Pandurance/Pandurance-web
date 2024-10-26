import $ from "jquery";

export function makeHeader() {
  $(".navbar").html(`
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
        <img src="/favicon.svg" width="75" height="75" alt=""></img>
        Pandurance
        </a>
        <button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-1">
          <span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navcol-1">
          <ul class="navbar-nav">
            <li class="nav-item"><a class="nav-link" href="#"></a></li>
            <li class="nav-item">
              <a class="nav-link active" href="blog.html">Blog</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="doc.html">Documents</a>
            </li>

            <li class="nav-item dropdown">
              <a
                class="dropdown-toggle nav-link"
                aria-expanded="false"
                data-bs-toggle="dropdown"
                id="nav-internals-dropdown"
                href="#"
                >More about us</a
              >
              <ul class="dropdown-menu">
                <li><h6 class="dropdown-header" id="about-sponsors">Our Sponsors</h6></li>
                <li class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="/about_site">About this site</a></li>
              </ul>
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

export function makeFooter() {
  let footerHtml = `
      <div class="container text-muted py-4 py-lg-5">
        <p>Made using&nbsp;<a href="https://bootstrapstudio.io">Bootstrap Studio</a></p>

        <div class="container">
          <div class="row">
            <div class="col">
              <a href="https://instagram.com/panduranceracing"><i class="bi bi-instagram h2"></i></a>
            </div>
            <div class="col">
              <a href="https://www.threads.net/@panduranceracing"><i class="bi bi-threads h2"></i></a>
            </div>
            <div class="col">
              <a href="https://github.com/pandurance"><i class="bi bi-github h2"></i></a>
            </div>
            <div class="col">
              <a href="mailto:info@pandurance.tech"><i class="bi bi-envelope-at-fill h2"></i></a>
            </div>
            <div class="col">
              <a href="https://wa.me/message/4JUA7TSP72UJP1"><i class="bi bi-whatsapp h2"></i></a>
            </div> 
            <div class="col">
              <a href="https://www.linkedin.com/in/pandurance-racing-09041b31b/"><i class="bi bi-linkedin h2"></i></a>
            </div>
          </div>
        </div>

        <p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title"
        rel="cc:attributionURL" href="https://pandurance.tech">This website</a> by <span property="cc:attributionName">
        Pandurance Racing</span> is licensed under
        <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1" target="_blank"
        rel="license noopener noreferrer" style="display:inline-block;">CC BY-NC-ND 4.0
        <img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;"
        src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt="">
        <img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;"
        src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt="">
        <img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;"
        src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt="">
        <img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;"
        src="https://mirrors.creativecommons.org/presskit/icons/nd.svg?ref=chooser-v1" alt="">
        </a></p>

        <p>Learn more <a href="/copyright.html">here</a></p>

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
            <a href="${obj.url}"><img src="${obj.imgName}" alt="${obj.name} Logo" title="${obj.name} Logo" style="max-height: 4em" /></a>
          </div>
      `;
  }
  footerHtml += `
        </div>
      </div>`;

  $(".footer").html(footerHtml);
}
