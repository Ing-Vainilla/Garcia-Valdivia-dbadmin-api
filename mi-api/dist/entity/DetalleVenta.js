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
exports.DetalleVenta = void 0;
const typeorm_1 = require("typeorm");
const Venta_js_1 = require("./Venta.js");
const Producto_js_1 = require("./Producto.js");
let DetalleVenta = class DetalleVenta {
    detalleId;
    // Con explicit type: "int" para que tsx no falle
    ventaId;
    // Con explicit type: "int" para que tsx no falle
    productoId;
    cantidad;
    precioUnitario;
    subtotal;
    // Relación Muchos a Uno con Venta
    venta;
    // Relación Muchos a Uno con Producto
    producto;
};
exports.DetalleVenta = DetalleVenta;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "detalle_id" }),
    __metadata("design:type", Number)
], DetalleVenta.prototype, "detalleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", name: "venta_id" }),
    __metadata("design:type", Number)
], DetalleVenta.prototype, "ventaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", name: "producto_id" }),
    __metadata("design:type", Number)
], DetalleVenta.prototype, "productoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: false }),
    __metadata("design:type", Number)
], DetalleVenta.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, name: "precio_unitario", nullable: false }),
    __metadata("design:type", Number)
], DetalleVenta.prototype, "precioUnitario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], DetalleVenta.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Venta_js_1.Venta, (venta) => venta.detalles, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "venta_id" }),
    __metadata("design:type", Venta_js_1.Venta)
], DetalleVenta.prototype, "venta", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Producto_js_1.Producto, (producto) => producto.detallesVenta),
    (0, typeorm_1.JoinColumn)({ name: "producto_id" }),
    __metadata("design:type", Producto_js_1.Producto)
], DetalleVenta.prototype, "producto", void 0);
exports.DetalleVenta = DetalleVenta = __decorate([
    (0, typeorm_1.Entity)("detalle_ventas")
], DetalleVenta);
