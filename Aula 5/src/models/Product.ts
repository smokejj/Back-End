import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products') // nome da tabela
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    name: string;

    @Column({ nullable: false })
    price: number;

    @Column({ type: "text", nullable: false })
    desc: string;

    constructor(name: string, price: number, desc: string) {
        this.name = name;
        this.price = price;
        this.desc = desc;

    }
}