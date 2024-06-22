export const chapter = ({ pageTitle, contents }) => {
  return `<?xml version='1.0' encoding='utf-8'?>
  <!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="en">
<head>
<title>${pageTitle}</title>
<meta charset="UTF-8"/>
</head>
<body>
<section epub:type="bodymatter">
<h1>${pageTitle}</h1>
${contents.join("\n")}
</section>

</body>
</html>
`;
};

{
  /* <link rel="stylesheet" type="text/css" href="../page_styles.css"/> */
}
