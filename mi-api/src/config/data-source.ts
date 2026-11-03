import "reflect-metadata";
import { DataSource } from "typeorm";
import { Categoria } from "../entity/Categoria.js";
import { Producto } from "../entity/Producto.js";
import { Venta } from "../entity/Venta.js";
import { DetalleVenta } from "../entity/DetalleVenta.js";

import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 3307,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "secret",
    database: process.env.DB_NAME || "ventas_db",
    synchronize: true,
    logging: false,
    entities: [Categoria, Producto, Venta, DetalleVenta],
});
