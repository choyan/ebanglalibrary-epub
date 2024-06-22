import { escapeXml } from "../utils/escapeXml.js";

export const packageDocument = ({ epub }) => {
  const { description, title, chapters, author, publisher } = epub;
  const modified = new Date().toISOString().split(".")[0] + "Z";

  return `<?xml version="1.0" encoding="UTF-8"?>
<package
  xmlns="http://www.idpf.org/2007/opf"
  xmlns:opf="http://www.idpf.org/2007/opf"
  version="3.0"
  unique-identifier="BookId"
  >
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="BookId">${Date.now()}</dc:identifier>
      <meta refines="#BookId" property="identifier-type" scheme="onix:codelist5">22</meta>
      <meta property="dcterms:identifier" id="meta-identifier">BookId</meta>

    <dc:title>${escapeXml(title)}</dc:title>
    <dc:language>en</dc:language>
    ${
      description
        ? `<dc:description>${escapeXml(description)}</dc:description>`
        : ""
    }
    <dc:creator id="creator">${author}</dc:creator>
    <dc:publisher>${publisher}</dc:publisher>

    <meta name="generator" content="choyan.github.io" />

    <meta property="dcterms:modified">${modified}</meta>
    <meta name="cover" content="cover"/>
  </metadata>

    <manifest>
      <item id="titlepage" href="titlepage.xhtml" media-type="application/xhtml+xml"/>
      <item id="toc" href="toc.xhtml" media-type="application/xhtml+xml" properties="nav" />
      ${chapters
        .map(
          (chapter) =>
            `<item
              id="chapter-${chapter.id}"
              href="${chapter.id}.xhtml"
              media-type="application/xhtml+xml"
            />`,
        )
        .join("\n")}
        <item id="cover" href="Images/cover.jpg" media-type="image/jpeg"/>
    </manifest>
    <spine>
      <itemref idref="titlepage"/>
      <itemref idref="toc"/>
      ${chapters
        .map((chapter) => `<itemref idref="chapter-${chapter.id}" />`)
        .join("\n")}
    </spine>
    <guide>
      <reference title="Cover" type="cover" href="titlepage.xhtml"/>
      <reference title="Table of content" type="toc" href="toc.xhtml"/>
    </guide>
</package>`;
};
