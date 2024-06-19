import path from "path";
import { downloadImage } from "./utils/downloadCover.js";
import { nanoid } from "nanoid";

import { downloadSinglePage } from "./single.js";

import { loadData } from "./utils/loadData.js";
import { writeFile } from "./utils/writeFile.js";
import { cleanFolder } from "./utils/cleanFolder.js";
import { bundleEpub } from "./utils/bundleEpub.js";

const URL =
  "https://www.ebanglalibrary.com/books/%e0%a6%aa%e0%a6%b0%e0%a6%be%e0%a6%b0%e0%a7%8d%e0%a6%a5%e0%a6%aa%e0%a6%b0%e0%a6%a4%e0%a6%be%e0%a6%b0-%e0%a6%85%e0%a6%b0%e0%a7%8d%e0%a6%a5%e0%a6%a8%e0%a7%80%e0%a6%a4%e0%a6%bf-%e0%a6%86%e0%a6%95/";
const coverImagePath = path.resolve("./temp/cover.jpg");

// Usage
const outputFolder = "./temp/OEBPS";
cleanFolder(outputFolder);

const { document } = await loadData({
  url: URL,
});

const epub = {
  title: document.querySelector("title").textContent,
  author:
    document.querySelector(".entry-terms-authors a")?.textContent ||
    "unknown author", // Safe navigation in case the element doesn't exist
  publisher: "anonymous",
  description: document.querySelector("title").textContent,
  tags: document.querySelector(".entry-terms-ld_course_category a").textContent,
  chapters: [], // Will be populated later as required
};

console.log(`Downloading Ebook: ${epub.title}`);

document
  .querySelectorAll(".ld-item-list-item .ld-item-name")
  .forEach((element) => {
    epub.chapters.push({
      id: nanoid(8),
      url: element.getAttribute("href"),
      name: element
        .querySelector(".ld-item-title")
        .textContent.replace(/\n/g, ""),
    });
  });

const coverURL = document
  .querySelector(".entry-image-single img")
  .getAttribute("src");

downloadImage(coverURL, coverImagePath)
  .then(() => {
    console.log(`Cover Image downloaded and saved to ${coverImagePath}`);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

async function downloadContents() {
  await Promise.all(
    epub.chapters.map(async (chapter) => {
      const outputPath = `${outputFolder}/${chapter.id}.xhtml`;
      const { content } = await downloadSinglePage({
        url: chapter.url,
      });
      writeFile({ outputPath, data: content });

      console.log(
        `Downloaded chapter: ${chapter.name} to => ${chapter.id}.xhtml`,
      );
    }),
  );
}

await downloadContents();

bundleEpub({ epub });
