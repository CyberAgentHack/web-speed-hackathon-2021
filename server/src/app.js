import bodyParser from 'body-parser';
import Express from 'express';
import session from 'express-session';

import { apiRouter } from './routes/api';
import { staticRouter } from './routes/static';
import compression from 'compression';

const app = Express();
app.use(compression({filter: shouldCompress}))

function shouldCompress(req, res) {
  const url = req.url;
  const doCompress = url.includes('css') || url.includes('js') || url === '/';
  if(doCompress) {
    return compression.filter(req, res);
  } else {
    return false;
  }
}

app.set('trust proxy', true);

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'secret',
    proxy: true,
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.raw({ limit: '10mb' }));

app.use((_req, res, next) => {
  res.header({
    Connection: 'keep-alive',
    'Cache-Control': 'max-age=31536000',
  });
  return next();
});

app.use('/api/v1', apiRouter);
app.use(staticRouter);

export { app };
