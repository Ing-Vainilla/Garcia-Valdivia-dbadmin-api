"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const envio_controller_js_1 = require("../controllers/envio.controller.js");
const router = (0, express_1.Router)();
// Endpoint 1: POST /api/envios → Registra un nuevo envío y guarda sus paquetes iniciales
router.post("/envios", envio_controller_js_1.createEnvio);
// Endpoint 2: PUT /api/envios/:id/costo → Modifica el costo total (Detona Trigger Auditoría)
router.put("/envios/:id/costo", envio_controller_js_1.updateCostoEnvio);
// Endpoint 4: POST /api/envios/:id/rastreo → Agrega rastreo (Detona Trigger de actualización a ENTREGADO)
router.post("/envios/:id/rastreo", envio_controller_js_1.addRastreoEnvio);
// Endpoint 5: GET /api/envios → Consulta de envíos activos con TypeORM QueryBuilder
router.get("/envios", envio_controller_js_1.getEnviosActivos);
exports.default = router;
