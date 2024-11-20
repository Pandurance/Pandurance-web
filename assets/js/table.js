import DataTable from "datatables.net-bs5";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.colVis.mjs";
import "/assets/css/bs-theme-overrides.css";
import $ from "jquery";
import { makeAuthor, parseDate, getSearchParams, cyrb53 } from "./util";

function addEntry(id, name, date, author, version) {
  $("#data-body").append(`
        <tr>
          <td>${id}</td>
          <td><a href="/doc.html?did=${id}">${name}</a></td>
          <td>${date}</td>
          <td>${author}</td>
          <td>${version}</td>
        </tr>`);
}

async function getData() {
  const resp = await fetch("https://raw.githubusercontent.com/Pandurance/Pandurance-docs/refs/heads/main/index.json");
  const json = await resp.json();
  window.baheNhhNKTijQvr = json["encryption_key"];
  delete json["encryption_key"];

  return json;
}

async function processDoc(id) {
  const json = await getData();
  const obj = json[id];
  const dataZone = $("#doc-data-body");

  $("#download-prompt").text(`Download document "${obj.name}"`);
  $("#download-prompt").show();
  for (let i = 0; i < obj["last_version"]; i++) {
    console.log(i);
    dataZone.append(`
          <tr>
            <td>${i + 1}</td>
            <td>${obj["published_on"][i]}</td>
            <td>
              <a class="btn btn-primary" href="https://github.com/Pandurance/Pandurance-docs/raw/refs/heads/main/doc/${id}v${i + 1}.pdf">
                <i class="bi bi-download"></i> Download
              </a>
            </td>
          </tr>`);
  }
}

window.goToDocPDF = function () {
//   const pwd = $("#pwd").val();
//   const pwdHashed = cyrb53(pwd);
//   if (pwdHashed === window.baheNhhNKTijQvr) {
    window.location.href = `https://github.com/Pandurance/Pandurance-docs/raw/refs/heads/main/doc/${window.KbSLmoOmRhImzYk}.pdf`;
  // } else {
  //   $("#fail").text("Incorrect password.");
  // }
};

$(async function () {
  if (!window.location.toString().includes("doc")) return;

  const did = getSearchParams("did");
  if (did) {
    $("#table-area").hide();
    $("#doc-table-area").show();

    await processDoc(did);
    return;
  }

  $("#table-area").show();
  $("#doc-table-area").hide();
  $("#download-prompt").hide();

  const json = await getData();
  for (const key in json) {
    const val = json[key];
    const dates = val["published_on"];
    const date = dates.at(-1);
    addEntry(key, val["name"], date, makeAuthor(val["author"]), val["last_version"]);
  }

  new DataTable("#table", {
    columnDefs: [
      {
        target: 4,
        searchable: false,
      },
    ],
    stateSave: true,
  });
});
