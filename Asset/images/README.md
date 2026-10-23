# ROJ photography assets

Keep the supplied originals in `originals/` unchanged. The WebP files in this folder are correctly oriented, resized web derivatives without embedded source metadata. Identical copies are served from `public/Asset/images/` so Next.js includes them in the static export. Update both copies when replacing an asset.

| Source | Optimized file | Website use |
| --- | --- | --- |
| Supplied courtyard PNG | `roj-courtyard.webp` | Large “Stories worth stopping for” showcase tile |
| `IMG_8055.HEIC` | `roj-courtyard-detail.webp` | Film & video service panel |
| `IMG_7922.HEIC` | `roj-studio-wide.webp` | Retained studio photo |
| `IMG_7255.HEIC` | `roj-podcast-set.webp` | Podcasting service panel |
| `IMG_7925.HEIC` | `roj-studio-stage.webp` | Wide homepage studio photograph |
| `IMG_7926.HEIC` | `roj-studio-keyboard.webp` | Music production panel and “Find your frequency” showcase tile |

HEIC files were converted with macOS `sips`; derivatives were resized and encoded using Sharp at WebP quality 84. The photos have not been retouched or generated. Existing CSS overlays and responsive image cropping remain part of the site's visual design.

The two supplied website screenshots identify replacement targets and are not used as photographic assets.
