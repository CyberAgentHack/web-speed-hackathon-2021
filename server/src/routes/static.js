import history from 'connect-history-api-fallback';
import Router from 'express-promise-router';
import serveStatic from 'serve-static';

import { PUBLIC_PATH, CLIENT_DIST_PATH, UPLOAD_PATH } from '../paths';

const router = Router();

// SPA 対応のため、ファイルが存在しないときに index.html を返す
router.use(history());

router.use(
  serveStatic(UPLOAD_PATH, {
    cacheControl: true,
    maxAge: 31536000,
    etag: false,
    lastModified: false,
  }),
);

router.use(
  serveStatic(PUBLIC_PATH, {
    cacheControl: true,
    maxAge: 31536000,
    etag: false,
    lastModified: false,
  }),
);

router.use(
  serveStatic(CLIENT_DIST_PATH, {
    etag: false,
    lastModified: true,
  }),
);

router.use(
  serveStatic(`${CLIENT_DIST_PATH}/scripts`, {
    cacheControl: true,
    maxAge: 31536000,
    etag: false,
    lastModified: false,
  })
)

router.use(
  serveStatic(`${CLIENT_DIST_PATH}/styles`, {
    cacheControl: true,
    maxAge: 31536000,
    etag: false,
    lastModified: false,
  })
)

export { router as staticRouter };
