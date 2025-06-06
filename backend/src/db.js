import pg from "pg";
import env from "dotenv";
import { env as processEnv } from 'process';

env.config();

const db = new pg.Client({
    user: processEnv.DB_USER,
    password: processEnv.DB_PASSWORD,
    host: processEnv.DB_HOST,
    port: processEnv.DB_PORT,
    database: processEnv.DB_DATABASE
});

db.connect().then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log(err);
})

db.on("error", (err) => {
    console.log('Unexpected error on idle client', err);
    processEnv.exit(-1);
});

export const query = (text, params) => db.query(text, params);


export default db;