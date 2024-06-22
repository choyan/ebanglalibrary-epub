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
    console.log(`Cover Image downloaded and saved to ${outputPath}`);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    console.error("Error downloading the image:", error);
  }
};
