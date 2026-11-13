"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
// Entidades del Sistema Logístico LogiExpress
const Cliente_js_1 = require("../entity/Cliente.js");
const Direccion_js_1 = require("../entity/Direccion.js");
const Almacen_js_1 = require("../entity/Almacen.js");
const Envio_js_1 = require("../entity/Envio.js");
const Paquete_js_1 = require("../entity/Paquete.js");
const HistorialRastreo_js_1 = require("../entity/HistorialRastreo.js");
const AuditoriaEnvio_js_1 = require("../entity/AuditoriaEnvio.js");
// Entidades anteriores (compatibilidad)
const Categoria_js_1 = require("../entity/Categoria.js");
const Producto_js_1 = require("../entity/Producto.js");
const Venta_js_1 = require("../entity/Venta.js");
const DetalleVenta_js_1 = require("../entity/DetalleVenta.js");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 3307,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "secret",
    database: process.env.DB_NAME || "ventas_db",
    synchronize: false, // En false para respetar el DDL y los Triggers creados en MySQL
    logging: false,
    entities: [
        Cliente_js_1.Cliente,
        Direccion_js_1.Direccion,
        Almacen_js_1.Almacen,
        Envio_js_1.Envio,
        Paquete_js_1.Paquete,
        HistorialRastreo_js_1.HistorialRastreo,
        AuditoriaEnvio_js_1.AuditoriaEnvio,
        Categoria_js_1.Categoria,
        Producto_js_1.Producto,
        Venta_js_1.Venta,
        DetalleVenta_js_1.DetalleVenta
    ],
});
