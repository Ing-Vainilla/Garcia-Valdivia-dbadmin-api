"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_js_1 = __importDefault(require("./app.js"));
const db_js_1 = require("./config/db.js");
const PORT = process.env.PORT || 3000;
async function startServer() {
    await (0, db_js_1.connectDatabase)();
    app_js_1.default.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}
void startServer();
