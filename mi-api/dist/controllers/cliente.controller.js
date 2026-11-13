"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnviosPorCliente = void 0;
const data_source_js_1 = require("../config/data-source.js");
const Cliente_js_1 = require("../entity/Cliente.js");
const Envio_js_1 = require("../entity/Envio.js");

// ENDPOINT 6: GET /api/clientes/:id/envios
// Historial de envíos vinculados a un cliente específico mediante QueryBuilder
const getEnviosPorCliente = async (req, res) => {
    try {
        const clienteId = Number(req.params.id);
        if (isNaN(clienteId)) {
            return res.status(400).json({
                status: 400,
                message: "El ID del cliente debe ser un número válido"
            });
        }
        const clienteRepo = data_source_js_1.AppDataSource.getRepository(Cliente_js_1.Cliente);
        const cliente = await clienteRepo.findOne({ where: { id: clienteId } });
        if (!cliente) {
            return res.status(404).json({
                status: 404,
                message: `Cliente con ID ${clienteId} no encontrado`
            });
        }
        const envioRepo = data_source_js_1.AppDataSource.getRepository(Envio_js_1.Envio);
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
    }
    catch (error) {
        console.error("Error al obtener envíos del cliente:", error);
        return res.status(500).json({
            status: 500,
            message: "Error al consultar historial del cliente",
            error: error.message
        });
    }
};
exports.getEnviosPorCliente = getEnviosPorCliente;
