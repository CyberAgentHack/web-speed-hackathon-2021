import bcrypt from 'bcrypt';
import { Sequelize, DataTypes } from 'sequelize';

import { sequelize } from '../sequelize';

/**
 * @typedef {object} UserAttributes
 * @property {string} id
 * @property {string} username
 * @property {string} name
 * @property {string} description
 * @property {string} password
 * @property {import('./Post').Post} posts
 * @property {import('./Image').Image} profileImage
 */

/**
 * @typedef {object} UserModelMethods
 * @property {(password: string) => string} generateHash
 * @property {(password: string) => string} validPassword
 */

/**
 * @typedef {import('sequelize').Model<UserAttributes> & UserModelMethods} UserModel
 */

/** @type {import('sequelize').ModelCtor<UserModel>} */
const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-z0-9_-]+$/i,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return undefined;
      },
      set(value) {
        this.setDataValue('password', this.generateHash(value));
      },
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ['profileImageId'] },
      include: { association: 'profileImage' },
    },
  },
);

Object.assign(User.prototype, {
  generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  },
  validPassword(password) {
    return bcrypt.compareSync(password, this.getDataValue('password'));
  },
});

export { User };
