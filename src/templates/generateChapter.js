export const generateChapter = ({ pageTitle, contents }) => {
  return `<?xml version='1.0' encoding='utf-8'?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="en">
<head>
${pageTitle}
<meta charset="UTF-8"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" type="text/css" href="../page_styles.css"/>
</head>
<body>
<section epub:type="bodymatter">
      <h1>${pageTitle.text()}</h1>
      ${contents.join("\n")}
</section>

</body>
</html>`;
};
