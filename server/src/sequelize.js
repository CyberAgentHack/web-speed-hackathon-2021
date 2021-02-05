import { Sequelize } from 'sequelize';

import { DATABASE_PATH } from './paths';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: DATABASE_PATH,
  logging: false,
});

export { sequelize };
