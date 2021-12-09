import { DataTypes } from 'sequelize';
import { ulid } from 'ulid';

import { sequelize } from '../sequelize';

/**
 * @typedef {object} CommentAttributes
 * @property {string} id
 * @property {string} userId
 * @property {string} text
 */

/**
 * @typedef {import('sequelize').Model<CommentAttributes>} CommentModel
 */

/** @type {import('sequelize').ModelCtor<CommentModel>} */
const Comment = sequelize.define(
  'Comment',
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
        exclude: ['userId', 'postId'],
      },
      include: [
        {
          association: 'user',
          attributes: { exclude: ['profileImageId'] },
          include: { association: 'profileImage' },
        },
      ],
      order: [['id', 'ASC']],
    },
  },
);

export { Comment };
