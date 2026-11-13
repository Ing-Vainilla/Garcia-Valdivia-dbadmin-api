"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_js_1 = __importDefault(require("./routes/user.routes.js"));
const producto_route_js_1 = __importDefault(require("./routes/producto.route.js"));
const venta_route_js_1 = __importDefault(require("./routes/venta.route.js"));
// Rutas de LogiExpress
const envio_route_js_1 = __importDefault(require("./routes/envio.route.js"));
const almacen_route_js_1 = __importDefault(require("./routes/almacen.route.js"));
const cliente_route_js_1 = __importDefault(require("./routes/cliente.route.js"));
const app = (0, express_1.default)();
// Middleware para parsear JSON
app.use(express_1.default.json());
// Registro de rutas de logi
app.use('/api', envio_route_js_1.default);
app.use('/api', almacen_route_js_1.default);
app.use('/api', cliente_route_js_1.default);
// Registro de rutas previas
app.use('/api', user_routes_js_1.default);
app.use('/api', producto_route_js_1.default);
app.use('/api', venta_route_js_1.default);
// Ruta de prueba
app.get('/api/status', (req, res) => {
    res.json({ status: 'OK', message: 'API LogiExpress funcionando correctamente' });
});
exports.default = app;
