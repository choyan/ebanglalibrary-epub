import axios from "axios";
import fs from "fs";
import { COVER_IMAGE_PATH } from "../config";

export const downloadImage = async (url) => {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    const writer = fs.createWriteStream(COVER_IMAGE_PATH);

    response.data.pipe(writer);
    console.log(`Cover Image downloaded and saved to ${COVER_IMAGE_PATH}`);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    console.error("Error downloading the image:", error);
  }
};
