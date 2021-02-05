import { Sequelize, DataTypes } from 'sequelize';

import { sequelize } from '../sequelize';

/**
 * @typedef {object} ProfileImageAttributes
 * @property {string} id
 * @property {string} alt
 */

/**
 * @typedef {import('sequelize').Model<ProfileImageAttributes>} ProfileImageModel
 */

/** @type {import('sequelize').ModelCtor<ProfileImageModel>} */
const ProfileImage = sequelize.define('ProfileImage', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  alt: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
});

export { ProfileImage };
