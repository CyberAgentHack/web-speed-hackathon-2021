import { Sequelize } from 'sequelize';

import { DATABASE_PATH } from './paths';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  logging: false,
  storage: DATABASE_PATH,
});

export { sequelize };
