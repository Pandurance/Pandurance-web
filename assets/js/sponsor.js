import { getSearchParams } from "./util";
import $ from "jquery";

$(function () {
  let sid = getSearchParams("sid");
  if (sid) {
    const sponsor = global.sponsorsList.find(obj => obj.id == sid);
    import(`/pages/sponsors/${sponsor.id}.txt`).then(function (m) {
      const text = m.default;
      console.log(sponsor)
      $("#sponsor-name").text(sponsor.name)
      $("#sponsor-text").text(text);
      $(`
          <a href="${sponsor.url}"><img src="${sponsor.imgName}" style="max-height: 25em; margin: 5rem" /></a>
      `).insertBefore("#sponsor-text");
    })
  }
});
