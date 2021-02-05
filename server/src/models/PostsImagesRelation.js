import { DataTypes } from 'sequelize';

import { sequelize } from '../sequelize';

import { Image } from './Image';
import { Post } from './Post';

const PostsImagesRelation = sequelize.define('PostsImagesRelation', {
  imageId: {
    references: {
      model: Image,
    },
    type: DataTypes.STRING,
  },
  postId: {
    references: {
      model: Post,
    },
    type: DataTypes.STRING,
  },
});

export { PostsImagesRelation };
