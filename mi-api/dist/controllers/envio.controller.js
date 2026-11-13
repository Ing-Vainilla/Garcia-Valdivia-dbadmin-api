"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnviosActivos = exports.addRastreoEnvio = exports.updateCostoEnvio = exports.createEnvio = void 0;
const data_source_js_1 = require("../config/data-source.js");
const Envio_js_1 = require("../entity/Envio.js");
const Paquete_js_1 = require("../entity/Paquete.js");
const AuditoriaEnvio_js_1 = require("../entity/AuditoriaEnvio.js");
const HistorialRastreo_js_1 = require("../entity/HistorialRastreo.js");

// ENDPOINT 1: POST /api/envios
// Da de alta un envío con sus paquetes iniciales usando QueryRunner (Transacción)
const createEnvio = async (req, res) => {
    const queryRunner = data_source_js_1.AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        const { clienteId, destinatario, direccionOrigenId, direccionDestinoId, costoTotal, paquetes } = req.body;
        if (!clienteId || !destinatario || !direccionOrigenId || !direccionDestinoId || costoTotal === undefined) {
            return res.status(400).json({
                status: 400,
                message: "Faltan campos obligatorios: clienteId, destinatario, direccionOrigenId, direccionDestinoId, costoTotal"
            });
        }
        const envioRepo = queryRunner.manager.getRepository(Envio_js_1.Envio);
        const paqueteRepo = queryRunner.manager.getRepository(Paquete_js_1.Paquete);
        const nuevoEnvio = envioRepo.create({
            clienteId: Number(clienteId),
            destinatario,
            direccionOrigenId: Number(direccionOrigenId),
            direccionDestinoId: Number(direccionDestinoId),
            costoTotal: Number(costoTotal),
            estado: "REGISTRADO"
        });
        const envioGuardado = await envioRepo.save(nuevoEnvio);
        if (paquetes && Array.isArray(paquetes) && paquetes.length > 0) {
            const paquetesEntidades = paquetes.map((p) => paqueteRepo.create({
                envioId: envioGuardado.id,
                almacenId: p.almacenId ? Number(p.almacenId) : null,
                peso: Number(p.peso),
                dimensiones: p.dimensiones,
                contenido: p.contenido
            }));
            await paqueteRepo.save(paquetesEntidades);
        }
        await queryRunner.commitTransaction();
        const envioCompleto = await data_source_js_1.AppDataSource.getRepository(Envio_js_1.Envio).findOne({
            where: { id: envioGuardado.id },
            relations: {
                paquetes: true,
                cliente: true,
                direccionOrigen: true,
                direccionDestino: true
            }
        });
        return res.status(201).json({
            status: 201,
            message: "Envío y paquetes iniciales registrados exitosamente",
            data: envioCompleto
        });
    }
    catch (error) {
        await queryRunner.rollbackTransaction();
        console.error("Error al registrar envío:", error);
        return res.status(500).json({
            status: 500,
            message: "Error al registrar el envío",
            error: error.message
        });
    }
    finally {
        await queryRunner.release();
    }
};
exports.createEnvio = createEnvio;
// ----------------------------------------------------------------------
// ENDPOINT 2: PUT /api/envios/:id/costo
// Modifica el costo total. Detona en MySQL el trigger 'after_update_envio_costo'
// ----------------------------------------------------------------------
const updateCostoEnvio = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { costoTotal } = req.body;
        if (isNaN(id) || costoTotal === undefined) {
            return res.status(400).json({
                status: 400,
                message: "El ID del envío en la URL y el campo costoTotal en el body son obligatorios"
            });
        }
        const envioRepo = data_source_js_1.AppDataSource.getRepository(Envio_js_1.Envio);
        const envio = await envioRepo.findOne({ where: { id } });
        if (!envio) {
            return res.status(404).json({
                status: 404,
                message: `Envío con ID ${id} no encontrado`
            });
        }
        const costoAnterior = Number(envio.costoTotal);
        envio.costoTotal = Number(costoTotal);
        await envioRepo.save(envio);
        // Consultamos la auditoría registrada por el trigger en la base de datos
        const auditoriaRepo = data_source_js_1.AppDataSource.getRepository(AuditoriaEnvio_js_1.AuditoriaEnvio);
        const ultimaAuditoria = await auditoriaRepo.find({
            where: { envioId: id },
            order: { fechaModificacion: "DESC" },
            take: 1
        });
        return res.status(200).json({
            status: 200,
            message: "Costo actualizado exitosamente. Trigger 'after_update_envio_costo' detonado.",
            data: {
                envioId: id,
                costoAnterior,
                costoNuevo: envio.costoTotal,
                auditoriaRegistrada: ultimaAuditoria[0] || null
            }
        });
    }
    catch (error) {
        console.error("Error al actualizar costo de envío:", error);
        return res.status(500).json({
            status: 500,
            message: "Error al actualizar costo del envío",
            error: error.message
        });
    }
};
exports.updateCostoEnvio = updateCostoEnvio;
// ----------------------------------------------------------------------
// ENDPOINT 4: POST /api/envios/:id/rastreo
// Inserta evento en la bitácora. Si estadoEvento = 'ENTREGADO',
// el trigger 'after_insert_historial_rastreo' actualiza la tabla envios.
// ----------------------------------------------------------------------
const addRastreoEnvio = async (req, res) => {
    try {
        const envioId = Number(req.params.id);
        const { ubicacionActual, estadoEvento, observaciones } = req.body;
        if (isNaN(envioId) || !ubicacionActual || !estadoEvento) {
            return res.status(400).json({
                status: 400,
                message: "El ID del envío, ubicacionActual y estadoEvento son obligatorios"
            });
        }
        const envioRepo = data_source_js_1.AppDataSource.getRepository(Envio_js_1.Envio);
        const envio = await envioRepo.findOne({ where: { id: envioId } });
        if (!envio) {
            return res.status(404).json({
                status: 404,
                message: `Envío con ID ${envioId} no encontrado`
            });
        }
        const rastreoRepo = data_source_js_1.AppDataSource.getRepository(HistorialRastreo_js_1.HistorialRastreo);
        const nuevoRastreo = rastreoRepo.create({
            envioId,
            ubicacionActual,
            estadoEvento: String(estadoEvento).trim(),
            observaciones: observaciones || null
        });
        // Al guardar el rastreo, se detona el trigger AFTER INSERT
        const rastreoGuardado = await rastreoRepo.save(nuevoRastreo);
        // Volvemos a consultar el envío para devolver el estado actualizado por el trigger
        const envioActualizado = await envioRepo.findOne({ where: { id: envioId } });
        const fueEntregado = estadoEvento.toUpperCase() === "ENTREGADO";
        return res.status(201).json({
            status: 201,
            message: fueEntregado
                ? "Evento 'ENTREGADO' registrado. Trigger 'after_insert_historial_rastreo' actualizó automáticamente el estado del envío."
                : "Evento de rastreo registrado exitosamente.",
            data: {
                rastreo: rastreoGuardado,
                envioActualizado: {
                    id: envioActualizado?.id,
                    estado: envioActualizado?.estado,
                    fechaEntrega: envioActualizado?.fechaEntrega
                }
            }
        });
    }
    catch (error) {
        console.error("Error al registrar evento de rastreo:", error);
        return res.status(500).json({
            status: 500,
            message: "Error al registrar evento de rastreo",
            error: error.message
        });
    }
};
exports.addRastreoEnvio = addRastreoEnvio;
// ----------------------------------------------------------------------
// ENDPOINT 5: GET /api/envios
// Consulta de envíos activos con clientes/paquetes mediante QueryBuilder
// ----------------------------------------------------------------------
const getEnviosActivos = async (req, res) => {
    try {
        const envioRepo = data_source_js_1.AppDataSource.getRepository(Envio_js_1.Envio);
        // Usamos TypeORM createQueryBuilder conforme a la rúbrica
        const envios = await envioRepo.createQueryBuilder("envio")
            .leftJoinAndSelect("envio.cliente", "cliente")
            .leftJoinAndSelect("envio.direccionOrigen", "direccionOrigen")
            .leftJoinAndSelect("envio.direccionDestino", "direccionDestino")
            .leftJoinAndSelect("envio.paquetes", "paquetes")
            .where("envio.estado IN (:...estados)", { estados: ["REGISTRADO", "EN_TRANSITO"] })
            .orderBy("envio.fecha", "DESC")
            .getMany();
        return res.status(200).json({
            status: 200,
            message: "Envíos activos obtenidos exitosamente",
            total: envios.length,
            data: envios
        });
    }
    catch (error) {
        console.error("Error al consultar envíos activos:", error);
        return res.status(500).json({
            status: 500,
            message: "Error al consultar envíos activos",
            error: error.message
        });
    }
};
exports.getEnviosActivos = getEnviosActivos;
