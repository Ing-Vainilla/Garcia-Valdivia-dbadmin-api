"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cliente_controller_js_1 = require("../controllers/cliente.controller.js");
const router = (0, express_1.Router)();
// Endpoint 6: GET /api/clientes/:id/envios → Historial de envíos vinculados a un cliente específico
router.get("/clientes/:id/envios", cliente_controller_js_1.getEnviosPorCliente);
exports.default = router;
