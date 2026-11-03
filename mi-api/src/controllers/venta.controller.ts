import { Request, Response } from "express";
import { ventaRepository } from "../repository/VentaRepository.js";

// GETALL: Obtener todas las ventas
export const getVentas = async (req: Request, res: Response) => {
    try {
        const ventas = await ventaRepository.findAll();

        return res.status(200).json({
            status: 200,
            message: "Ventas obtenidas exitosamente",
            data: ventas,
        });
    } catch (error) {
        console.error("Error al obtener ventas:", error);
        return res.status(500).json({
            status: 500,
            message: "Error interno del servidor al obtener las ventas",
            error: error instanceof Error ? error.message : error,
        });
    }
};

// GETBYID: Obtener una venta por su ID
export const getVentaById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                status: 400,
                message: "El ID de la venta debe ser un número válido",
            });
        }

        const venta = await ventaRepository.findById(id);

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
    } catch (error) {
        console.error("Error al obtener venta por ID:", error);
        return res.status(500).json({
            status: 500,
            message: "Error interno del servidor al obtener la venta",
            error: error instanceof Error ? error.message : error,
        });
    }
};

// POST: Crear una nueva venta
export const createVenta = async (req: Request, res: Response) => {
    try {
        const { cliente, total, fecha, detalles } = req.body;

        if (!cliente) {
            return res.status(400).json({
                status: 400,
                message: "El campo 'cliente' es obligatorio",
            });
        }

        let ventaDetalles: any[] | undefined = undefined;
        let calculatedTotal = total !== undefined ? Number(total) : 0;

        if (Array.isArray(detalles) && detalles.length > 0) {
            let sumSubtotals = 0;
            ventaDetalles = detalles.map((d: any) => {
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

        const nuevaVenta = await ventaRepository.create({
            cliente,
            total: calculatedTotal,
            ...(fecha ? { fecha: new Date(fecha) } : {}),
            ...(ventaDetalles ? { detalles: ventaDetalles } : {})
        });

        const ventaCompleta = await ventaRepository.findById(nuevaVenta.ventaId);

        return res.status(201).json({
            status: 201,
            message: "Venta creada exitosamente",
            data: ventaCompleta || nuevaVenta,
        });
    } catch (error) {
        console.error("Error al crear venta:", error);
        return res.status(500).json({
            status: 500,
            message: "Error interno del servidor al crear la venta",
            error: error instanceof Error ? error.message : error,
        });
    }
};

// PUT: Actualizar una venta existente por su ID
export const updateVenta = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                status: 400,
                message: "El ID de la venta debe ser un número válido",
            });
        }

        const existing = await ventaRepository.findById(id);
        if (!existing) {
            return res.status(404).json({
                status: 404,
                message: `Venta con ID ${id} no encontrada`,
                data: null,
            });
        }

        const { cliente, total, fecha } = req.body;
        const updateData: Partial<typeof existing> = {};

        if (cliente !== undefined) updateData.cliente = cliente;
        if (total !== undefined) updateData.total = Number(total);
        if (fecha !== undefined) updateData.fecha = new Date(fecha);

        const ventaActualizada = await ventaRepository.update(id, updateData);

        return res.status(200).json({
            status: 200,
            message: "Venta actualizada exitosamente",
            data: ventaActualizada,
        });
    } catch (error) {
        console.error("Error al actualizar la venta:", error);
        return res.status(500).json({
            status: 500,
            message: "Error interno del servidor al actualizar la venta",
            error: error instanceof Error ? error.message : error,
        });
    }
};

// DELETE: Eliminar una venta por su ID
export const deleteVenta = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                status: 400,
                message: "El ID de la venta debe ser un número válido",
            });
        }

        const existing = await ventaRepository.findById(id);
        if (!existing) {
            return res.status(404).json({
                status: 404,
                message: `Venta con ID ${id} no encontrada`,
                data: null,
            });
        }

        await ventaRepository.delete(id);

        return res.status(200).json({
            status: 200,
            message: `Venta con ID ${id} eliminada exitosamente`,
        });
    } catch (error) {
        console.error("Error al eliminar la venta:", error);
        return res.status(500).json({
            status: 500,
            message: "Error interno del servidor al eliminar la venta",
            error: error instanceof Error ? error.message : error,
        });
    }
};

// Alias para compatibilidad
export const getVenta = getVentaById;
