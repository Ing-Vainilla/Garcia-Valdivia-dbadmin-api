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
exports.Almacen = void 0;
const typeorm_1 = require("typeorm");
const Paquete_js_1 = require("./Paquete.js");
let Almacen = class Almacen {
    id;
    nombre;
    ubicacion;
    capacidadMaxima;
    paquetes;
};
exports.Almacen = Almacen;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Almacen.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: false }),
    __metadata("design:type", String)
], Almacen.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
    __metadata("design:type", String)
], Almacen.prototype, "ubicacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "capacidad_maxima", type: "int", nullable: false }),
    __metadata("design:type", Number)
], Almacen.prototype, "capacidadMaxima", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Paquete_js_1.Paquete, (paquete) => paquete.almacen),
    __metadata("design:type", Array)
], Almacen.prototype, "paquetes", void 0);
exports.Almacen = Almacen = __decorate([
    (0, typeorm_1.Entity)("almacenes")
], Almacen);
