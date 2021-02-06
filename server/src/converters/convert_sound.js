import { ffmpeg } from '../ffmpeg';

/**
 * @param {Buffer} buffer
 * @param {object} options
 * @param {number} [options.extension]
 * @returns {Promise<Uint8Array>}
 */
async function convertSound(buffer, options) {
  const exportFile = `export.${options.extension ?? 'mp3'}`;

  if (ffmpeg.isLoaded() === false) {
    await ffmpeg.load();
  }

  ffmpeg.FS('writeFile', 'file', new Uint8Array(buffer));

  await ffmpeg.run(...['-i', 'file', '-acodec', 'libmp3lame', '-b:a', '8k', '-ac', '1', '-ar', '11025', exportFile]);

  return ffmpeg.FS('readFile', exportFile);
}

export { convertSound };
