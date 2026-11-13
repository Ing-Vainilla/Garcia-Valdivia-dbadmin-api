import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Envio } from "./Envio.js";

@Entity("historial_rastreo")
export class HistorialRastreo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "envio_id", type: "int", nullable: false })
    envioId!: number;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    fecha!: Date;

    @Column({ name: "ubicacion_actual", type: "varchar", length: 255, nullable: false })
    ubicacionActual!: string;

    @Column({ name: "estado_evento", type: "varchar", length: 50, nullable: false })
    estadoEvento!: string;

    @Column({ type: "text", nullable: true })
    observaciones!: string | null;

    @ManyToOne(() => Envio, (envio) => envio.historialRastreo, { onDelete: "CASCADE" })
    @JoinColumn({ name: "envio_id" })
    envio!: Envio;
}
