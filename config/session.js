import session from 'express-session';
import connectMySQLSession from 'express-mysql-session';
import dotenv from 'dotenv';
import { pool } from './db.js';

dotenv.config();

const MySQLStore = connectMySQLSession(session);

const {
  SESSION_SECRET = 'supersecretstring',
  DB_HOST = 'localhost',
  DB_PORT = 3306,
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'inventory_db'
} = process.env;

const store = new MySQLStore(
  {
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    clearExpired: true,
    checkExpirationInterval: 1000 * 60 * 15,
    expiration: 1000 * 60 * 60 * 24, // 1 day
    createDatabaseTable: true
  },
  pool
);

export const sessionMiddleware = session({
  name: 'inventory.sid',
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24
  }
});