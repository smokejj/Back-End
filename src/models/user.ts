import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    BeforeUpdate,
} from "typeorm";
import bcrypt from "bcryptjs";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({type: "varchar", length: 100, nullable: false, unique: true})
    email!: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password!: string;

    private originalPassword: string

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
        this.originalPassword = password
    }
    @BeforeInsert()
    async hashPasswordBeforeInsert() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    @BeforeUpdate()
    async hashPasswordBeforeUpdate() {
        if (this.password !== this.originalPassword) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }
    setPreviousPassword(password: string) {
        this.originalPassword = password;
    }
}