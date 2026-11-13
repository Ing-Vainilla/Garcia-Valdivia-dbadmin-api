import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Direccion } from "./Direccion.js";
import { Envio } from "./Envio.js";

@Entity("clientes")
export class Cliente {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    nombre!: string;

    @Column({ type: "varchar", length: 100, unique: true, nullable: false })
    email!: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    telefono!: string;

    @Column({ type: "enum", enum: ["ACTIVO", "INACTIVO"], default: "ACTIVO" })
    estado!: "ACTIVO" | "INACTIVO";

    @Column({ name: "limite_credito", type: "decimal", precision: 10, scale: 2, default: 0.00 })
    limiteCredito!: number;

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;

    @OneToMany(() => Direccion, (direccion) => direccion.cliente)
    direcciones!: Direccion[];

    @OneToMany(() => Envio, (envio) => envio.cliente)
    envios!: Envio[];
}
