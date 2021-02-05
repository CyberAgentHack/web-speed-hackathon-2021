import { Sequelize, DataTypes } from 'sequelize';

import { sequelize } from '../sequelize';

/**
 * @typedef {object} SoundAttributes
 * @property {string} id
 * @property {string} title
 * @property {string} artist
 */

/**
 * @typedef {import('sequelize').Model<SoundAttributes>} SoundModel
 */

/** @type {import('sequelize').ModelCtor<SoundModel>} */
const Sound = sequelize.define('Sound', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Unknown',
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Unknown',
  },
});

export { Sound };
