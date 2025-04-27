import mysql from 'mysql2/promise';
import { config } from 'dotenv';
config();

(async () => {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });
    console.log('✅ Database connected');
    await conn.end();
  } catch (error) {
    console.error('❌ DB connection failed:', error.message);
  }
})();
