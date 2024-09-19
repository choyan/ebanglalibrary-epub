import { downloadCover } from "./utils/downloadCover.js";
import { nanoid } from "nanoid";

import { cleanFolder } from "./utils/cleanFolder.js";
import { loadData } from "./utils/loadData.js";
import { downloadChapter } from "./utils/downloadChapter.js";
import { bundleEpub } from "./utils/bundleEpub.js";
import { collectPageContent } from "./utils/collectPageContent.js";
import { prepareIntro } from "./utils/prepareIntro.js";

// import { DOWNLOAD_URL } from "./config.js";

export async function downloadBook({
  DOWNLOAD_URL,
  setIsFetching,
  setDownloadStatus,
}) {
  const outputFolder = "./temp/OEBPS";

  setDownloadStatus("DOWNLOADING");
  cleanFolder(outputFolder);

  const { document } = await loadData({
    url: DOWNLOAD_URL,
  });

  const pageTitle = document.querySelector("title").textContent;

  const epub = {
    title: pageTitle,
    author:
      document.querySelector(".entry-terms-authors a")?.textContent ||
      "unknown author", // Safe navigation in case the element doesn't exist
    publisher: "anonymous",
    description: document.querySelector("title").textContent,
    tags: document.querySelector(".entry-terms-ld_course_category a")
      .textContent,
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

  await prepareIntro({
    pageTitle,
    document,
    outputPath: `${outputFolder}/intro.xhtml`,
  });

  await downloadCover(document);

  async function downloadChapters({ epub }) {
    const downloadPromises = epub.chapters.map((chapter) => {
      const outputPath = `${outputFolder}/${chapter.id}.xhtml`;
      return downloadChapter({
        url: chapter.url,
        outputPath,
        name: chapter.name,
      });
    });
    await Promise.all(downloadPromises);
  }

  await downloadChapters({ epub });

  bundleEpub({ epub });

  setIsFetching(false);
  setDownloadStatus("COMPLETE");
}
