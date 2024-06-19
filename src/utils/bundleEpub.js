import fs, { readFileSync } from "fs";
import JSZip from "jszip";
import { slugify } from "../utils/slugify.js";
import { generateContainer } from "../templates/generateContainer.js";
import { generateContent } from "../templates/generateContent.js";
import { generateToc } from "../templates/generateToc.js";
import { generateTitlePage } from "../templates/generateTitlePage.js";

export const bundleEpub = async ({ epub }) => {
  // Generate the ZIP file
  let zip = new JSZip();
  zip.file("mimetype", "application/epub+zip");
  zip.file("META-INF/container.xml", generateContainer());
  zip.file("OEBPS/content.opf", generateContent({ epub }));
  zip.file("OEBPS/toc.xhtml", generateToc({ chapters: epub.chapters }));
  zip.file("OEBPS/Images/cover.jpg", readFileSync("./temp/cover.jpg"));
  zip.file("OEBPS/titlepage.xhtml", generateTitlePage());

  epub.chapters.forEach((chapter) => {
    zip.file(
      `OEBPS/${chapter.id}.xhtml`,
      readFileSync(`./temp/OEBPS/${chapter.id}.xhtml`),
    );
  });

  return zip
    .generateNodeStream({ type: "nodebuffer", streamFiles: true })
    .pipe(fs.createWriteStream("out.epub"))
    .on("finish", function () {
      console.log("out.epub written.");
    });
};
