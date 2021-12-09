import { DataTypes } from 'sequelize';
import { ulid } from 'ulid';

import { sequelize } from '../sequelize';

/**
 * @typedef {object} PostAttributes
 * @property {string} id
 * @property {string} userId
 * @property {string} text
 */

/**
 * @typedef {import('sequelize').Model<PostAttributes>} PostModel
 */

/** @type {import('sequelize').ModelCtor<PostModel>} */
const Post = sequelize.define(
  'Post',
  {
    id: {
      allowNull: false,
      defaultValue: () => ulid(),
      primaryKey: true,
      type: DataTypes.STRING,
    },
    text: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['userId', 'movieId', 'soundId'],
      },
      include: [
        {
          association: 'user',
          attributes: { exclude: ['profileImageId'] },
          include: { association: 'profileImage' },
        },
        {
          association: 'images',
          through: { attributes: [] },
        },
        { association: 'movie' },
        { association: 'sound' },
      ],
      order: [
        ['id', 'DESC'],
        ['images', 'createdAt', 'ASC'],
      ],
    },
  },
);

export { Post };
