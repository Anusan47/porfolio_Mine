import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { data } from "@/data/data";

export interface SunsetPhoto {
  src: string;
  alt: string;
  /** Tiny base64 preview used as next/image's blur placeholder. */
  blurDataURL?: string;
}

const IMAGE_RE = /\.(webp|jpe?g|png|avif)$/i;

/**
 * Generates a tiny blurred base64 preview so next/image can render a
 * placeholder in the SSR HTML — visible before hydration and while the
 * full photo streams in. Returns undefined if the file can't be read.
 */
async function makeBlurDataURL(file: string): Promise<string | undefined> {
  try {
    const buffer = await sharp(file)
      .resize(16, 16, { fit: "inside" })
      .webp({ quality: 40 })
      .toBuffer();
    return `data:image/webp;base64,${buffer.toString("base64")}`;
  } catch {
    return undefined;
  }
}

/**
 * Maps over the curated list in data.tsx and generates blur placeholders if the file exists.
 */
export async function getObsessionPhotos(items: {src: string, alt: string}[]): Promise<SunsetPhoto[]> {
  const publicDir = path.join(process.cwd(), "public");
  
  return Promise.all(
    items.map(async (item) => {
      const file = path.join(publicDir, item.src);
      let blurDataURL = undefined;
      
      try {
        if (fs.existsSync(file)) {
          blurDataURL = await makeBlurDataURL(file);
        }
      } catch {
        // file might not exist yet, that's fine
      }
      
      return {
        src: item.src,
        alt: item.alt,
        blurDataURL,
      };
    }),
  );
}

