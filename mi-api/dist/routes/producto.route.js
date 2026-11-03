"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_controller_js_1 = require("../controllers/producto.controller.js");
const router = (0, express_1.Router)();
// GETALL: Obtener todos los productos
router.get('/productos', producto_controller_js_1.getProductos);
// GETBYID: Obtener un producto por ID (soporta /productos/:id y /producto/:id)
router.get('/productos/:id', producto_controller_js_1.getProductoById);
router.get('/producto/:id', producto_controller_js_1.getProductoById);
// POST: Crear un nuevo producto (soporta /productos y /producto)
router.post('/productos', producto_controller_js_1.createProducto);
router.post('/producto', producto_controller_js_1.createProducto);
// PUT: Actualizar un producto existente (soporta /productos/:id y /producto/:id)
router.put('/productos/:id', producto_controller_js_1.updateProducto);
router.put('/producto/:id', producto_controller_js_1.updateProducto);
// DELETE: Eliminar un producto (soporta /productos/:id y /producto/:id)
router.delete('/productos/:id', producto_controller_js_1.deleteProducto);
router.delete('/producto/:id', producto_controller_js_1.deleteProducto);
exports.default = router;
