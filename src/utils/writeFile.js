import fs from "fs";

export const writeFile = async ({ outputPath, data }) => {
  await fs.writeFileSync(outputPath, data);
};
