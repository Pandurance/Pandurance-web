import DataTable from "datatables.net-bs5";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.colVis.mjs";
import $ from "jquery";
import { makeAuthor } from "./util";

function addEntry(id, name, date, author, version) {
    $("#data-body").append(`
        <tr>
          <td>${id}</td>
          <td>${name}</td>
          <td>${date}</td>
          <td>${author}</td>
          <td>${version}</td>
        </tr>`)
}

$(async function () {
    if (!window.location.toString().includes("doc")) return;
    const resp = await fetch("https://raw.githubusercontent.com/Pandurance/Pandurance-docs/refs/heads/main/index.json");
    const json = await resp.json();
    delete json["encryption_key"]

    for (const key in json) {
        const val = json[key];
        console.log(val)
        addEntry(key, val["name"], val["published_on"], makeAuthor(val["author"]), val["last_version"])
    }

    new DataTable("#table");
})
