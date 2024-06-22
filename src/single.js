import { loadData } from "./utils/loadData.js";
import { generateChapter } from "./templates/generateChapter.js";
import serialize from "w3c-xmlserializer";
// import { writeFile } from "./utils/writeFile.js";
import fs from "fs";

export const downloadSinglePage = async ({ url: URL, outputPath }) => {
  const { document } = await loadData({ url: URL });

  const pageTitle = document.querySelector("title").textContent;
  const contentRoot = document.querySelectorAll(".ld-tabs-content p");

  const contents = [];

  contentRoot.forEach((paragraph) => {
    contents.push(serialize(paragraph));
  });

  const content = generateChapter({ pageTitle, contents });
  await fs.writeFileSync(outputPath, content);
  console.log("Written chapter: ", outputPath);
  // await writeFile({ outputPath, data: content });
};
