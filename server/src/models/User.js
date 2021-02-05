import bcrypt from 'bcrypt';
import { DataTypes, Sequelize } from 'sequelize';

import { sequelize } from '../sequelize';

/**
 * @typedef {object} UserAttributes
 * @property {string} id
 * @property {string} username
 * @property {string} name
 * @property {string} description
 * @property {string} password
 * @property {Array<import('./Post').Post>} posts
 * @property {import('./ProfileImage').ProfileImage} profileImage
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
    description: {
      allowNull: false,
      defaultValue: '',
      type: DataTypes.STRING,
    },
    id: {
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      get() {
        return undefined;
      },
      set(value) {
        this.setDataValue('password', this.generateHash(value));
      },
      type: DataTypes.STRING,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        is: /^[a-z0-9_-]+$/i,
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
