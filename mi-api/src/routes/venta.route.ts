import { Router } from "express";
import {
    getVentas,
    getVentaById,
    createVenta,
    updateVenta,
    deleteVenta
} from "../controllers/venta.controller.js";

const router = Router();

// GETALL: Obtener todas las ventas
router.get('/ventas', getVentas);

// GETBYID: Obtener una venta por ID (soporta /ventas/:id y /venta/:id)
router.get('/ventas/:id', getVentaById);
router.get('/venta/:id', getVentaById);

// POST: Crear una nueva venta (soporta /ventas y /venta)
router.post('/ventas', createVenta);
router.post('/venta', createVenta);

// PUT: Actualizar una venta existente (soporta /ventas/:id y /venta/:id)
router.put('/ventas/:id', updateVenta);
router.put('/venta/:id', updateVenta);

// DELETE: Eliminar una venta (soporta /ventas/:id y /venta/:id)
router.delete('/ventas/:id', deleteVenta);
router.delete('/venta/:id', deleteVenta);

export default router;
