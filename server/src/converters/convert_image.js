import sharp from 'sharp';

/**
 * @param {Buffer} buffer
 * @param {object} options
 * @param {number} [options.extension]
 * @param {number} [options.height]
 * @param {number} [options.width]
 * @returns {Promise<Uint8Array>}
 */
async function convertImage(buffer, options) {
  return sharp(buffer)
    .resize({
      fit: 'cover',
      height: options.height,
      width: options.width,
    })
    .toFormat(options.extension ?? 'jpeg')
    .toBuffer();
}

export { convertImage };
