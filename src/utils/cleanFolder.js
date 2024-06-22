import fs from "fs";
import path from "path";

export const cleanFolder = (folderPath) => {
  const oebpsPath = path.join(folderPath, "");

  // Check if the OEBPS folder exists, create it if it doesn't
  if (!fs.existsSync(oebpsPath)) {
    fs.mkdirSync(oebpsPath, { recursive: true });
    console.log(`Created folder: ${oebpsPath}`);
    return;
  }

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${filePath} - ${err}`);
        } else {
          console.log(`Deleted file: ${filePath}`);
        }
      });
    });
  });
};
