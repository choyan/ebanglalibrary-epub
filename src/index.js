import path from "path";
import { downloadImage } from "./utils/downloadCover.js";
import { generateToc } from "./templates/generateToc.js";
import { nanoid } from "nanoid";

import { downloadSinglePage } from "./single.js";

import { loadData } from "./utils/loadData.js";
import { writeFile } from "./utils/writeFile.js";
import { cleanFolder } from "./utils/cleanFolder.js";
import { bundleEpub } from "./utils/bundleEpub.js";
import { generateContent } from "./templates/generateContent.js";
import { generateContainer } from "./templates/generateContainer.js";

const URL =
  "https://www.ebanglalibrary.com/books/%e0%a6%aa%e0%a6%b0%e0%a6%be%e0%a6%b0%e0%a7%8d%e0%a6%a5%e0%a6%aa%e0%a6%b0%e0%a6%a4%e0%a6%be%e0%a6%b0-%e0%a6%85%e0%a6%b0%e0%a7%8d%e0%a6%a5%e0%a6%a8%e0%a7%80%e0%a6%a4%e0%a6%bf-%e0%a6%86%e0%a6%95/";
const coverImagePath = path.resolve("./temp/cover.jpg");
// const outputToc = `./temp/OEBPS/toc.xhtml`;

// Usage
const outputFolder = "./temp/OEBPS";
cleanFolder(outputFolder);

const { $ } = await loadData({
  url: URL,
});

const epub = {
  title: $("title").text(),
  author: $(".entry-terms-authors a").text(),
  publisher: "anonymous",
  description: $("title").text(),
  tags: $(".entry-terms-ld_course_category a").text(),
  chapters: [],
};

console.log(`Downloading Ebook: ${epub.title}`);

$(".ld-item-list-item .ld-item-name").each((i, element) => {
  epub.chapters.push({
    id: nanoid(8),
    url: $(element).attr("href"),
    name: $(element).find(".ld-item-title").text().replaceAll("\n", ""),
  });
});

// const tableOfContent = generateToc({ chapters: epub.chapters });

// writeFile({ outputPath: `${outputFolder}/toc.xhtml`, data: tableOfContent });

const coverURL = $(".entry-image-single img").attr("src");

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

      console.log(`Downloaded chapter: ${chapter.name}`);
    }),
  );
}

await downloadContents();

// const spine = generateContent({ epub });
// writeFile({ outputPath: `${outputFolder}/content.opf`, data: spine });

// const container = generateContainer();
// writeFile({ outputPath: `./temp/META-INF/container.xml`, data: container });

bundleEpub({ epub });
