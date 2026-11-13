import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Paquete } from "./Paquete.js";

@Entity("almacenes")
export class Almacen {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    nombre!: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    ubicacion!: string;

    @Column({ name: "capacidad_maxima", type: "int", nullable: false })
    capacidadMaxima!: number;

    @OneToMany(() => Paquete, (paquete) => paquete.almacen)
    paquetes!: Paquete[];
}
