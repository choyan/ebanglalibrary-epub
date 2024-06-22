import fs, { readFileSync } from "fs";
import JSZip from "jszip";
import { generateContainer } from "../templates/generateContainer.js";
import { generateContent } from "../templates/generateContent.js";
import { generateToc } from "../templates/generateToc.js";
import { generateTitlePage } from "../templates/generateTitlePage.js";

let zip = new JSZip();

// Function to add files to the ZIP
const addFilesToZip = async (zip, files) => {
  for (const filePath of files) {
    try {
      const fileContent = await fs.readFileSync(filePath);
      // Add file to the ZIP
      zip.file(`OEBPS/${filePath.split("/")[3]}`, fileContent);
      console.log(`Added ${filePath.split("/")[3]} to ZIP`);
    } catch (err) {
      console.error(`Error reading file ${filePath}:`, err);
    }
  }
};

export const bundleEpub = async ({ epub }) => {
  const filePaths = epub.chapters.map(
    (chapter) => `./temp/OEBPS/${chapter.id}.xhtml`,
  );

  try {
    zip.file("mimetype", "application/epub+zip");
    zip.file("META-INF/container.xml", generateContainer());
    zip.file("OEBPS/content.opf", generateContent({ epub }));
    zip.file("OEBPS/toc.xhtml", generateToc({ chapters: epub.chapters }));
    await zip.file("OEBPS/Images/cover.jpg", readFileSync("./temp/cover.jpg"));
    zip.file("OEBPS/titlepage.xhtml", generateTitlePage());

    await addFilesToZip(zip, filePaths);
    // Generate the ZIP file as a Node.js Buffer
    const content = await zip.generateAsync({ type: "nodebuffer" });

    // Save the generated ZIP file to the filesystem
    await fs.writeFileSync("output.epub", content);
    console.log("Epub file created successfully at output.epub");
  } catch (err) {
    console.error("Error generating ZIP file:", err);
  }
};
