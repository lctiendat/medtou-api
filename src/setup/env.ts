import 'dotenv/config'

const NODE_ENV: string = process.env.NODE_ENV;
const SV_PORT: number = +(process.env.SV_PORT) || 3000;
const PREFIX_API: string = '/api/v1';
const SWAGGER_URI: string = '/documentation';

const MONGO_URL: string = process.env.MONGO_URL

const DB_HOST = process.env.DB_HOST;
const DB_PORT = +(process.env.DB_PORT);
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET
const JWT_ACCESS_TIME = process.env.JWT_ACCESS_TIME

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
const JWT_REFRESH_TIME = process.env.JWT_REFRESH_TIME


export const envConfig = {
    NODE_ENV,
    SV_PORT,
    PREFIX_API,
    SWAGGER_URI,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    MONGO_URL,
    JWT_ACCESS_SECRET,
    JWT_ACCESS_TIME,
    JWT_REFRESH_SECRET,
    JWT_REFRESH_TIME,
}