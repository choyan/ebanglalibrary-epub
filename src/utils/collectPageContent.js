import { chapter } from "../templates/chapter.js";
import serialize from "w3c-xmlserializer";

export const collectPageContent = ({ pageTitle, document }) => {
  const contentRoot = document.querySelectorAll(".ld-tabs-content p");

  const contents = [];

  contentRoot.forEach((paragraph) => {
    contents.push(serialize(paragraph));
  });

  const content = chapter({ pageTitle, contents });

  return content;
};
