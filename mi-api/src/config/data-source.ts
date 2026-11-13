import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

// Entidades de LogiExpress
import { Cliente } from "../entity/Cliente.js";
import { Direccion } from "../entity/Direccion.js";
import { Almacen } from "../entity/Almacen.js";
import { Envio } from "../entity/Envio.js";
import { Paquete } from "../entity/Paquete.js";
import { HistorialRastreo } from "../entity/HistorialRastreo.js";
import { AuditoriaEnvio } from "../entity/AuditoriaEnvio.js";

// Entidades anteriores
import { Categoria } from "../entity/Categoria.js";
import { Producto } from "../entity/Producto.js";
import { Venta } from "../entity/Venta.js";
import { DetalleVenta } from "../entity/DetalleVenta.js";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 3308,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "secret",
    database: process.env.DB_NAME || "logiexpress_db",
    synchronize: false, // En false para respetar el DDL y los Triggers creados en MySQL
    logging: false,
    entities: [
        Cliente,
        Direccion,
        Almacen,
        Envio,
        Paquete,
        HistorialRastreo,
        AuditoriaEnvio,
        Categoria,
        Producto,
        Venta,
        DetalleVenta
    ],
});
