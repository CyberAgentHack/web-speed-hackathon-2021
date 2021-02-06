import { ffmpeg } from '../ffmpeg';

/**
 * 先頭 5 秒のみ、正方形にくり抜かれた無音動画を作成します
 * @param {Buffer} buffer
 * @param {object} options
 * @param {number} [options.size]
 * @param {number} [options.extension]
 * @returns {Promise<Uint8Array>}
 */
async function convertMovie(buffer, options) {
  const cropOptions = ["'min(iw,ih)':'min(iw,ih)'", options.size ? `scale=${options.size}:${options.size}` : undefined]
    .filter(Boolean)
    .join(',');

  const exportFile = `export.${options.extension ?? 'gif'}`;

  if (ffmpeg.isLoaded() === false) {
    await ffmpeg.load();
  }

  ffmpeg.FS('writeFile', 'file', new Uint8Array(buffer));

  await ffmpeg.run(
    ...[
      '-i',
      'file',
      '-vcodec',
      'libvpx',
      '-cpu-used',
      '-5',
      '-threads',
      '8',
      '-speed',
      '8',
      // '-c',
      // 'vp9',
      // '-b:v',
      // '0',
      // '-crf',
      // '41',
      // '-vf',
      // `crop=${cropOptions}`,
      // '-an',
      exportFile,
    ],
  );

  return ffmpeg.FS('readFile', exportFile);
}

export { convertMovie };
