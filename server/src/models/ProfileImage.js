import { DataTypes, Sequelize } from 'sequelize';

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
  alt: {
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
});

export { ProfileImage };
