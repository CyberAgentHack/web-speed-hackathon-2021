import sharp from 'sharp';

/**
 * @param {Buffer} buffer
 * @param {object} options
 * @param {number} [options.size]
 * @param {number} [options.extension]
 * @returns {Promise<Uint8Array>}
 */
async function convertImage(buffer, options) {
  return sharp(buffer)
    .resize({
      fit: 'contain',
      width: options.size,
      height: options.size,
    })
    .toFormat(options.extension ?? 'jpeg')
    .toBuffer();
}

export { convertImage };
