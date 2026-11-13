import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Envio } from "./Envio.js";
import { Almacen } from "./Almacen.js";

@Entity("paquetes")
export class Paquete {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "envio_id", type: "int", nullable: false })
    envioId!: number;

    @Column({ name: "almacen_id", type: "int", nullable: true })
    almacenId!: number | null;

    @Column({ type: "decimal", precision: 8, scale: 2, nullable: false })
    peso!: number;

    @Column({ type: "varchar", length: 50, nullable: false })
    dimensiones!: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    contenido!: string;

    @ManyToOne(() => Envio, (envio) => envio.paquetes, { onDelete: "CASCADE" })
    @JoinColumn({ name: "envio_id" })
    envio!: Envio;

    @ManyToOne(() => Almacen, (almacen) => almacen.paquetes, { onDelete: "SET NULL", nullable: true })
    @JoinColumn({ name: "almacen_id" })
    almacen!: Almacen | null;
}
