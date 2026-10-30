import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? walk(path.join(dir, entry.name))
          : path.join(dir, entry.name),
      ),
    )
  ).flat();
}
const files = (await walk(root)).filter(
  (file) =>
    file.endsWith(".html") &&
    !file.includes("/404") &&
    !file.includes("/_not-found/"),
);
const errors = [];
const titles = new Set();
let links = 0;
for (const file of files) {
  const html = await readFile(file, "utf8");
  const route = "/" + path.relative(root, file).replace(/index\.html$/, "");
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  if (!title || titles.has(title))
    errors.push(`${route}: missing or duplicate title`);
  titles.add(title);
  if ((html.match(/<h1\b/g) ?? []).length !== 1)
    errors.push(`${route}: expected one h1`);
  if (!/<meta name="description" content="[^"]+"/.test(html))
    errors.push(`${route}: missing description`);
  if (
    route.startsWith("/blog/") &&
    route !== "/blog/" &&
    html.includes("Demo article") &&
    !/<meta name="robots" content="noindex, follow"/.test(html)
  )
    errors.push(`${route}: demo article must not be indexed`);
  for (const match of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
    const value = match[1].replaceAll("&amp;", "&");
    if (!value.startsWith("/") && !value.startsWith("#")) continue;
    const url = new URL(value, `https://export-check.invalid${route}`);
    let target = path.join(root, decodeURIComponent(url.pathname));
    try {
      if ((await stat(target)).isDirectory())
        target = path.join(target, "index.html");
      await stat(target);
      if (url.hash && target.endsWith(".html")) {
        const targetHtml =
          target === file ? html : await readFile(target, "utf8");
        const id = decodeURIComponent(url.hash.slice(1));
        if (id && !targetHtml.includes(`id="${id}"`))
          errors.push(`${route}: missing anchor ${value}`);
      }
    } catch {
      errors.push(`${route}: missing local target ${value}`);
    }
    links++;
  }
}
if (errors.length) {
  console.error([...new Set(errors)].join("\n"));
  process.exitCode = 1;
} else
  console.log(
    `Verified ${files.length} exported pages, unique titles, descriptions, one h1 per page, demo noindex metadata and ${links} local links/assets.`,
  );
