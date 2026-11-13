import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source.js";
import { Almacen } from "../entity/Almacen.js";
import { Paquete } from "../entity/Paquete.js";

// ----------------------------------------------------------------------
// ENDPOINT 3: POST /api/almacenes/:id/paquetes
// Asigna un paquete al almacén. Detona el trigger 'before_insert_paquete_almacen'.
// Captura el error 45000 (SIGNAL SQLSTATE '45000') y responde HTTP 400 Bad Request.
// ----------------------------------------------------------------------
export const addPaqueteToAlmacen = async (req: Request, res: Response) => {
    try {
        const almacenId = Number(req.params.id);
        const { envioId, peso, dimensiones, contenido } = req.body;

        if (isNaN(almacenId) || !envioId || peso === undefined || !dimensiones || !contenido) {
            return res.status(400).json({
                status: 400,
                message: "Faltan campos obligatorios: envioId, peso, dimensiones, contenido y un almacenId válido en la URL"
            });
        }

        const almacenRepo = AppDataSource.getRepository(Almacen);
        const almacen = await almacenRepo.findOne({ where: { id: almacenId } });

        if (!almacen) {
            return res.status(404).json({
                status: 404,
                message: `Almacén con ID ${almacenId} no encontrado`
            });
        }

        const paqueteRepo = AppDataSource.getRepository(Paquete);
        const nuevoPaquete = paqueteRepo.create({
            envioId: Number(envioId),
            almacenId,
            peso: Number(peso),
            dimensiones,
            contenido
        });

        // Al guardar, MySQL ejecuta el Trigger BEFORE INSERT 'before_insert_paquete_almacen'
        const paqueteGuardado = await paqueteRepo.save(nuevoPaquete);

        return res.status(201).json({
            status: 201,
            message: "Paquete asignado al almacén exitosamente (Capacidad verificada por Trigger)",
            data: paqueteGuardado
        });
    } catch (error: any) {
        // CAPTURA DEL ERROR 45000 DE MYSQL LANZADO POR EL TRIGGER
        const isTriggerCapacityError =
            error?.sqlState === "45000" ||
            error?.errno === 1644 ||
            error?.code === "ER_SIGNAL_EXCEPTION" ||
            (typeof error?.message === "string" && (
                error.message.includes("45000") ||
                error.message.includes("Capacidad máxima")
            ));

        if (isTriggerCapacityError) {
            return res.status(400).json({
                status: 400,
                error: "Bad Request",
                message: error.message || "Capacidad máxima del almacén superada: no hay espacio disponible para más paquetes",
                triggerDetonado: "before_insert_paquete_almacen",
                sqlState: "45000"
            });
        }

        console.error("Error al asignar paquete al almacén:", error);
        return res.status(500).json({
            status: 500,
            message: "Error interno del servidor al procesar el paquete",
            error: error.message
        });
    }
};
