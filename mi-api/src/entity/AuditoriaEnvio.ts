import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Envio } from "./Envio.js";

@Entity("auditoria_envios")
export class AuditoriaEnvio {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "envio_id", type: "int", nullable: false })
    envioId!: number;

    @Column({ name: "costo_anterior", type: "decimal", precision: 10, scale: 2, nullable: false })
    costoAnterior!: number;

    @Column({ name: "costo_nuevo", type: "decimal", precision: 10, scale: 2, nullable: false })
    costoNuevo!: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    usuario!: string;

    @Column({ name: "fecha_modificacion", type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    fechaModificacion!: Date;

    @ManyToOne(() => Envio, (envio) => envio.auditorias, { onDelete: "CASCADE" })
    @JoinColumn({ name: "envio_id" })
    envio!: Envio;
}
