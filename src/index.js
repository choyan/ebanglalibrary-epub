import path from "path";
import { downloadImage } from "./utils/downloadCover.js";
import { nanoid } from "nanoid";

import { downloadSingleChapter } from "./utils/single.js";

import { loadData } from "./utils/loadData.js";
import { cleanFolder } from "./utils/cleanFolder.js";
import { bundleEpub } from "./utils/bundleEpub.js";
import { COVER_IMAGE_CLASS, DOWNLOAD_URL } from "./config.js";

const coverImagePath = path.resolve("./temp/cover.jpg");

const outputFolder = "./temp/OEBPS";
cleanFolder(outputFolder);

const { document } = await loadData({
  url: DOWNLOAD_URL,
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

const coverURL = document.querySelector(COVER_IMAGE_CLASS).getAttribute("src");

await downloadImage(coverURL, coverImagePath);

async function downloadChapters({ epub }) {
  const downloadPromises = epub.chapters.map((chapter) => {
    const outputPath = `${outputFolder}/${chapter.id}.xhtml`;
    return downloadSingleChapter({
      url: chapter.url,
      outputPath,
      name: chapter.name,
    });
  });
  await Promise.all(downloadPromises);
}

await downloadChapters({ epub });

bundleEpub({ epub });
