import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Cliente } from "./Cliente.js";
import { Direccion } from "./Direccion.js";
import { Paquete } from "./Paquete.js";
import { HistorialRastreo } from "./HistorialRastreo.js";
import { AuditoriaEnvio } from "./AuditoriaEnvio.js";

@Entity("envios")
export class Envio {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "cliente_id", type: "int", nullable: false })
    clienteId!: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    destinatario!: string;

    @Column({ name: "direccion_origen_id", type: "int", nullable: false })
    direccionOrigenId!: number;

    @Column({ name: "direccion_destino_id", type: "int", nullable: false })
    direccionDestinoId!: number;

    @Column({ name: "costo_total", type: "decimal", precision: 10, scale: 2, nullable: false })
    costoTotal!: number;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    fecha!: Date;

    @Column({ name: "fecha_entrega", type: "datetime", nullable: true })
    fechaEntrega!: Date | null;

    @Column({
        type: "enum",
        enum: ["REGISTRADO", "EN_TRANSITO", "ENTREGADO", "CANCELADO"],
        default: "REGISTRADO"
    })
    estado!: "REGISTRADO" | "EN_TRANSITO" | "ENTREGADO" | "CANCELADO";

    @ManyToOne(() => Cliente, (cliente) => cliente.envios, { onDelete: "RESTRICT" })
    @JoinColumn({ name: "cliente_id" })
    cliente!: Cliente;

    @ManyToOne(() => Direccion, { onDelete: "RESTRICT" })
    @JoinColumn({ name: "direccion_origen_id" })
    direccionOrigen!: Direccion;

    @ManyToOne(() => Direccion, { onDelete: "RESTRICT" })
    @JoinColumn({ name: "direccion_destino_id" })
    direccionDestino!: Direccion;

    @OneToMany(() => Paquete, (paquete) => paquete.envio, { cascade: true })
    paquetes!: Paquete[];

    @OneToMany(() => HistorialRastreo, (rastreo) => rastreo.envio)
    historialRastreo!: HistorialRastreo[];

    @OneToMany(() => AuditoriaEnvio, (auditoria) => auditoria.envio)
    auditorias!: AuditoriaEnvio[];
}
