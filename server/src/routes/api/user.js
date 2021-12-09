import Router from 'express-promise-router';
import httpErrors from 'http-errors';

import { Post, User } from '../../models';

const router = Router();

router.get('/me', async (req, res) => {
  if (req.session.userId === undefined) {
    throw new httpErrors.Unauthorized();
  }
  const user = await User.findByPk(req.session.userId);

  if (user === null) {
    throw new httpErrors.NotFound();
  }

  return res.status(200).type('application/json').send(user);
});

router.put('/me', async (req, res) => {
  if (req.session.userId === undefined) {
    throw new httpErrors.Unauthorized();
  }
  const user = await User.findByPk(req.session.userId);

  if (user === null) {
    throw new httpErrors.NotFound();
  }

  Object.assign(user, req.body);
  await user.save();

  return res.status(200).type('application/json').send(user);
});

router.get('/users/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });

  if (user === null) {
    throw new httpErrors.NotFound();
  }

  return res.status(200).type('application/json').send(user);
});

router.get('/users/:username/posts', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });

  if (user === null) {
    throw new httpErrors.NotFound();
  }

  const posts = await Post.findAll({
    limit: req.query.limit,
    offset: req.query.offset,
    where: {
      userId: user.id,
    },
  });

  return res.status(200).type('application/json').send(posts);
});

export { router as userRouter };
