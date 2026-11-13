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
exports.Direccion = void 0;
const typeorm_1 = require("typeorm");
const Cliente_js_1 = require("./Cliente.js");
let Direccion = class Direccion {
    id;
    clienteId;
    calle;
    numero;
    ciudad;
    estado;
    codigoPostal;
    tipo;
    createdAt;
    cliente;
};
exports.Direccion = Direccion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Direccion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "cliente_id", type: "int", nullable: false }),
    __metadata("design:type", Number)
], Direccion.prototype, "clienteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 150, nullable: false }),
    __metadata("design:type", String)
], Direccion.prototype, "calle", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 20, nullable: false }),
    __metadata("design:type", String)
], Direccion.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: false }),
    __metadata("design:type", String)
], Direccion.prototype, "ciudad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: false }),
    __metadata("design:type", String)
], Direccion.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "codigo_postal", type: "varchar", length: 10, nullable: false }),
    __metadata("design:type", String)
], Direccion.prototype, "codigoPostal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: ["ORIGEN", "DESTINO"], nullable: false }),
    __metadata("design:type", String)
], Direccion.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Direccion.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Cliente_js_1.Cliente, (cliente) => cliente.direcciones, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "cliente_id" }),
    __metadata("design:type", Cliente_js_1.Cliente)
], Direccion.prototype, "cliente", void 0);
exports.Direccion = Direccion = __decorate([
    (0, typeorm_1.Entity)("direcciones")
], Direccion);
