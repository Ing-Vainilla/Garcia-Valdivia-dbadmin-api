"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ventaRepository = exports.VentaRepository = void 0;
const data_source_js_1 = require("../config/data-source.js");
const Venta_js_1 = require("../entity/Venta.js");
class VentaRepository {
    repository = data_source_js_1.AppDataSource.getRepository(Venta_js_1.Venta);
    async findAll() {
        return await this.repository.find({
            relations: {
                detalles: {
                    producto: true
                }
            },
            order: { fecha: "DESC" }
        });
    }
    async findById(id) {
        return await this.repository.findOne({
            where: { ventaId: id },
            relations: {
                detalles: {
                    producto: {
                        categoria: true
                    }
                }
            }
        });
    }
    async findByCliente(cliente) {
        return await this.repository.find({
            where: { cliente },
            relations: {
                detalles: {
                    producto: true
                }
            },
            order: { fecha: "DESC" }
        });
    }
    async findByFechaRange(fechaInicio, fechaFin) {
        return await this.repository
            .createQueryBuilder("venta")
            .leftJoinAndSelect("venta.detalles", "detalles")
            .leftJoinAndSelect("detalles.producto", "producto")
            .where("venta.fecha BETWEEN :fechaInicio AND :fechaFin", { fechaInicio, fechaFin })
            .orderBy("venta.fecha", "DESC")
            .getMany();
    }
    async save(venta) {
        return await this.repository.save(venta);
    }
    async create(ventaData) {
        const venta = this.repository.create(ventaData);
        return await this.repository.save(venta);
    }
    async update(id, ventaData) {
        const { detalles, ...dataToUpdate } = ventaData;
        if (Object.keys(dataToUpdate).length > 0) {
            await this.repository.update(id, dataToUpdate);
        }
        return await this.findById(id);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
}
exports.VentaRepository = VentaRepository;
exports.ventaRepository = new VentaRepository();
