"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detalleVentaRepository = exports.DetalleVentaRepository = void 0;
const data_source_js_1 = require("../config/data-source.js");
const DetalleVenta_js_1 = require("../entity/DetalleVenta.js");
class DetalleVentaRepository {
    repository = data_source_js_1.AppDataSource.getRepository(DetalleVenta_js_1.DetalleVenta);
    async findAll() {
        return await this.repository.find({
            relations: { venta: true, producto: { categoria: true } }
        });
    }
    async findById(id) {
        return await this.repository.findOne({
            where: { detalleId: id },
            relations: { venta: true, producto: { categoria: true } }
        });
    }
    async findByVenta(ventaId) {
        return await this.repository.find({
            where: { ventaId },
            relations: { venta: true, producto: { categoria: true } }
        });
    }
    async findByProducto(productoId) {
        return await this.repository.find({
            where: { productoId },
            relations: { venta: true, producto: { categoria: true } }
        });
    }
    async save(detalleVenta) {
        return await this.repository.save(detalleVenta);
    }
    async create(detalleVentaData) {
        const detalleVenta = this.repository.create(detalleVentaData);
        return await this.repository.save(detalleVenta);
    }
    async update(id, detalleVentaData) {
        await this.repository.update(id, detalleVentaData);
        return await this.findById(id);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
    async deleteByVenta(ventaId) {
        const result = await this.repository.delete({ ventaId });
        return result.affected !== 0;
    }
}
exports.DetalleVentaRepository = DetalleVentaRepository;
exports.detalleVentaRepository = new DetalleVentaRepository();
