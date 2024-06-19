import fs from "fs";
import path from "path";

export const cleanFolder = (folderPath) => {
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
