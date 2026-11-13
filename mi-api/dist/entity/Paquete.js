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
exports.Paquete = void 0;
const typeorm_1 = require("typeorm");
const Envio_js_1 = require("./Envio.js");
const Almacen_js_1 = require("./Almacen.js");
let Paquete = class Paquete {
    id;
    envioId;
    almacenId;
    peso;
    dimensiones;
    contenido;
    envio;
    almacen;
};
exports.Paquete = Paquete;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Paquete.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "envio_id", type: "int", nullable: false }),
    __metadata("design:type", Number)
], Paquete.prototype, "envioId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "almacen_id", type: "int", nullable: true }),
    __metadata("design:type", Object)
], Paquete.prototype, "almacenId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 8, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], Paquete.prototype, "peso", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: false }),
    __metadata("design:type", String)
], Paquete.prototype, "dimensiones", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
    __metadata("design:type", String)
], Paquete.prototype, "contenido", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Envio_js_1.Envio, (envio) => envio.paquetes, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "envio_id" }),
    __metadata("design:type", Envio_js_1.Envio)
], Paquete.prototype, "envio", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Almacen_js_1.Almacen, (almacen) => almacen.paquetes, { onDelete: "SET NULL", nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "almacen_id" }),
    __metadata("design:type", Object)
], Paquete.prototype, "almacen", void 0);
exports.Paquete = Paquete = __decorate([
    (0, typeorm_1.Entity)("paquetes")
], Paquete);
