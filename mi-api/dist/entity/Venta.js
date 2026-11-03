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
exports.Venta = void 0;
const typeorm_1 = require("typeorm");
const DetalleVenta_js_1 = require("./DetalleVenta.js");
let Venta = class Venta {
    ventaId;
    fecha;
    cliente;
    total;
    // Relación Uno a Muchos con operaciones en cascada
    detalles;
};
exports.Venta = Venta;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "venta_id" }),
    __metadata("design:type", Number)
], Venta.prototype, "ventaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Venta.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: false }),
    __metadata("design:type", String)
], Venta.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0.00 }),
    __metadata("design:type", Number)
], Venta.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => DetalleVenta_js_1.DetalleVenta, (detalle) => detalle.venta, { cascade: true }),
    __metadata("design:type", Array)
], Venta.prototype, "detalles", void 0);
exports.Venta = Venta = __decorate([
    (0, typeorm_1.Entity)("ventas")
], Venta);
