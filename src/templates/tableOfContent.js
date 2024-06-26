export const tableOfContent = ({ chapters }) => {
  return `<?xml version='1.0' encoding='UTF-8'?>
<html xmlns:epub="http://www.idpf.org/2007/ops" xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <title>Table of Contents</title>
      <meta charset="UTF-8" />

      <style>
        ol {
          list-style: bengali;
        }
      </style>
    </head>
    <body>
      <h1>সূচিপত্র</h1>
      <nav id="toc" epub:type="toc">
        <ol>
          ${chapters
            .map(
              (chapter) =>
                `<li id="chapter-${chapter.id}"><a epub:type="bodymatter" href="./${chapter.id}.xhtml">${chapter.name}</a></li>`,
            )
            .join("\n")}
        </ol>
      </nav>
    </body>
</html>
  `;
};
