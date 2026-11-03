"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productoRepository = exports.ProductoRepository = void 0;
const data_source_js_1 = require("../config/data-source.js");
const Producto_js_1 = require("../entity/Producto.js");
class ProductoRepository {
    repository = data_source_js_1.AppDataSource.getRepository(Producto_js_1.Producto);
    async findAll() {
        return await this.repository.find({
            relations: { categoria: true }
        });
    }
    async findById(id) {
        return await this.repository.findOne({
            where: { productoId: id },
            relations: { categoria: true, detallesVenta: true }
        });
    }
    async findByCategoria(categoriaId) {
        return await this.repository.find({
            where: { categoriaId },
            relations: { categoria: true, detallesVenta: true }
        });
    }
    async save(producto) {
        return await this.repository.save(producto);
    }
    async create(productoData) {
        const producto = this.repository.create(productoData);
        return await this.repository.save(producto);
    }
    async update(id, productoData) {
        const { categoria, detallesVenta, ...dataToUpdate } = productoData;
        if (Object.keys(dataToUpdate).length > 0) {
            await this.repository.update(id, dataToUpdate);
        }
        return await this.findById(id);
    }
    async updateStock(id, cantidad) {
        const producto = await this.findById(id);
        if (!producto)
            return null;
        producto.stock += cantidad;
        return await this.repository.save(producto);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
}
exports.ProductoRepository = ProductoRepository;
exports.productoRepository = new ProductoRepository();
