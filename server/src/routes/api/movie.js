import fs from 'fs/promises';

import Router from 'express-promise-router';
import httpErrors from 'http-errors';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { convertMovie } from '../../converters/convert_movie';
import { UPLOAD_PATH } from '../../paths';

// 変換した動画の拡張子
const EXTENSION = 'webm';

const router = Router();

router.post('/movies', async (req, res) => {
  if (req.session.userId === undefined) {
    throw new httpErrors.Unauthorized();
  }
  if (Buffer.isBuffer(req.body) === false) {
    throw new httpErrors.BadRequest();
  }

  const movieId = uuidv4();

  const converted = await convertMovie(req.body, {
    size: undefined, // 動画の縦横サイズを指定する (undefined は元動画に合わせる)
    extension: EXTENSION, // 動画の拡張子を指定する
  });

  const filePath = path.resolve(UPLOAD_PATH, `./movies/${movieId}.${EXTENSION}`);
  await fs.writeFile(filePath, converted);

  return res.status(200).type('application/json').send({ id: movieId });
});

export { router as movieRouter };
