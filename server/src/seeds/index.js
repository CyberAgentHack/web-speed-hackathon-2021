import { Image, Movie, Post, ProfileImage, Sound, User, Comment, PostsImagesRelation } from '../models';

import comments from './comments.json';
import images from './images.json';
import movies from './movies.json';
import posts from './posts.json';
import postsImagesRelation from './postsImagesRelation.json';
import profileImages from './profileImages.json';
import sounds from './sounds.json';
import users from './users.json';

async function insertSeeds() {
  await ProfileImage.bulkCreate(profileImages, { logging: false });
  await Image.bulkCreate(images, { logging: false });
  await Movie.bulkCreate(movies, { logging: false });
  await Sound.bulkCreate(sounds, { logging: false });
  await User.bulkCreate(users, { logging: false });
  await Post.bulkCreate(posts, { logging: false });
  await PostsImagesRelation.bulkCreate(postsImagesRelation, { logging: false });
  await Comment.bulkCreate(comments, { logging: false });
}

export { insertSeeds };
