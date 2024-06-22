import { JSDOM } from "jsdom";
import axios from "axios";

export const loadData = async ({ url }) => {
  const html = await axios({
    method: "GET",
    url,
  });

  const dom = new JSDOM(html.data);

  const { document } = dom.window;

  return {
    dom,
    document,
  };
};
