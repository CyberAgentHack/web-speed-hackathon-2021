import { Sequelize, DataTypes } from 'sequelize';

import { sequelize } from '../sequelize';

/**
 * @typedef {object} ImageAttributes
 * @property {string} id
 * @property {string} alt
 */

/**
 * @typedef {import('sequelize').Model<ImageAttributes>} ImageModel
 */

/** @type {import('sequelize').ModelCtor<ImageModel>} */
const Image = sequelize.define('Image', {
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

export { Image };
