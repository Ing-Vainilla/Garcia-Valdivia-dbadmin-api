"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVenta = exports.deleteVenta = exports.updateVenta = exports.createVenta = exports.getVentaById = exports.getVentas = void 0;
const VentaRepository_js_1 = require("../repository/VentaRepository.js");
// GETALL: Obtener todas las ventas
const getVentas = async (req, res) => {
    try {
        const ventas = await VentaRepository_js_1.ventaRepository.findAll();
        return res.status(200).json({
            status: 200,
            message: "Ventas obtenidas exitosamente",
            data: ventas,
        });
    }
    catch (error) {
        console.error("Error al obtener ventas:", error);
        return res.status(500).json({
            status: 500,
            message: "Error interno del servidor al obtener las ventas",
            error: error instanceof Error ? error.message : error,
        });
    }
};
exports.getVentas = getVentas;
// GETBYID: Obtener una venta por su ID
const getVentaById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                status: 400,
                message: "El ID de la venta debe ser un número válido",
            });
        }
        const venta = await VentaRepository_js_1.ventaRepository.findById(id);
        if (!venta) {
            return res.status(404).json({
                status: 404,
                message: `Venta con ID ${id} no encontrada`,
                data: null,
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Venta encontrada",
            data: venta,
        });
    }
    catch (error) {
        console.error("Error al obtener venta por ID:", error);
        return res.status(500).json({
            status: 500,
            message: "Error interno del servidor al obtener la venta",
            error: error instanceof Error ? error.message : error,
        });
    }
};
exports.getVentaById = getVentaById;
// POST: Crear una nueva venta
const createVenta = async (req, res) => {
    try {
        const { cliente, total, fecha, detalles } = req.body;
        if (!cliente) {
            return res.status(400).json({
                status: 400,
                message: "El campo 'cliente' es obligatorio",
            });
        }
        let ventaDetalles = undefined;
        let calculatedTotal = total !== undefined ? Number(total) : 0;
        if (Array.isArray(detalles) && detalles.length > 0) {
            let sumSubtotals = 0;
            ventaDetalles = detalles.map((d) => {
                const cantidad = Number(d.cantidad || 1);
                const precioUnitario = Number(d.precioUnitario ?? d.precio_unitario ?? 0);
                const subtotal = Number(d.subtotal ?? (cantidad * precioUnitario));
                sumSubtotals += subtotal;
                return {
                    productoId: Number(d.productoId ?? d.producto_id),
                    cantidad,
                    precioUnitario,
                    subtotal,
                };
            });
            if (total === undefined) {
                calculatedTotal = sumSubtotals;
            }
        }
        const nuevaVenta = await VentaRepository_js_1.ventaRepository.create({
            cliente,
            total: calculatedTotal,
            ...(fecha ? { fecha: new Date(fecha) } : {}),
            ...(ventaDetalles ? { detalles: ventaDetalles } : {})
        });
        const ventaCompleta = await VentaRepository_js_1.ventaRepository.findById(nuevaVenta.ventaId);
        return res.status(201).json({
            status: 201,
            message: "Venta creada exitosamente",
            data: ventaCompleta || nuevaVenta,
        });
    }
    catch (error) {
        console.error("Error al crear venta:", error);
        return res.status(500).json({
            status: 500,
            message: "Error interno del servidor al crear la venta",
            error: error instanceof Error ? error.message : error,
        });
    }
};
exports.createVenta = createVenta;
// PUT: Actualizar una venta existente por su ID
const updateVenta = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                status: 400,
                message: "El ID de la venta debe ser un número válido",
            });
        }
        const existing = await VentaRepository_js_1.ventaRepository.findById(id);
        if (!existing) {
            return res.status(404).json({
                status: 404,
                message: `Venta con ID ${id} no encontrada`,
                data: null,
            });
        }
        const { cliente, total, fecha } = req.body;
        const updateData = {};
        if (cliente !== undefined)
            updateData.cliente = cliente;
        if (total !== undefined)
            updateData.total = Number(total);
        if (fecha !== undefined)
            updateData.fecha = new Date(fecha);
        const ventaActualizada = await VentaRepository_js_1.ventaRepository.update(id, updateData);
        return res.status(200).json({
            status: 200,
            message: "Venta actualizada exitosamente",
            data: ventaActualizada,
        });
    }
    catch (error) {
        console.error("Error al actualizar la venta:", error);
        return res.status(500).json({
            status: 500,
            message: "Error interno del servidor al actualizar la venta",
            error: error instanceof Error ? error.message : error,
        });
    }
};
exports.updateVenta = updateVenta;
// DELETE: Eliminar una venta por su ID
const deleteVenta = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                status: 400,
                message: "El ID de la venta debe ser un número válido",
            });
        }
        const existing = await VentaRepository_js_1.ventaRepository.findById(id);
        if (!existing) {
            return res.status(404).json({
                status: 404,
                message: `Venta con ID ${id} no encontrada`,
                data: null,
            });
        }
        await VentaRepository_js_1.ventaRepository.delete(id);
        return res.status(200).json({
            status: 200,
            message: `Venta con ID ${id} eliminada exitosamente`,
        });
    }
    catch (error) {
        console.error("Error al eliminar la venta:", error);
        return res.status(500).json({
            status: 500,
            message: "Error interno del servidor al eliminar la venta",
            error: error instanceof Error ? error.message : error,
        });
    }
};
exports.deleteVenta = deleteVenta;
// Alias para compatibilidad
exports.getVenta = exports.getVentaById;
