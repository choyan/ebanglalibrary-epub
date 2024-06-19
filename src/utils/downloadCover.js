import axios from "axios";
import fs from "fs";

export const downloadImage = async (url, outputPath) => {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    const writer = fs.createWriteStream(outputPath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    console.error("Error downloading the image:", error);
  }
};
