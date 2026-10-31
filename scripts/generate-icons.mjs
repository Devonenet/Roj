// Generates the site icons from the supplied ROJ wordmark artwork.
// Run with `node scripts/generate-icons.mjs` if public/brand/roj-logo.png changes.
// The artwork is cropped to the letterforms and centred on black; it is never
// redrawn or recoloured.
import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const SOURCE = "public/brand/roj-logo.png";
const BLACK = { r: 0, g: 0, b: 0, alpha: 1 };

// Crop to the "roj" letterforms so they fill as much of the square as possible.
const { info } = await sharp(SOURCE).trim({ threshold: 40 }).toBuffer({
  resolveWithObject: true,
});
const wordmark = sharp(SOURCE).extract({
  left: -(info.trimOffsetLeft ?? 0),
  top: -(info.trimOffsetTop ?? 0),
  width: info.width,
  height: info.height,
});
const wordmarkPng = await wordmark.png().toBuffer();

async function icon(size, { rounded, padding }) {
  const inner = Math.round(size * (1 - padding * 2));
  const mark = await sharp(wordmarkPng)
    .resize({ width: inner, height: inner, fit: "inside" })
    .toBuffer();
  const tile = await sharp({
    create: { width: size, height: size, channels: 4, background: BLACK },
  })
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toBuffer();
  if (!rounded) return tile;
  const radius = Math.round(size * 0.2);
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}"/></svg>`,
  );
  return sharp(tile)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
}

function ico(images) {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, index) => {
    const entry = 6 + index * 16;
    header.writeUInt8(size >= 256 ? 0 : size, entry);
    header.writeUInt8(size >= 256 ? 0 : size, entry + 1);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((image) => image.data)]);
}

// Tab sizes use minimal padding so the letters stay legible at 16px.
const tab = { rounded: true, padding: 0.04 };
const app = { rounded: true, padding: 0.12 };

await writeFile(
  "src/app/favicon.ico",
  ico(
    await Promise.all(
      [16, 32, 48].map(async (size) => ({
        size,
        data: await icon(size, tab),
      })),
    ),
  ),
);
await writeFile("src/app/icon.png", await icon(96, tab));
await writeFile(
  "src/app/apple-icon.png",
  await icon(180, { rounded: false, padding: 0.12 }),
);
await writeFile("public/icon-192.png", await icon(192, app));
await writeFile("public/icon-512.png", await icon(512, app));
console.log("Generated favicon.ico, icon.png, apple-icon.png and PWA icons.");
