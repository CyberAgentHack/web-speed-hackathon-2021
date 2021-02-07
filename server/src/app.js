import bodyParser from 'body-parser';
import Express from 'express';
import session from 'express-session';
const compression = require('compression');

import { apiRouter } from './routes/api';
import { staticRouter } from './routes/static';

const app = Express();
app.use(compression());

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
    Connection: 'close',
    'Cache-Control': 'max-age=360000',
  });
  return next();
});

app.use('/api/v1', apiRouter);
app.use(staticRouter);

export { app };
