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
exports.AuditoriaEnvio = void 0;
const typeorm_1 = require("typeorm");
const Envio_js_1 = require("./Envio.js");
let AuditoriaEnvio = class AuditoriaEnvio {
    id;
    envioId;
    costoAnterior;
    costoNuevo;
    usuario;
    fechaModificacion;
    envio;
};
exports.AuditoriaEnvio = AuditoriaEnvio;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AuditoriaEnvio.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "envio_id", type: "int", nullable: false }),
    __metadata("design:type", Number)
], AuditoriaEnvio.prototype, "envioId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "costo_anterior", type: "decimal", precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], AuditoriaEnvio.prototype, "costoAnterior", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "costo_nuevo", type: "decimal", precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], AuditoriaEnvio.prototype, "costoNuevo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: false }),
    __metadata("design:type", String)
], AuditoriaEnvio.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "fecha_modificacion", type: "datetime", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], AuditoriaEnvio.prototype, "fechaModificacion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Envio_js_1.Envio, (envio) => envio.auditorias, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "envio_id" }),
    __metadata("design:type", Envio_js_1.Envio)
], AuditoriaEnvio.prototype, "envio", void 0);
exports.AuditoriaEnvio = AuditoriaEnvio = __decorate([
    (0, typeorm_1.Entity)("auditoria_envios")
], AuditoriaEnvio);
