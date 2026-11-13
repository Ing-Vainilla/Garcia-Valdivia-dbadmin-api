"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const almacen_controller_js_1 = require("../controllers/almacen.controller.js");
const router = (0, express_1.Router)();
// Endpoint 3: POST /api/almacenes/:id/paquetes → Asigna paquete (Detona Trigger Capacidad, captura error 45000 -> HTTP 400)
router.post("/almacenes/:id/paquetes", almacen_controller_js_1.addPaqueteToAlmacen);
exports.default = router;
