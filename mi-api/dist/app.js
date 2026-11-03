"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_js_1 = __importDefault(require("./routes/user.routes.js"));
const app = (0, express_1.default)();
// Middleware para parsear JSON
app.use(express_1.default.json());
app.use('/api/', user_routes_js_1.default);
// Ruta de prueba/salud
app.get('/api/status', (req, res) => {
    res.json({ status: 'OK', message: 'API funcionando correctamente' });
});
exports.default = app;
