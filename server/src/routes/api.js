import Router from 'express-promise-router';
import httpErrors from 'http-errors';
import { ValidationError } from 'sequelize';

import { authRouter } from './api/auth';
import { imageRouter } from './api/image';
import { initializeRouter } from './api/initialize';
import { movieRouter } from './api/movie';
import { postRouter } from './api/post';
import { soundRouter } from './api/sound';
import { userRouter } from './api/user';

const router = Router();

router.use(initializeRouter);
router.use(userRouter);
router.use(postRouter);
router.use(movieRouter);
router.use(imageRouter);
router.use(soundRouter);
router.use(authRouter);

router.use(async (err, _req, _res, _next) => {
  if (err instanceof ValidationError) {
    throw new httpErrors.BadRequest();
  }
  throw err;
});

router.use(async (err, _req, res, _next) => {
  if (!('status' in err) || err.status === 500) {
    console.error(err);
  }

  return res
    .status(err.status || 500)
    .type('application/json')
    .send({
      message: err.message,
    });
});

export { router as apiRouter };
