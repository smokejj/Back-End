import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from "dotenv"

dotenv.config()

const{ DB_NAME, DB_HOST, DB_USER,DB_PORT, DB_PASS} = process.env;

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER, // seu usuário do MySQL
    password: DB_PASS, // sua senha
    database: DB_NAME,
    synchronize: true, // CUIDADO! True no desenvolvimento, False em produção
    logging: true,
    entities: ["src/models/*.ts"],
});