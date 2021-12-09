import Router from 'express-promise-router';
import httpErrors from 'http-errors';

import { Comment, Post } from '../../models';

const router = Router();

router.get('/posts', async (req, res) => {
  const posts = await Post.findAll({
    limit: req.query.limit,
    offset: req.query.offset,
  });

  return res.status(200).type('application/json').send(posts);
});

router.get('/posts/:postId', async (req, res) => {
  const post = await Post.findByPk(req.params.postId);

  if (post === null) {
    throw new httpErrors.NotFound();
  }

  return res.status(200).type('application/json').send(post);
});

router.get('/posts/:postId/comments', async (req, res) => {
  const posts = await Comment.findAll({
    limit: req.query.limit,
    offset: req.query.offset,
    where: {
      postId: req.params.postId,
    },
  });

  return res.status(200).type('application/json').send(posts);
});

router.post('/posts', async (req, res) => {
  if (req.session.userId === undefined) {
    throw new httpErrors.Unauthorized();
  }

  const post = await Post.create(
    {
      ...req.body,
      userId: req.session.userId,
    },
    {
      include: [
        {
          association: 'images',
          through: { attributes: [] },
        },
        { association: 'movie' },
        { association: 'sound' },
      ],
    },
  );

  return res.status(200).type('application/json').send(post);
});

export { router as postRouter };
