import path from "path";
import { downloadImage } from "./utils/downloadCover.js";
import { nanoid } from "nanoid";

import { downloadSinglePage } from "./single.js";

import { loadData } from "./utils/loadData.js";
import { cleanFolder } from "./utils/cleanFolder.js";
import { bundleEpub } from "./utils/bundleEpub.js";

const URL =
  "https://www.ebanglalibrary.com/books/%e0%a6%a4%e0%a6%bf%e0%a6%a8-%e0%a6%97%e0%a7%8b%e0%a6%af%e0%a6%bc%e0%a7%87%e0%a6%a8%e0%a7%8d%e0%a6%a6%e0%a6%be-%e0%a6%ad%e0%a6%b2%e0%a6%bf%e0%a6%89%e0%a6%ae-%e0%a7%a7-%e0%a7%a8/";
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
  chapters: [],
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

await downloadImage(coverURL, coverImagePath);

async function downloadContents({ epub }) {
  const downloadPromises = epub.chapters.map((chapter) => {
    const outputPath = `${outputFolder}/${chapter.id}.xhtml`;
    return downloadSinglePage({ url: chapter.url, outputPath });
  });
  await Promise.all(downloadPromises);
}

await downloadContents({ epub });

bundleEpub({ epub });
