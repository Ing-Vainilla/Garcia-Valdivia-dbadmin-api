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
exports.Envio = void 0;
const typeorm_1 = require("typeorm");
const Cliente_js_1 = require("./Cliente.js");
const Direccion_js_1 = require("./Direccion.js");
const Paquete_js_1 = require("./Paquete.js");
const HistorialRastreo_js_1 = require("./HistorialRastreo.js");
const AuditoriaEnvio_js_1 = require("./AuditoriaEnvio.js");
let Envio = class Envio {
    id;
    clienteId;
    destinatario;
    direccionOrigenId;
    direccionDestinoId;
    costoTotal;
    fecha;
    fechaEntrega;
    estado;
    cliente;
    direccionOrigen;
    direccionDestino;
    paquetes;
    historialRastreo;
    auditorias;
};
exports.Envio = Envio;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Envio.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "cliente_id", type: "int", nullable: false }),
    __metadata("design:type", Number)
], Envio.prototype, "clienteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: false }),
    __metadata("design:type", String)
], Envio.prototype, "destinatario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "direccion_origen_id", type: "int", nullable: false }),
    __metadata("design:type", Number)
], Envio.prototype, "direccionOrigenId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "direccion_destino_id", type: "int", nullable: false }),
    __metadata("design:type", Number)
], Envio.prototype, "direccionDestinoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "costo_total", type: "decimal", precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], Envio.prototype, "costoTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Envio.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "fecha_entrega", type: "datetime", nullable: true }),
    __metadata("design:type", Object)
], Envio.prototype, "fechaEntrega", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ["REGISTRADO", "EN_TRANSITO", "ENTREGADO", "CANCELADO"],
        default: "REGISTRADO"
    }),
    __metadata("design:type", String)
], Envio.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Cliente_js_1.Cliente, (cliente) => cliente.envios, { onDelete: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)({ name: "cliente_id" }),
    __metadata("design:type", Cliente_js_1.Cliente)
], Envio.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Direccion_js_1.Direccion, { onDelete: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)({ name: "direccion_origen_id" }),
    __metadata("design:type", Direccion_js_1.Direccion)
], Envio.prototype, "direccionOrigen", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Direccion_js_1.Direccion, { onDelete: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)({ name: "direccion_destino_id" }),
    __metadata("design:type", Direccion_js_1.Direccion)
], Envio.prototype, "direccionDestino", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Paquete_js_1.Paquete, (paquete) => paquete.envio, { cascade: true }),
    __metadata("design:type", Array)
], Envio.prototype, "paquetes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => HistorialRastreo_js_1.HistorialRastreo, (rastreo) => rastreo.envio),
    __metadata("design:type", Array)
], Envio.prototype, "historialRastreo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => AuditoriaEnvio_js_1.AuditoriaEnvio, (auditoria) => auditoria.envio),
    __metadata("design:type", Array)
], Envio.prototype, "auditorias", void 0);
exports.Envio = Envio = __decorate([
    (0, typeorm_1.Entity)("envios")
], Envio);
