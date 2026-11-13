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
exports.Cliente = void 0;
const typeorm_1 = require("typeorm");
const Direccion_js_1 = require("./Direccion.js");
const Envio_js_1 = require("./Envio.js");
let Cliente = class Cliente {
    id;
    nombre;
    email;
    telefono;
    estado;
    limiteCredito;
    createdAt;
    direcciones;
    envios;
};
exports.Cliente = Cliente;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Cliente.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: false }),
    __metadata("design:type", String)
], Cliente.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, unique: true, nullable: false }),
    __metadata("design:type", String)
], Cliente.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 20, nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: ["ACTIVO", "INACTIVO"], default: "ACTIVO" }),
    __metadata("design:type", String)
], Cliente.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "limite_credito", type: "decimal", precision: 10, scale: 2, default: 0.00 }),
    __metadata("design:type", Number)
], Cliente.prototype, "limiteCredito", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Cliente.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Direccion_js_1.Direccion, (direccion) => direccion.cliente),
    __metadata("design:type", Array)
], Cliente.prototype, "direcciones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Envio_js_1.Envio, (envio) => envio.cliente),
    __metadata("design:type", Array)
], Cliente.prototype, "envios", void 0);
exports.Cliente = Cliente = __decorate([
    (0, typeorm_1.Entity)("clientes")
], Cliente);
