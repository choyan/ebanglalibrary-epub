export function pageStyles() {
  return `@charset "utf-8";
    @page {
      margin-bottom: 5pt;
      margin-top: 5pt;
    }
    @font-face {
      font-family: "Kalpurush", serif;
      src: url("OEBPS/Kalpurush.ttf")
    }
    ol {
        list-style: bengali;
    }
    body {
      font-family: "Kalpurush", serif
    }
  `;
}
