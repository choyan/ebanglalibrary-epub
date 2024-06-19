import * as cheerio from "cheerio";
import axios from "axios";

export const loadData = async ({ url }) => {
  const html = await axios({
    method: "GET",
    url,
  });

  const $ = cheerio.load(html.data);

  $("br").replaceWith("<br/>");

  return {
    $,
  };
};
