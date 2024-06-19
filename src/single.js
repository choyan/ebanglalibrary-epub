import { loadData } from "./utils/loadData.js";
import { generateChapter } from "./templates/generateChapter.js";

export const downloadSinglePage = async ({ url: URL }) => {
  const { $ } = await loadData({ url: URL });

  const pageTitle = $("title");

  const contentRoot = $(".ld-tabs-content p");

  let contents = [];

  contentRoot.each(function () {
    const filteredHtml = $(this)
      .html()
      .replace(/&nbsp;/g, " ");

    $(this).html(filteredHtml);

    contents.push($(this));
  });

  const content = generateChapter({ pageTitle, contents });

  return {
    content,
  };
};
