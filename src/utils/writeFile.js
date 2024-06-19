import fs from "fs";

export const writeFile = ({ outputPath, data }) => {
  fs.writeFile(outputPath, data, (err) => {
    if (err) {
      console.error("Error writing the file:", err);
      return;
    }
  });
};
