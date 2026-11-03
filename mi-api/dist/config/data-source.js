"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Categoria_js_1 = require("../entity/Categoria.js");
const Producto_js_1 = require("../entity/Producto.js");
const Venta_js_1 = require("../entity/Venta.js");
const DetalleVenta_js_1 = require("../entity/DetalleVenta.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 3307,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "secret",
    database: process.env.DB_NAME || "ventas_db",
    synchronize: true,
    logging: false,
    entities: [Categoria_js_1.Categoria, Producto_js_1.Producto, Venta_js_1.Venta, DetalleVenta_js_1.DetalleVenta],
});
