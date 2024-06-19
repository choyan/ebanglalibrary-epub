import fs, { readFileSync } from "fs";
import JSZip from "jszip";
import { slugify } from "../utils/slugify.js";
import { generateContainer } from "../templates/generateContainer.js";
import { generateContent } from "../templates/generateContent.js";
import { generateToc } from "../templates/generateToc.js";

export const bundleEpub = async ({ epub }) => {
  // Generate the ZIP file
  let zip = new JSZip();
  zip.file("mimetype", "application/epub+zip");
  zip.file("META-INF/container.xml", generateContainer());
  zip.file("OEBPS/content.opf", generateContent({ epub }));
  zip.file("OEBPS/toc.xhtml", generateToc({ chapters: epub.chapters }));

  epub.chapters.forEach((chapter) => {
    zip.file(
      `OEBPS/${chapter.id}.xhtml`,
      readFileSync(`./temp/OEBPS/${chapter.id}.xhtml`),
    );
  });

  console.log(zip.files);

  return zip
    .generateNodeStream({ type: "nodebuffer", streamFiles: true })
    .pipe(fs.createWriteStream("out.epub"))
    .on("finish", function () {
      // JSZip generates a readable stream with a "end" event,
      // but is piped here in a writable stream which emits a "finish" event.
      console.log("out.epub written.");
    });
};
