import { DataTypes } from 'sequelize';

import { sequelize } from '../sequelize';

import { Image } from './Image';
import { Post } from './Post';

const PostsImagesRelation = sequelize.define('PostsImagesRelation', {
  postId: {
    type: DataTypes.STRING,
    references: {
      model: Post,
    },
  },
  imageId: {
    type: DataTypes.STRING,
    references: {
      model: Image,
    },
  },
});

export { PostsImagesRelation };
