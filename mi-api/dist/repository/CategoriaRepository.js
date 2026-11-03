"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriaRepository = exports.CategoriaRepository = void 0;
const data_source_js_1 = require("../config/data-source.js");
const Categoria_js_1 = require("../entity/Categoria.js");
class CategoriaRepository {
    repository = data_source_js_1.AppDataSource.getRepository(Categoria_js_1.Categoria);
    async findAll() {
        return await this.repository.find({
            relations: { productos: true }
        });
    }
    async findById(id) {
        return await this.repository.findOne({
            where: { categoriaId: id },
            relations: { productos: true }
        });
    }
    async findByNombre(nombre) {
        return await this.repository.findOne({
            where: { nombre },
            relations: { productos: true }
        });
    }
    async save(categoria) {
        return await this.repository.save(categoria);
    }
    async create(categoriaData) {
        const categoria = this.repository.create(categoriaData);
        return await this.repository.save(categoria);
    }
    async update(id, categoriaData) {
        await this.repository.update(id, categoriaData);
        return await this.findById(id);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
}
exports.CategoriaRepository = CategoriaRepository;
exports.categoriaRepository = new CategoriaRepository();
