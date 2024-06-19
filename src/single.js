import { loadData } from "./utils/loadData.js";
import { generateChapter } from "./templates/generateChapter.js";
import serialize from "w3c-xmlserializer";

export const downloadSinglePage = async ({ url: URL }) => {
  const { document } = await loadData({ url: URL });

  const pageTitle = document.querySelector("title").textContent;
  const contentRoot = document.querySelectorAll(".ld-tabs-content p");

  const contents = [];

  contentRoot.forEach((paragraph) => {
    contents.push(serialize(paragraph));
  });

  const content = generateChapter({ pageTitle, contents });

  return {
    content,
  };
};

downloadSinglePage({
  url: "https://www.ebanglalibrary.com/lessons/%e0%a6%b6%e0%a7%81%e0%a6%af%e0%a6%bc%e0%a6%b0%e0%a7%87%e0%a6%b0-%e0%a6%ac%e0%a6%be%e0%a6%9a%e0%a7%8d%e0%a6%9a%e0%a6%be%e0%a6%a6%e0%a7%87%e0%a6%b0-%e0%a6%85%e0%a6%b0%e0%a7%8d%e0%a6%a5/",
});
