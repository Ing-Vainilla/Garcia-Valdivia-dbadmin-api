"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const data_source_js_1 = require("./data-source.js");
const connectDatabase = async () => {
    try {
        await data_source_js_1.AppDataSource.initialize();
        console.log("¡Conexión exitosa a la base de datos ventas_db!");
    }
    catch (error) {
        console.error("Error al conectar con la base de datos:", error);
        process.exit(1);
    }
};
exports.connectDatabase = connectDatabase;
