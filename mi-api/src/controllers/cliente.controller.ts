import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source.js";
import { Cliente } from "../entity/Cliente.js";
import { Envio } from "../entity/Envio.js";

// ----------------------------------------------------------------------
// ENDPOINT 6: GET /api/clientes/:id/envios
// Historial de envíos vinculados a un cliente específico mediante QueryBuilder
// ----------------------------------------------------------------------
export const getEnviosPorCliente = async (req: Request, res: Response) => {
    try {
        const clienteId = Number(req.params.id);

        if (isNaN(clienteId)) {
            return res.status(400).json({
                status: 400,
                message: "El ID del cliente debe ser un número válido"
            });
        }

        const clienteRepo = AppDataSource.getRepository(Cliente);
        const cliente = await clienteRepo.findOne({ where: { id: clienteId } });

        if (!cliente) {
            return res.status(404).json({
                status: 404,
                message: `Cliente con ID ${clienteId} no encontrado`
            });
        }

        const envioRepo = AppDataSource.getRepository(Envio);
        const envios = await envioRepo.createQueryBuilder("envio")
            .leftJoinAndSelect("envio.paquetes", "paquetes")
            .leftJoinAndSelect("envio.direccionOrigen", "direccionOrigen")
            .leftJoinAndSelect("envio.direccionDestino", "direccionDestino")
            .leftJoinAndSelect("envio.historialRastreo", "historialRastreo")
            .where("envio.clienteId = :clienteId", { clienteId })
            .orderBy("envio.fecha", "DESC")
            .getMany();

        return res.status(200).json({
            status: 200,
            message: `Historial de envíos del cliente ${cliente.nombre} obtenido exitosamente`,
            cliente: {
                id: cliente.id,
                nombre: cliente.nombre,
                email: cliente.email,
                telefono: cliente.telefono,
                estado: cliente.estado
            },
            totalEnvios: envios.length,
            data: envios
        });
    } catch (error: any) {
        console.error("Error al obtener envíos del cliente:", error);
        return res.status(500).json({
            status: 500,
            message: "Error al consultar historial del cliente",
            error: error.message
        });
    }
};
