import { registerAs } from '@nestjs/config';
import * as fs from 'fs';

export const databaseConfig = registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  ssl: {
    // ca: fs.readFileSync(`${__dirname}\\ca.pem`).toString(),
    ca: fs.readFileSync(`ca.pem`).toString(),
  },
  extra: {
    ssl: {
      // Disregard mismatch between localhost and rds.amazonaws.com
      rejectUnauthorized: false,
    },
  },
  synchronize: process.env.NODE_ENV !== 'production',
}));
