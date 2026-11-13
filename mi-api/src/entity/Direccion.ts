import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Cliente } from "./Cliente.js";

@Entity("direcciones")
export class Direccion {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "cliente_id", type: "int", nullable: false })
    clienteId!: number;

    @Column({ type: "varchar", length: 150, nullable: false })
    calle!: string;

    @Column({ type: "varchar", length: 20, nullable: false })
    numero!: string;

    @Column({ type: "varchar", length: 100, nullable: false })
    ciudad!: string;

    @Column({ type: "varchar", length: 100, nullable: false })
    estado!: string;

    @Column({ name: "codigo_postal", type: "varchar", length: 10, nullable: false })
    codigoPostal!: string;

    @Column({ type: "enum", enum: ["ORIGEN", "DESTINO"], nullable: false })
    tipo!: "ORIGEN" | "DESTINO";

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;

    @ManyToOne(() => Cliente, (cliente) => cliente.direcciones, { onDelete: "CASCADE" })
    @JoinColumn({ name: "cliente_id" })
    cliente!: Cliente;
}
