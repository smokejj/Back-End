import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from "typeorm";
import { Order } from "./Order";
import { Dish } from "./Dish";
import { Favorite } from "./Favorite";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100, nullable: false })
    private _name!: string;

    @Column({ unique: true })
    private _email!: string;

    @Column({ nullable: false })
    private _password!: string;

    @Column({ default: "customer" })
    private _role!: string;

    @Column({ length: 15, unique: true })
    private _phone!: string;

    @OneToMany(() => Order, (order) => order.user)
    orders!: Order[];

    @OneToMany(() => Favorite, (favorite) => favorite.user)
    private _favorites!: Favorite[];

    /**
     * Getter $name
     */
    public get $name(): string {
        return this._name;
    }

    constructor(
        name: string,
        email: string,
        password: string,
        role: string,
        phone: string
    ) {
        this._name = name;
        this._email = email;
        this._password = password;
        this._role = role;
        this._phone = phone;
    }

    /**
     * Getter $orders
     */
    public get $orders(): Order[] {
        return this.orders;
    }

    /**
     * Setter $orders
     */
    public set $orders(value: Order[]) {
        this.orders = value;
    }

    /**
     * Getter $favorites
     */
    public get $favorites(): Favorite[] {
        return this._favorites;
    }

    /**
     * Setter $favorites
     */
    public set $favorites(value: Favorite[]) {
        this._favorites = value;
    }
}
