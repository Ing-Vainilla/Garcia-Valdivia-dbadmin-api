"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
const typeorm_1 = require("typeorm");
const Categoria_js_1 = require("./Categoria.js");
const DetalleVenta_js_1 = require("./DetalleVenta.js");
let Producto = class Producto {
    productoId;
    nombre;
    precio;
    stock;
    // Se agrega type: "int"
    categoriaId;
    // Relación Muchos a Uno: Muchos productos pertenecen a una categoría
    categoria;
    // Relación Uno a Muchos: Un producto puede estar en varios detalles de venta
    detallesVenta;
};
exports.Producto = Producto;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "producto_id" }),
    __metadata("design:type", Number)
], Producto.prototype, "productoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: false }),
    __metadata("design:type", String)
], Producto.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], Producto.prototype, "precio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Producto.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", name: "categoria_id", nullable: true }),
    __metadata("design:type", Number)
], Producto.prototype, "categoriaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Categoria_js_1.Categoria, (categoria) => categoria.productos, { onDelete: "SET NULL" }),
    (0, typeorm_1.JoinColumn)({ name: "categoria_id" }),
    __metadata("design:type", Categoria_js_1.Categoria)
], Producto.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => DetalleVenta_js_1.DetalleVenta, (detalle) => detalle.producto),
    __metadata("design:type", Array)
], Producto.prototype, "detallesVenta", void 0);
exports.Producto = Producto = __decorate([
    (0, typeorm_1.Entity)("productos")
], Producto);
