import Router from 'express-promise-router';
import httpErrors from 'http-errors';

import { Post, Comment } from '../../models';

const router = Router();

router.get('/posts', async (req, res) => {
  const posts = await Post.findAll({
    limit: req.query.limit,
    offset: req.query.offset,
    order: [['id', 'DESC']],
  });

  return res.status(200).type('application/json').send(posts);
});

router.get('/posts/:id', async (req, res) => {
  const post = await Post.findByPk(req.params.id);

  if (post === null) {
    throw new httpErrors.NotFound();
  }

  return res.status(200).type('application/json').send(post);
});

router.get('/posts/:id/comments', async (req, res) => {
  const posts = await Comment.findAll({
    where: {
      postId: req.params.id,
    },
    limit: req.query.limit,
    offset: req.query.offset,
    order: [['id', 'DESC']],
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
