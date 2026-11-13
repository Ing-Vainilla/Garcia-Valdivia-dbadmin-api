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
exports.HistorialRastreo = void 0;
const typeorm_1 = require("typeorm");
const Envio_js_1 = require("./Envio.js");
let HistorialRastreo = class HistorialRastreo {
    id;
    envioId;
    fecha;
    ubicacionActual;
    estadoEvento;
    observaciones;
    envio;
};
exports.HistorialRastreo = HistorialRastreo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], HistorialRastreo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "envio_id", type: "int", nullable: false }),
    __metadata("design:type", Number)
], HistorialRastreo.prototype, "envioId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], HistorialRastreo.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "ubicacion_actual", type: "varchar", length: 255, nullable: false }),
    __metadata("design:type", String)
], HistorialRastreo.prototype, "ubicacionActual", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "estado_evento", type: "varchar", length: 50, nullable: false }),
    __metadata("design:type", String)
], HistorialRastreo.prototype, "estadoEvento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], HistorialRastreo.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Envio_js_1.Envio, (envio) => envio.historialRastreo, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "envio_id" }),
    __metadata("design:type", Envio_js_1.Envio)
], HistorialRastreo.prototype, "envio", void 0);
exports.HistorialRastreo = HistorialRastreo = __decorate([
    (0, typeorm_1.Entity)("historial_rastreo")
], HistorialRastreo);
