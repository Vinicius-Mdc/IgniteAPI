import 'dotenv/config';
import { DataSource } from 'typeorm';

const migrations = process.env.PRODUCTION === 'true' ? 'dist/database/migrations/*.js' : 'src/database/migrations/*.ts'
const entities = process.env.PRODUCTION === 'true' ? 'dist/entities/*.js' : 'src/entities/*.ts'

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT || '3306'),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  migrations: [
    migrations
  ],
  entities: [
    entities
  ],
});
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
export default AppDataSource;
