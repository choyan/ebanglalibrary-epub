import fs from "fs";
import serialize from "w3c-xmlserializer";
import { loadData } from "./loadData.js";
import { chapter } from "../templates/chapter.js";

export const downloadSingleChapter = async ({ url: URL, outputPath, name }) => {
  const { document } = await loadData({ url: URL });

  const pageTitle = document.querySelector("title").textContent;
  const contentRoot = document.querySelectorAll(".ld-tabs-content p");

  const contents = [];

  contentRoot.forEach((paragraph) => {
    contents.push(serialize(paragraph));
  });

  const content = chapter({ pageTitle, contents });
  await fs.writeFileSync(outputPath, content);
  console.log("Written chapter: ", name);
};
