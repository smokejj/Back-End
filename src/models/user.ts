import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, AfterLoad } from "typeorm";
import bcrypt from "bcryptjs";

@Entity('usesr')
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100, nullable: false, unique: true })
    private _email: string;

    @Column({ length: 255, nullable: false })
    private _password: string;

    private originalPassword: string

    constructor(email: string, password: string) {
        this._email = email;
        this._password = password;
        this.originalPassword = password
    }

    @AfterLoad()
    setOriginalPassword() {
        this.originalPassword = this._password;
    }

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this._password !== this.originalPassword) {
            const salt = await bcrypt.genSalt(10);
            this._password = await bcrypt.hash(this._password, salt)
        }
    }


    /**
     * Getter email
     * @return {string}
     */
    public get email(): string {
        return this._email;
    }

    /**
     * Getter password
     * @return {string}
     */
    public get password(): string {
        return this._password;
    }

    /**
     * Setter email
     * @param {string} value
     */
    public set email(value: string) {
        this._email = value;
    }

    /**
     * Setter password
     * @param {string} value
     */
    public set password(value: string) {
        this._password = value;
    }


}