export const chapter = ({ pageTitle, contents }) => {
  return `<?xml version='1.0' encoding='utf-8'?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="en">
<head>
<title>${pageTitle}</title>
<style>

h1,
.ftwp-heading {
  text-align: center;
}
</style>
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
