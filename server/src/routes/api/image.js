import fs from 'fs/promises';

import Router from 'express-promise-router';
import httpErrors from 'http-errors';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { convertImage } from '../../converters/convert_image';
import { UPLOAD_PATH } from '../../paths';
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

// 変換した画像の拡張子
const EXTENSION = 'webp';

const router = Router();

router.post('/images', async (req, res) => {
  if (req.session.userId === undefined) {
    throw new httpErrors.Unauthorized();
  }
  if (Buffer.isBuffer(req.body) === false) {
    throw new httpErrors.BadRequest();
  }

  // ここでwebPに画像変換
  const webpFile = await imagemin.buffer(req.body, {
    plugins: [imageminWebp({ quality: 50 })],
  });

  const imageId = uuidv4();

  const converted = await convertImage(webpFile, {
    size: undefined, // 画像の縦横サイズを指定する (undefined は元動画に合わせる)
    extension: EXTENSION, // 画像の拡張子を指定する
  });

  // ユーザーが挙げた画像をuploadディレクトリに入れる
  const filePath = path.resolve(UPLOAD_PATH, `./images/${imageId}.${EXTENSION}`);
  await fs.writeFile(filePath, converted);

  return res.status(200).type('application/json').send({ id: imageId });
});

export { router as imageRouter };
