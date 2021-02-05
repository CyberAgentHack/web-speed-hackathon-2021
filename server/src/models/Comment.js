import { DataTypes } from 'sequelize';
import { ulid } from 'ulid';

import { sequelize } from '../sequelize';

/**
 * @typedef {object} PostAttributes
 * @property {string} id
 * @property {string} userId
 * @property {string} text
 * @property {number} favoriteCount
 */

/**
 * @typedef {import('sequelize').Model<PostAttributes>} PostModel
 */

/** @type {import('sequelize').ModelCtor<PostModel>} */
const Comment = sequelize.define(
  'Comment',
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: () => ulid(),
      allowNull: false,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['userId', 'postId', 'soundId'],
      },
      include: [
        {
          association: 'user',
          attributes: { exclude: ['profileImageId'] },
          include: { association: 'profileImage' },
        },
      ],
    },
  },
);

export { Comment };
