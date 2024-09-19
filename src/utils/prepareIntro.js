import fs from "fs";
import { collectPageContent } from "./collectPageContent.js";

export const prepareIntro = async ({ pageTitle, document, outputPath }) => {
  const content = collectPageContent({ pageTitle, document });

  try {
    await fs.writeFileSync(outputPath, content);
  } catch (err) {
    console.log("Failed to write Intro", err);
  }
  console.log("Written Intro.");
};
