import { Router } from "express";
import {
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
} from "../controllers/producto.controller.js";

const router = Router();

// GETALL: Obtener todos los productos
router.get('/productos', getProductos);

// GETBYID: Obtener un producto por ID (soporta /productos/:id y /producto/:id)
router.get('/productos/:id', getProductoById);
router.get('/producto/:id', getProductoById);

// POST: Crear un nuevo producto (soporta /productos y /producto)
router.post('/productos', createProducto);
router.post('/producto', createProducto);

// PUT: Actualizar un producto existente (soporta /productos/:id y /producto/:id)
router.put('/productos/:id', updateProducto);
router.put('/producto/:id', updateProducto);

// DELETE: Eliminar un producto (soporta /productos/:id y /producto/:id)
router.delete('/productos/:id', deleteProducto);
router.delete('/producto/:id', deleteProducto);

export default router;
