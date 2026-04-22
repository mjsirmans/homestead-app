/**
 * Minimal EXIF/metadata stripper for JPEG.
 *
 * JPEG structure:
 *   SOI (0xFFD8)
 *   [APPn markers — APP0 JFIF, APP1 EXIF, APP2 ICC, etc.]
 *   ...image data...
 *   EOI (0xFFD9)
 *
 * We remove APP1 (EXIF, which includes GPS coords) and APP13 (IPTC/Photoshop).
 * We keep APP0 (JFIF) and APP2 (ICC color profile) so the image still renders
 * correctly. Anything else is preserved.
 *
 * For PNG, GIF, WebP — we return the bytes unchanged. They don't typically carry
 * the same location metadata risks; WebP's XMP is rare in phone cameras.
 *
 * Returns a new Buffer. Input buffer is not modified.
 */
export function stripExif(input: Buffer, mimeOrExt: string): Buffer {
  const isJpeg = /jpe?g/i.test(mimeOrExt);
  if (!isJpeg) return input;

  // JPEG must start with SOI marker
  if (input.length < 4 || input[0] !== 0xFF || input[1] !== 0xD8) return input;

  const out: number[] = [0xFF, 0xD8];
  let i = 2;

  while (i < input.length - 1) {
    if (input[i] !== 0xFF) {
      // Fallback: something unexpected — copy rest verbatim
      for (let j = i; j < input.length; j++) out.push(input[j]);
      break;
    }
    const marker = input[i + 1];

    // Start-of-scan (SOS, 0xDA) — after this the rest is compressed image data
    // up to EOI. Copy everything.
    if (marker === 0xDA) {
      for (let j = i; j < input.length; j++) out.push(input[j]);
      break;
    }

    // Standalone markers with no length field
    if (marker === 0xD8 || marker === 0xD9 || (marker >= 0xD0 && marker <= 0xD7)) {
      out.push(0xFF, marker);
      i += 2;
      continue;
    }

    // Marker with 2-byte length (big-endian) that includes the length bytes
    if (i + 3 >= input.length) break;
    const segLen = (input[i + 2] << 8) | input[i + 3];
    const segEnd = i + 2 + segLen;

    // Strip APP1 (EXIF) and APP13 (IPTC). APP1 = 0xE1, APP13 = 0xED.
    const shouldStrip = marker === 0xE1 || marker === 0xED;

    if (!shouldStrip) {
      for (let j = i; j < segEnd; j++) out.push(input[j]);
    }
    i = segEnd;
  }

  return Buffer.from(out);
}
