// Generates the default link-preview image: the courtyard photo under a dark
// overlay with the ROJ favicon tile centred on top.
// Run with `node scripts/generate-og-image.mjs` after `node scripts/generate-icons.mjs`.
import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;
const PHOTO = "Asset/images/originals/roj-courtyard.png";
const ICON = "public/icon-512.png";
const OUTPUT = process.argv[2] ?? "public/og-image.jpg";
const OVERLAY_OPACITY = 0.6;
const ICON_SIZE = 420;

const photo = await sharp(PHOTO)
  .rotate()
  .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" })
  .toBuffer();
const overlay = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}"><rect width="100%" height="100%" fill="#000" fill-opacity="${OVERLAY_OPACITY}"/></svg>`,
);
const icon = await sharp(ICON).resize(ICON_SIZE, ICON_SIZE).toBuffer();

await writeFile(
  OUTPUT,
  await sharp(photo)
    .composite([{ input: overlay }, { input: icon, gravity: "centre" }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer(),
);
console.log(`Generated ${OUTPUT} (${WIDTH}x${HEIGHT}).`);
