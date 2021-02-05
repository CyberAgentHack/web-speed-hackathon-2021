import { Sequelize, DataTypes } from 'sequelize';

import { sequelize } from '../sequelize';

/**
 * @typedef {object} MovieAttributes
 * @property {string} id
 */

/**
 * @typedef {import('sequelize').Model<MovieAttributes>} MovieModel
 */

/** @type {import('sequelize').ModelCtor<MovieModel>} */
const Movie = sequelize.define('Movie', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
});

export { Movie };
