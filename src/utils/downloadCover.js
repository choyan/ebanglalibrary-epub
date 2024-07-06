import axios from "axios";
import fs from "fs";
import {
  COVER_IMAGE_CLASS,
  COVER_IMAGE_PATH,
  ALTERNATE_COVER,
} from "../config.js";

export const downloadCover = async (document) => {
  try {
    const url =
      document.querySelector(COVER_IMAGE_CLASS)?.getAttribute("src") ??
      ALTERNATE_COVER;

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
