import fs from "fs";
import { loadData } from "./loadData.js";
import { collectPageContent } from "./collectPageContent.js";

export const downloadChapter = async ({ url: URL, outputPath, name }) => {
  const { document } = await loadData({ url: URL });

  const pageTitle = document.querySelector("title").textContent;
  const content = collectPageContent({ pageTitle, document });

  try {
    await fs.writeFileSync(outputPath, content);
  } catch (err) {
    console.log("Failed to write chapter", err);
  }
  console.log("Written chapter: ", name);
};
