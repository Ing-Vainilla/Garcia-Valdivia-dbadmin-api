"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const venta_controller_js_1 = require("../controllers/venta.controller.js");
const router = (0, express_1.Router)();
// GETALL: Obtener todas las ventas
router.get('/ventas', venta_controller_js_1.getVentas);
// GETBYID: Obtener una venta por ID (soporta /ventas/:id y /venta/:id)
router.get('/ventas/:id', venta_controller_js_1.getVentaById);
router.get('/venta/:id', venta_controller_js_1.getVentaById);
// POST: Crear una nueva venta (soporta /ventas y /venta)
router.post('/ventas', venta_controller_js_1.createVenta);
router.post('/venta', venta_controller_js_1.createVenta);
// PUT: Actualizar una venta existente (soporta /ventas/:id y /venta/:id)
router.put('/ventas/:id', venta_controller_js_1.updateVenta);
router.put('/venta/:id', venta_controller_js_1.updateVenta);
// DELETE: Eliminar una venta (soporta /ventas/:id y /venta/:id)
router.delete('/ventas/:id', venta_controller_js_1.deleteVenta);
router.delete('/venta/:id', venta_controller_js_1.deleteVenta);
exports.default = router;
